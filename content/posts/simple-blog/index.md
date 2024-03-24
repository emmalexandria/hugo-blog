---
title: "The joy of a simple blog"
date: 2024-03-22
description: "Why on earth do developers keep building these dumbass blogs?"
tags: [Web]
draft: true
---


{{< toc >}}

In the spirit of the thesis of this blog post, I'm going to try and keep it short.

# Readability

When it comes to the design of content-focused sites like blogs, there's a idea I like to talk about that I call the HTML/CSS readability curve.


{{<simg src="htmlcssgraph.png" caption="HTML & CSS readability curve" >}}


In my view, raw HTML is already very readable. With a few minor tweaks (fonts, more whitespace, and truncated line length), it's about as good as you can get. As you add CSS, it slowly becomes more and more difficult to comprehend until it reaches the 'frontend dev showing off' turning point. At this point, the site is a complete mess (if very pretty). This graph isn't perfect. It doesn't account for the effect of more HTML elements on readability.  However, I still think it touches on something important. The web is becoming increasingly bloated in pursuit of aesthetics.

For some reason, this doesn't seem to be a result of demands of clients or corporate wishes. Instead, developers seem to be leading the charge with ridiculous blogs. They'll smush together NextJS, Tailwind, some kind of CMS, Framer Motion, and a shitload of Javascript to create something they think will impress other people. For some reason the site now has page transitions, there's a floating table of contents to the side of every page, Disqus integration, a complex taxonomy system, etc. I find this complexity maddening as someone trying to read their blog. It appears like as a level of disrespect for my time, energy, and desire to actually comprehend whatever it is that they're saying.

In my view, blogs should attempt to be as visually simple as they can without comprising whatever aesthetic vision the developer has. Oh, and don't fuck up accessibility. Seriously.

## The rule of stopping

Building something readable is about restraint. Your blog page doesn't need that many elements. It just needs to render some Markdown. It's a simple process really:

1. Define a typographical hierarchy.
2. Set up navigation.
3. Stop.

Step 3 is really the difficult part. It can be very tempting to add just *one more feature*. Once your blog can render posts and look relatively nice you it's time to stop adding new things. There are some additions that can be nice to have, like syntax highlighting and an RSS feed. Those are fine to add once you need them, but the reason they are an exception to the rule of stopping is that they likely positively imapct the reading of the actual blog text, instead of adding more random crap.


# Technical simplicity

Stop putting goddamn Javascript in your blogs. Seriously. You should be rawdogging HTML & CSS like its 1996. This site contains a single Javascript file. 
Here's all it does:
```js
function setTheme(mode) {
  localStorage.setItem("theme-storage", mode);
  if (mode === "dark") {
    document.getElementById("darkModeStyle").disabled = false;
    document.getElementById("dark-mode-toggle").innerHTML = '[long ass svg]';
  } else if (mode === "light") {
    docume  nt.getElementById("darkModeStyle").disabled = true;
    document.getElementById("dark-mode-toggle").innerHTML = '[long ass svg]';
  }
}

function toggleTheme() {
  if (localStorage.getItem("theme-storage") === "light") {
    setTheme("dark");
  } else if (localStorage.getItem("theme-storage") === "dark") {
    setTheme("light");
  }
}

var savedTheme = localStorage.getItem("theme-storage") || "light";
setTheme(savedTheme);
```

Dark mode support got an exception for accessibility reasons. That's it. This site just runs on Hugo. I initially built it in Zola. It's dead simple and going nowhere. That is all a blog needs to be. I don't think that your blog is where you show off your prowess as a developer. It's like web developers are a superhero with a really shitty power of overcomplicating things, and they leap into battle to build the world's most overengineered blog. *Nobody* is impressed by your blog. *It's a fucking blog*. Every single developer worth paying a cent can build some hypermodern blog with an insane bundle size. So why are we still doing this? Why not build a simple blog with a SSG that'll just work?



# Why do developers do this?
I think the fundamental problem is an inversion of what makes your blog interesting to people. Developers often seem to believe that people will care about their blog if their blog is a technically interesting website. This is simply untrue. The most prodigious developers of the last 70 years could create blogs that were literally raw HTML, and people would read them. The blog itself is not important.

It reflects a wider culture in technology of doing what is 'cool' instead of doing what is needed and doing it damn well. 

