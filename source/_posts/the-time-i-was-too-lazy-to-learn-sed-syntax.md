title: "The Time I Was Too Lazy to Learn sed Syntax"
date: 2020-05-15
tags:
  - ruby
  - cli
-----

A long time ago, to be specific back in 2013, I was minding my own business sorting my videos and series collection. I’m very perfectionist at organizing files, for instance, all my music files are sorted first in **Artist** folder, then by **Year - Album**, and inside the album folder, all songs with just the number of the track, a hyphen and then the name of the track (**## - Track name**).

That can be easily done because there are several tools dedicated to renaming music files massively by their ID3 tags. But for videos not that much, or at least I didn’t know any tool for that task regarding videos. I wanted to keep things simple, the easiest way would be just renaming all series episodes as **Episode 01**, **Episode 02**, etc... but for those with a lot of episodes, it would be a tiresome task.

So, I wanted to create an automated and fail-proof way to rename my files. I started with a simple line in bash, my objective was to rename all my files from a folder `cd` to another one, and run the command again.

That was an easy solution for many of the series I had, but there was a series with 500+ episodes, all of them have their episode name in all caps, and I didn’t want to remove the name from them, and renaming them in a clean format would take me hours.

What would be the best and easiest solutions? ... That’s right, create a script in ruby to do the task and run it on the folder.

But I decided to make the script reusable, not only for that folder, and not only for renaming videos, and not only for "renaming" things. I program it to read the input from `stdin`, make some changes for the input \*line by line\*, and return the output to `stdout`. 

The script flow would be simplified as:

1. Take some input
2. For every line of the input
    - Take a line
    - Do **X** task with line
    - Return the result
3. Join all lines
4. Return output

Ruby was an excellent choice for the task, mainly because Ruby has a lot of ways to declare strings and that would be useful to avoid bugs when parsing lines with mixed single and double-quotes. The idea I had for the final product would be something like this:

```bash
ls *.mp4 | COMMAND 'mv "#{line}" "#{line.downcase}"' | sh
```

And of course, the command would be useful for other tasks, for example, take just the commit id from `git log` and save them to a file:

```bash
git log --format=oneline | COMMAND "#{line[0..40]}" > file.txt
```

<small>Those two examples are from real life (I looked at on my `.zsh_history` searching for examples)</small>

Most of those tasks can be done using `sed` mixing `xargs` and other CLI tools here and there, but I didn’t have the patience to learn the `sed` syntax, it is intimidating and the sed instructions aren’t readable at all.

The hardest part about writing it was to choose a name, I needed a name that didn’t collide with any other existing command (even in the future), and it needed to be short and easy to remember. So, I named it `goku`, I was planning to change its name when I could think of a better one, but I get used to it and I leave it that way.

I was very happy to write the script in Ruby. Its syntax is easy to read and remember. I’m using it since then and it hasn’t changed that much since then (just 6 changes in git history, two of them being for typos). Maybe one day I’ll publish it as a gem or something like that. But in the meantime, if you are interested you can check it here:

<https://github.com/HersonHN/dotfiles/blob/master/bin/goku>

 