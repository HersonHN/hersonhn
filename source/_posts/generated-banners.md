---
title: Generating Dynamic Banners Using the Post Title as Input
date: 2020-05-25
description: Random geometric shapes drawed in a canvas and saved as .png
tags: [meta, javascript]

---

<small><i>Ok, this one was pretty fun, and not hard at all. I quite did all the work in half a day, but I want to share what I did because I liked the final result.</i></small>

This banner you can see on this post is generated using the URL for the page. It's partially random, it is just using the title as a seed for the RNG.

For that I used [trianglify][trianglify] which pretty much does all the hard work, trianglify uses canvas to generate the mesh for the image, you can use it either on the frontend or backend and saves the image as _png_, _jpeg_ or _svg_.

At the core it uses [canvas][canvas], which is a great library to emulate the `<canvas>` API at the backend, it works pretty similarly as in the frontend (I, personally can't see the differences between both), it also provides an [api to save the generated image as png or jpeg][canvas-save].

Trianglify has some configurations for generating the image, for example, the size of each cell (triangle), the color palette, the amount of variance for the dots' positions, and a seed parameter to generate always the same image for each seed, that was precisely what I needed, sadly the seed only generates randomness for the mesh and the palette, but not for the size, and the variance.

To make those things more random I used [seedrandom][seedrandom], with that I can provide a seed (the same see I was using for trianglify), and generate the properties that weren't randomized.

My configuration ended up like this:

```javascript
{
  width: width,
  height: height,
  cellSize: rand([75, 150, 100]),
  colorSpace: rand(['rgb', 'hsv', 'hsl', 'hsi', 'lab', 'hcl']),
  fill: false,
  seed: name,
  strokeWidth: 2,
  variance: rand([0, 0.75, 1, 1.5, 2, 2.5, 3]),
}
```

The `rand` function called the seeded random function to return an element of the provided array.

The `colorSpace` parameter is very interesting and made want to write a post about how different color mixers work, basically there you can choose the actual algorithm wich with the colors will be mixed.

I didn't want to test that many cell sizes, because when cells are too small the image looks too loaded, and with big ones it seems a little boring.

## The Generated Images

Using those libraries I generated the images as _png_, I created two for each post, one for the banner with transparent background, so it can mix well with either light or dark theme and another one with a white background to use as the image the social media sites show.

Then I added [optipng][optipng] to compress the generated files, that was the easiest part since  [canvas][canvas] already generates the files as [WrittableStream][ws]s so I just pipe optipng before saving the file.

I'm so happy with the final result because it was pretty easy to do and quite a beautiful result. Sometimes we can get happy with little things, and coding the generator for these banners was that "little thing" for me.

The actual script is here: [generate-banners.js](https://github.com/HersonHN/hersonhn/blob/master/tools/generate-banners.js)


[trianglify]: https://trianglify.io/
[canvas]: https://www.npmjs.com/package/canvas
[canvas-save]: https://developer.aliyun.com/mirror/npm/package/canvas#canvascreatejpegstream
[seedrandom]: https://www.npmjs.com/package/seedrandom
[optipng]: https://www.npmjs.com/package/optipng
[ws]: https://nodejs.org/api/stream.html#stream_writable_streams
