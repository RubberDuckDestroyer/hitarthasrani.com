---
title: "Always backup"
date: "2020-03-29"
description: "Experience and blunders caused by not backing up!"
---

As a developer, **mistakes happen** and they will happen. I cannot stress this enough.

The lesson of the day is **Don't forget the dev branch!** Yes that's correct. If you're new to open source and version control, I advise you not as a professional but as a peer to *always* have a 'dev' or development branch and do not start coding directly into the master branch!

### This is how I blundered up so you don't have to:
Firstly, since I don't have a CMS or database for this website, I write all my blogs as a markdown file in the source.
For this blog, I did not create a seperate dev branch. I also set up a configuration to directly build into the master branch. Guess what, bad idea!   

![facepalm](https://media.giphy.com/media/27EhcDHnlkw1O/giphy.gif)

As soon as I built my files, the master branch or my working directory got replaced by build files that are being served by github pages. This means to get my working directory back, I had to redownload the starter code and re write my blogs. I also put my code into a devellopment branch so that the next time I write a blog, it will push to the master branch without affecting my work.

Yes, you can blame this to being quick and lazy in your work. The important thing to remember is that sometimes, mistakes happen and you should learn from them. But what would life be without a few mistakes and blunders throughout the journey...our experiences make us what we are. With that, I'll end this short blog.

*Note: All GIFs are from [Giphy](https://giphy.com).*