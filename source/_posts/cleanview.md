---
title: "cleanview: A Clean Viewer for Articles Online"
date: 2020-05-10
description: Cleanview is a little npm package I created to take the main content from web articles and remove all the clutter that's not part of the real content.
tags: javascript

---

Cleanview is a little npm package I created to take the main content from web articles and remove all the clutter that's not part of the real content.

I created the library for using it in the newsreader I did for my own use, that because even if they were some similar libraries out there already, they were too heavy, or had too many dependencies or worked need to check then DOM elements of the page to generate the cleaner version.

I wanted a simple library, who can work either at the frontend and the backend, and something that can do the work just reading the HTML, without the need to use actual DOM elements.

So what I did first, was to load a library to parse the HTML as JSON data, for that I did use Himalaya, which is pretty straightforward for the job, It works not only with HTML but XML as well, and is very tolerant to malformed tags.

The main idea, or the main step of the library, is to take the actual content, for that, I considered the "content" as the paragraph elements (`<p>`). So wherever there's a `<div>` or another element with several paragraphs inside, that will be considered as the main content.

For that step I did an evaluation first, the element marked as "content" must have at least 50% of the total count of paragraphs from the page, because of course `<p>` elements are not exclusive for "content" in the real world.

In case the library couldn't find a content element, a message will be shown with the link of the page instead, so the users can still see the page content themselves.

Once the content element is marked, the library scatters all the elements inside it and take only the relevant ones, paragraphs, titles, images, `<picture>`, `<pre>`, videos, etc.

I added some custom code for youtube videos, also I want to add the same for other platforms.

Some additional parameters can be sent to the library, the most important (besides the HTML), is the link of the page, I use that link to transform all relative links to absolute ones, that for the anchors and images.

Also, the user can pass the classes for some elements they want to force remove (like a "related articles" section inside the content) and also for elements they want to keep, for that, the user will need to know well the structure of the page, but I keep that option for play with commonly used names for those sections.

Right now the library does the job I expect it must do, it isn't perfect though, but at least I get readable content, and most important, it doesn't crash or anything when "reading" the HTML content.

The only thing at which it fails the most is with dynamic images because those are loaded with javascript on the page and the original `<img>` just has a tiny version of the image or the don't have an image at all.

I'll see what can I add to the library in the future, I'm happy with what it does right now, but I know I still can add improvements to it. The npm package for the library is at:

https://www.npmjs.com/package/cleanview