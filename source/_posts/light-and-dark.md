---
title: Light and Dark
date: 2020-05-22
description: Modern Operative Systems give us the option to choose light or dark themes at OS-Level, with simple CSS we can build a site that can reflect that configuration visually.
tags: [meta, css]

---

I think Twitter was the first mobile app with a dark theme that I was obsessed with. I know, Youtube already had one back then, but that wasn't a big deal for me, since 90% of the time I'm using Youtube, either the app or at the desktop, I'm using it to watch videos in full screen.

My love for dark-colored applications started back when I use Sublime Text for the first time (I remember it was still version 1), but what I like about it, was that not only the editor area of the app was dark-colored but the whole app. And the coloring was so on-point that I didn't have to personalize it, nor choose any other theme it already had, the default one was perfect.

When Apple announced a dark theme for iOS and macOS I was very hyped and counting the days until the release for both of them. I have to say I like the macOS better, because iOS kinda have too much contrast for my taste, but that doesn't mean it isn't great. It's still a big win to have the option to switch coloring for all apps, and better still when those colors are consistent in all apps.

All that being said, CSS gives us the option to customize our websites depending on the _theme_ the OS is using.

`@media (prefers-color-scheme: $THEME)` is the key to everything, it's a simple media query to evaulate the user's preference on their OS or Browser theme. Check the MDN page to learn about browsers' support:
https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

Quick example:

```css
@media (prefers-color-scheme: light) {
  /* My awesome light theme */
}

@media (prefers-color-scheme: dark)  {
  /* My awesome dark theme */
}
```

I have to say it's easier to build something with a light/dark theme from scratch than adding the option along in development. Mainly because of the fewer colors we use, the better to customize.

So for customizing colors I like using HTML classes that reflect the color independent of the theme, for instance `title-color`, `bg-color`, `footer-color`.

Using SASS or any other preprocessor, we can easily customize the coloring and add more structure to our files.

Currently, the CSS I'm using for coloring on this site is pretty simple:

```scss
$foreground: #16161d; // Eigengrau
$background: #FFFFFF;

@mixin color-theme($fg, $bg, $bg-dark, $fg-light, $link, $link-hover) {
  color: $fg;
  background-color: $bg;

  a[href]       { color: $link; }
  a[href]:hover { color: $link-hover; }

  .fg-color        { color: $fg; }
  .bg-color        { background-color: $bg; }
  .fill-with-bg    { fill: $bg !important; } // This is for svg
  .bg-color-border { border-color: $bg !important; }
  .fg-color-border { border-color: $fg !important; }
  .fg-color-invert { color: $bg !important; }
  .bg-color-invert { background-color: $fg !important; }

  // for dark backgrounds (or even darker when using a dark theme)
  .bg-dark {
    color: $fg-light;
    background-color: $bg-dark;

    a[href] { color: $fg-light; }
  }
}


@mixin light-theme {
  @include color-theme(
    $fg: $foreground,
    $bg: $background,
    $bg-dark: $foreground,
    $fg-light: $background,
    $link: $foreground,
    $link-hover: crimson
  );
}

@mixin dark-theme {
  @include color-theme(
    $fg: $background,
    $bg: $foreground,
    $bg-dark: black,
    $fg-light: $background,
    $link: $background,
    $link-hover: crimson
  );
}

.system-theme { @include light-theme; }

@media (prefers-color-scheme: dark)  {
  .system-theme { @include dark-theme; }
}

.light-theme { @include light-theme; }
.dark-theme  { @include dark-theme; }
```

<br>

The default color I'm using for the dark theme is [Eingrau][eingrau] instead of black (`#00000`), because I don't like full black backgrounds since too much contrast hurt my eyes. I also use `!important`  on the coloring instructions just in case I import a third party CSS which recolors the default tags.

<picture>

![Eingrau vs Black][eingrau-image]

<legend>Eingrau vs Black</legend>
</picture>

For gray areas I tend to use semi-transparent backgrounds, so they can work on both white and dark pages, it's better to not use that many shades of gray because transparent colors can be tricky to work with.

```css
.gray-ish {
  background-color: rgba(128, 128, 128, 0.2);
}
```

## Keep Themes Independent

It's important to keep the option to use other themes on the page, and not write the instructions directly inside the `prefers-color-scheme` query. That's  why I define all the dynamic coloring inside a `.system-theme` class as a reference to use the system's theme. And also keep the colorings as `.light-theme` and `.dark-theme` in case I want to force those colors on the page, or if I want to use a theme just in a section of the page.


The only downside using light and dark themes is that you have to test both independently, but that's not a surprise, isn't it?




[eingrau]: https://en.wikipedia.org/wiki/Eigengrau
[eingrau-image]: https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Eigengrau-vs-black.png/239px-Eigengrau-vs-black.png
