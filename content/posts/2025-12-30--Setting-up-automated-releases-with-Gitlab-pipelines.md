+++
title = "Setting up automated releases with Gitlab pipelines"
description = "..."
date = "2025-12-30T20:26:00Z"
+++

I've been using Gitlab for a good few years now, and I can honestly say they've nailed it. Not only is it Open Source & paid for, but they've managed to encapsulate the tooling, workflow and processes all under one roof.

Over the last year I've been trying to get the holy grail of ~~automation~~ ~~dev ops~~ git-ops: ensuring manual intervention for releases in as little - or non-existing, as possible.

<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGw0Zzd5ZTJyOHNrYXg1N3JkanM1Ymw1ODhhZWg2ZGtjZWRjeXl5ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/s239QJIh56sRW/giphy.gif" alt="Ryan Reynolds reacting with 'but why' whilst dressed in hospital clothing" style="width:300px; margin-left: 0px;" />

Glad you asked. Starting out with a project when you first get into using a git forge tool is overwhelming. You have to learn git, how to manage issues, merge requests and what ever else there is these days. Your projects are/were probably simple and only used by yourself at the start.

As you move onto bigger projects, you then have to start thinking about things like not introducing breaking changes and you would achieve that by using a pipeline of some sort.

It's this part where you get an insight into the dev flow of software - and it's this bit I'm skipping on this post.. Sorry.

So, what I am looking to focus on is setting up automating the other end - the release information. In it's simplest form you want to achieve the following flow:

Tag a commit -> [the normal CI steps of deps, tests and builds] -> Push a build to a package registry -> Create the release notes -> Create the change log -> Update the readme with documentation.

This example will be based on a program I've been writing whilst learning Rust. It spits out a binary which I would like to eventually distribute, but to do that I need it in a place _to_ distribute. This will all be achieved within Gitlab (you will get 400 CI runner credits at the time of writing this, but you can bypass this by running your own Gitlab runner. This can be achieved by running it on your local machine, read more <a href="https://docs.gitlab.com/runner" target="_blank">here</a>).

## The required steps

### Step 1: Creating a build

This is fairly easy if you've done this before, and the code is best for the start of this. I will comment each part..

```yaml
# This will ensure that anything that's built is saved. In this case, saved in the `./target directory with the commit reference
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - target/

# This allows to break up parts into re-usable templates. In this case it's setting the image to be used, and then installs all the packages needed to build my Rust binary
.rust-template:
  image: rust:1.91-slim
  before_script:
    - apt-get update && apt-get install -y pkg-config libssl-dev libgtk-3-dev libxcb-shape0-dev libxcb-xfixes0-dev gcc-mingw-w64-x86-64 gcc-mingw-w64-i686 mingw-w64 libc6-dev

# Again, like the previous template, but extends for the build state
.build-template:
  extends: .rust-template
  stage: build
  script:
    - rustup target add $TARGET
    - RUSTFLAGS="-C target-feature=+crt-static" cargo build --release --target $TARGET

# Alas, the build step! 
build-linux:
  # Use the templates from above
  extends: .build-template
  # Set this stage to build
  stage: build
  variables:
    # set the target stage variable for re-use in the below sections
    TARGET: x86_64-unknown-linux-gnu
  # This is where we need to take note. Gitlab CI produces "artifacts". The paths section in the `cache` part allows us to now save "artifacts" to `./target` with anything we need for future inside, and is shared between stages (will make more sense later)
  artifacts:
    paths:
      - target/$TARGET/release/jd
    expire_in: never
    name: "jd--$TARGET--$CI_COMMIT_TAG"
  allow_failure: false
  rules:
    # We only want this binary to be built on a commit being tagged
    - if: '$CI_COMMIT_TAG =~ /^\d+\.\d+\.\d+$/'
```

This will build the binary and be available for us to use in the next steps.

### Step 2: Add the "artifacts" to the package registry

This is one of the steps that took me too long to figure out. Gitlab have a tool, <a href="" target="_blank">glab</a> - written in Go, it allows you to create releases with asset links via the command line interface [CLI]. But, it needs - from what I've learnt so far, long lived artifacts.

Cue the next job in the "release" stage:

```yaml
upload_release:
  stage: release
  # Use the curl image for the Gitlab runner to send a request to the Gitlab API for your project
  image: curlimages/curl:latest
  script:
    # Gitlab do an awesome job wit the pre defined env vars (anything wrapped
    # with ${}, uppercase and starting with `CI_`. The request here is to "put"
    # the built binary (from the cache path) into the packages registry. See 
    # the `file=@..` part; this is the path from the artifacts path which 
    # matches `build-linux.artifacts.paths`. This means it's getting the file 
    # `jd` from that path. Then, it uses the API V4 to create an entry with 
    # the version (`${CI_COMMIT_TAG}`.
    - 'curl --header "JOB-TOKEN: $CI_JOB_TOKEN" --request PUT \
        --form "file=@target/x86_64-unknown-linux-gnu/release/jd" \
        "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/generic/x86_64-unknown-linux-gnu/$CI_COMMIT_TAG/jd"'
  rules:
    # Again, we only want this binary to be built on a commit being tagged
    - if: '$CI_COMMIT_TAG =~ /^\d+\.\d+\.\d+$/'
```

This would mean that when run, we would have an entry in <a href="https://gitlab.com/NigelGreenway/jump-to-directory/-/packages" target="_blank">here</a>.

This is good. We are in a place where we can access these artifacts outside of the pipelines.

### Step 3: Creating the actual release

First, what do I mean by a release? Well, the usual flow of software is like so; You and the team will plan what you want to put into a release. You will create a milestone or target a set of work items made up of features/bugs and (hopefully) tech debt. These would be "batched" together for say release `v1.2.3`. You will then be able to feed back to the business or customers/users via a roadmap that N items will be in this release, and ready for X date.

This can be a very manual heavy process. You will probably have a check list like so:

 - Add all the items to the milestone
 - Collaborate with a release date (you might need to inform the front end or API team(s))
 - Go through a rigorous quality assurance [QA] flow of testing on a staging area or similar
 - Create the build
 - Upload the build to package managers
 - Create the release notes
 - Inform people of the new awesome build and feature/fixes being available

 So, the code:

```yaml
release:
  stage: release
  # Use the Go CLI tool written by Gitlab to manage the release creation
  image: registry.gitlab.com/gitlab-org/cli:latest
  # The `needs` key is important here as it tells the Gitlab runner to only run this step in the pipeline _when_ the build is completed 
  needs:
    - build-linux
  # As we are using the defined CLI image, we need bash in this case as I'm running a custom script to build out the change log
  before_script:
    - apk add --no-cache --upgrade bash
  script:
    # This command is to log in to your Gitlab hosted project to allow for future call's via the CLI tool
    - glab auth login --hostname $CI_SERVER_HOST --job-token $CI_JOB_TOKEN --api-protocol $CI_SERVER_PROTOCOL
    # This is a call to my script to get the release notes
    - NOTES=$(bash ./release.sh)
    - >
      # This is where we create the release. We create it based on the $CI_COMMIT_TAG (v1.2.3), we pass in the $NOTES that were created on the line above, and then we create the assets for the release, which we created in the first step.
      glab release create "$CI_COMMIT_TAG" --notes "$NOTES" --name "$CI_COMMIT_TAG" --assets-links="[{ \"name\": \"jd-x86_64-unknown-linux-gnu-$CI_COMMIT_TAG\", \"url\": \"https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/packages/generic/x86_64-unknown-linux-gnu/$CI_COMMIT_TAG/jd\", \"link_type\": \"package\"}]"
  rules:
    - if: '$CI_COMMIT_TAG =~ /^\d+\.\d+\.\d+$/'
```

This would create something like <a href="https://gitlab.com/NigelGreenway/jump-to-directory/-/releases/0.2.2" target="_blank">this</a>. This contains the assets (the source code up until this commit that has been tagged), the link to the binary that can be downloaded, and then the release notes.

Up until this point, nothing has had to be done manually other than tagging a commit - winning! This mean's the only effort to be put in is at the start when your development team write good, solid and informative "merge" commits.

Step 4: Update documentation with version references (and other stuff)

This was the other part that had me stumped - for about a day, annoyingly! A lot of searching the web got me parts of this and the other steps, but there were some key parts that were missing for me. So, this should help.

This step will allow you to update any code and/or content, then commit it back to the project.

In order for this step to run, you will need to head over to your Gitlab hosted project and go to the following sections:

`settings -> access_tokens`, and complete the following steps:

 - Click "Add new token"
 - Set a token name (I've used `GIT_AUTH_TOKEN`)
 - Set an expiration date (I've set it for a year)
 - Set the role to "Maintainer" to ensure permissions work correctly
 - Select "write_repository"
 - Submit via the blue button

You will then be give the value of the new token, but with "&#x2022;" instead of letters or numbers. Click on the button to copy this value ready for the next step.

`settings -> CI/CD -> variables`, then complete the following steps:

 - Click "Add variable"
 - Set "type" to "Variable (default)"
 - Set "Environments" to "All (default)"
 - Set "Visibility" to "Masked"
 - Leave the "Flags" (This got me, if you leave "Protect variable" as checked, then the pipeline **wouldn't** pick up the variable - hence why I lost most of my day)
 - Set the "Key" (I've used `GIT_AUTH_TOKEN`)
 - Set the "Value" with the key we copied in the previous steps

You now should be good with the next part of the pipeline!

```yaml
update_readme:
  stage: release
  # This is just a general image. Alpine is just a small Linux distro containing the bare minimum for light use
  image: alpine:latest
  # We don't want to do this _until_ a release has been completed
  needs:
    - release
  before_script:
    # Install git and sed
    - apk add --no-cache git sed
    # Set up our git user for the commit message author
    - git config --global user.email ${GITLAB_USER_EMAIL}
    - git config --global user.name ${GITLAB_USER_NAME}
  script:
    - >
      # This was fun, as multiple articles gave multiple solutions - but 
      # failed to mention how the variables worked. This will now set the 
      # remote URL with the correct authentication setup (see the 
      # CI_PROJECT_NAME:GIT_AUTH_TOKEN part)
      git remote set-url origin https://${CI_PROJECT_NAME}:${GIT_AUTH_TOKEN}@${CI_SERVER_HOST}/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}.git
    # This section will take the tag from the commit, then replace the version 
    # value with the new tag from a template I use for my README.md to be 
    # updated for the latest version to be installed by the user
    - export VERSION=${CI_COMMIT_TAG#v}
    - sed "s|{{VERSION}}|${CI_COMMIT_TAG}|g" .gitlab/README.template.md > README.md
    # Then, the golden part - once updated, add the file to the staging area in
    # in git, commit and then push to the main branch
    - git add README.md
    - >
      git commit -m 'docs: update README download URL'
    - git push origin -o ci.skip HEAD:main
  rules:
    # Once again, we only want this to be update upon a tag creation
    - if: '$CI_COMMIT_TAG =~ /^\d+\.\d+\.\d+$/'
```

This means that now, you don't have to do any of that stuff again! You can just tag a specific point in your git history. No building, no deploying, no writing up release notes. There's other things I need to automate:

 - Create and update a `CHANGELOG.md` with the latest changes
 - Ping Slack with a message on the release
 - Post to socials with the release
 - Push to various package managers to push the latest binary out there for the world to see

The biggest benefit to all this; it's the same, reproducible steps
