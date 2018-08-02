+++
description = "An initial overview of my GitLab CI pipeline"
title = "My GitLab CI CD Pipeline overview"
date = "2018-07-18T00:00:00Z"
+++

## My pipeline

This is a continued post from [Creating a CI & CD pipeline with GitLab, Rancher and Digital Ocean](/posts/creating-a-ci--cd-pipeline-with-gitlab-rancher-and-digital-ocean/).

So, I am using the following tools:

 - [GitLab]
 - [Docker]

[GitLab] is an alternative to [GitHub](https://github.com). I've been trying it out for about 6 to 8 months and finding it very well thought out and fully featured. The main bonus is that you can host it yourself so your code can be truly private and controlled. The features I'm using for my pipeline are:

 - The repository (obviously)
 - The docker registry
 - The Build service
 - The integration services

### <a href="#linting-and-test-runners" id ="linting-and-test-runners">Linting and test runners</a>

In a basic overview I do the following:

```
Commit code =>
    push to gitlab =>
    run linter =>
    run tests =>
    build docker image =>
    push to registry =>
    hit Rancher API to inform there is an image ready and waiting
```

If my linting, unit tests or UI tests fail, then the build fails. The first to fail will stop the pipeline jobs and report as a failure. With GitLab I use Cypress for my UI tests and this allows me to save images and videos of failed tests as artifacts for the time specified of my liking. So, if a build fails on UI tests, I will save them for 7 days and after that GitLab will remove them automatically. \o/

A snippet of a current project I am working on:

```yaml
linter:
    image: node:8.11
    stage: linting
    tags:
        - test
    script:
        - npm install
        - npm run lint

unit_tests:
    image: node:8.11
    stage: test
    script:
        - npm install
        - npm run test::unit
    tags:
        - test

user_tests:
    image: cypress/base:10
    stage: test
    script:
        - npm install
        - npm run build
        - npm start --quiet > /dev/null &
        - npm run test::ui
    artifacts:
        when: on_failure
        expire_in: 1 week
        paths:
            - ./__tests__/UI/cypress/screenshots
            - ./__tests__/UI/cypress/videos
    tags:
        - test
```

### <a href="#docker" id="docker">Docker</a>

Next is the Docker image for my application/site. Using secret keys stored in GitLab, it will login to the configured registry, build the image locally and then push the image to it's registry.

```yaml
build_review:
    stage: build
    image: docker:stable
    services:
        - docker:dind
    script:
        - docker login -u gitlab-ci-token -p "${CI_BUILD_TOKEN:-$CI_JOB_TOKEN}" $CI_REGISTRY
        - docker build -t $DEVELOPMENT_IMAGE_TAG .
# This will overwrite the tag with the latest build!
        - docker push $DEVELOPMENT_IMAGE_TAG
    tags:
        - build

```

In the preceding code, I am using Docker to build a Docker container via the `dind` service (Docker in Docker), this allowed me to do what I needed to do, but be aware of [this article](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/).

### <a href="#variables" id="variables">Variables</a>

I am then running three scripts, `docker login`, `docker build` and `docker push`. I am using the secret - and built in - variables which are prefixed with `CI_`, then I have my own variables defined at the top of my file to allow me to create images tagged with the branch name for demos and a timestamp for staging and production. I then use that same tagged image to push it to the registry that is already configured.

```yaml
before_script:
    - export TARGET_STACK=gitlab-demo-stack
    - export REVIEW_TARGET_STACK=gitlab-demo-stack--review
    - export REVIEW_FRONTEND_URL=review.demo.local
    - export BRANCH_REVIEW_FRONTEND_URL="${CI_COMMIT_REF_NAME}.review.demo.local"
    - export DEVELOPMENT_IMAGE_TAG=$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_NAME
    - export VERSION=$(date +%Y.%m.%d.%H.%m)
```

All this information is contained in a file `.gitlab-ci.yml` ([view example](https://git.futurepixels.co.uk/snippets/1)) which lives in the root of my project.
There are two different build versions of this I am currently setting up:

 - **review**: Builds and pushes a branch tagged version of the app
 - **uat**: Builds and pushes a staging version for viewing/testing several features that are merged together

The next part will be setting up [GitLab] on [Digital-Ocean] for your personal/business usage.

 [GitLab]: https://gitlab.com
 [Docker]: https://docker.com
 [Digital-Ocean]: https://digitalocean.com
