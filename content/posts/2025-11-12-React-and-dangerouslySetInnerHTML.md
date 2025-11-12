+++
title = "React and dangerouslySetInnerHTML"
description = "Injecting HTML into your React components with `dangerouslySetInnerHTML` isn't always the answer..."
date = "2025-11-12"
+++

Injecting HTML into your React components with `dangerouslySetInnerHTML` isn't always the answer...

React has a long and great history of being able to do web development pretty much any way you want. Whether its functional or class based components or in this case being able to allow for a dynamic block of HTML to be injected into your component.

As with anything in software engineering, there is always a balance.

In the following blog post, we will be working on the scenario where we have a block of content from a content management system [CMS] which _could_ include some HTML.

React makes this really easy, `dangerouslySetInnerHTML` is a prop already available in the framework. Before we get into specifics, here is a quick example of what it looks like:

```jsx
import React from "react";

const myContent = "Hello world!";

const MessageComponent = ({ content }) => {
  return <p>{content}</p>;
};

export function App(props) {
  return (
    <div className="App">
      <MessageComponent content={myContent} />
    </div>
  );
}
```

Simple enough, and the output looks like so:

![An image with the output showing "Hello world" in a paragraph element](/img/posts/react-and-dangerouslySetInnerHTML/step-1.png)

Now, what if we change up the `myContent` variable to contain HTML content?

```jsx
import React from "react";

const myContent = "<p>Hello <i>World</i><b>!</b></i></p>";

const MessageComponent = ({ content }) => {
  return <p>{content}</p>;
};

export function App(props) {
  return (
    <div className="App">
      <MessageComponent content={myContent} />
    </div>
  );
}
```

React doesn't know about this by default, so will output it in its raw format:

![An image with the output showing "Hello world" in a paragraph element, but with other HTML elements showing as raw HTML](/img/posts/react-and-dangerouslySetInnerHTML/step-2.png)

This is where `dangerouslySetInnerHTML` comes into play. Lets add it and see what happens:

```jsx
import React from "react";

const myContent = "<p>Hello <i>World</i><b>!</b></p>";

const MessageComponent = ({ content }) => {
  return <p dangerouslySetInnerHTML={{ __html: content }} />;
};

export function App(props) {
  return (
    <div className="App">
      <MessageComponent content={myContent} />
    </div>
  );
}
```

The output is as so, and is a success!

![An image with the output showing "Hello world" in a paragraph element, but with other HTML elements showing as rendered](/img/posts/react-and-dangerouslySetInnerHTML/step-3.png)

Well, it works at least..

Here, all we are doing is smashing the content into the DOM. React will do this by [setting](https://github.com/facebook/react/blob/269edb88b28b7394335fb504d9924acd35d4ef38/packages/react-dom-bindings/src/client/ReactDOMComponent.js#L602C11-L626) the following with `setInnerHTML` or the `innerHTML` on the object property. The `innerHTML` - as per the [Mozilla Developer Network [MDN]](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) , will apply the string of HTML passed to the property and render it on screen. The issue with this is you can pass _anything_ via your CMS. Say the string was maliciously set in the CMS system by someone, as you want to be able to allow your users to pass in content with links? Other examples are [Cross Site Scripting [XSS]](https://www.cloudflare.com/en-gb/learning/security/threats/cross-site-scripting/), but we will focus on this potential security issue in this article.

This means that **_anything_** passed to `dangerouslySetInnerHTML` is ignored from a responsibility aspect by React and pushes that ownership to the users client. This means zero sanitisation - eek.

A contrived example would be someone passing an element with a script underneath it, like this `Read this <u onmouseover="alert('Hey')">text<u>`. If this were instead a script that would copy the cookies and post them off somewhere to decode, sell or what ever then the user would not know this and you've caused a potential security hole. When an element is passed with something that can interact, it will be executed as intended.

### What about those pesky script tags?

When you pass a `script` tag into the `innerHTML` property then you can rest assured knowing that the browser has your back for that with the [HTML spec](https://www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0).

> HTML specifies that a [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) tag inserted with `innerHTML` [should not execute](https://www.w3.org/TR/2008/WD-html5-20080610/dom.html#innerhtml0).

[reference: [https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations)]

## How to allow custom HTML in a react component

Enter a small package called html-react-parser, a light package that will go through the raw HTML that is passed and convert each "node" into a React element. This means that anything in the content block will be set as an HTML element - just like it does in `dangerouslySetInnerHTML`. The difference this time though is that the parser will ignore things like the `onCick`, or `onmouseover` properties and only allow `style` and custom props, like `data-test` or aria labels. Thus, meaning that your raw HTML is now sanitised.

This is as simple as:

```jsx
import React from 'react';
import parse from 'html-react-parser';

const myContent = "<p>Hello <i>World</i><b>!</b></p>";

const MessageComponent = ({content}) => {
	const sanitisedContent = parse(content);

  return <p>{content}<p/>;
}

export function App(props) {
  return (
    <div className='App'>
      <MessageComponent content={myContent}/>
    </div>
  );
}
```

Now you have more protection on bringing that content from your CMS into your app and it containing HTML markup without having to worry about malicious behaviour.

### Side note...

Whilst it is possible to use `dangerouslySetInnerHTML`, it is always recommended not too - hence why it has "dangerously" in the property name.. Its not a problem to use if you control the input, but if that ever changes and you don't remove the way the HTML markup is smashed in, then you could be in for a world of pain if someone uses it to their advantage. Adding this package will add less than 500kbs when unpacked, so its totally worth it for that piece of mind!

