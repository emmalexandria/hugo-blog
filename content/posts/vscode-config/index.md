---
title: "Making VSCode better for your brain: the fun and profit"
description: Here's the path I'm trying to take out of the pit of VSCode reliance.
date: 2024-03-27
tags: [tutorial, mindset]
draft: true
---

# Introduction

This post comes in two parts. The first is a rambling tangent about why I believe VS Code is a bad tool. Sorry. I have a lot of pent up frustration. The second part is genuine
advice on configuring VS Code to force yourself to adopt a more keyboard centric workflow. That starts at [this heading](#moving-forward).

I've used many editors and IDEs over the years. Back when I was younger, maybe 13-16, I was very flexible. I used whatever I had and whatever I thought was cool. I grew up on Visual Studio (or Codecademy to be more accurate) because I made the unfortunate decision to learn C# as my first language. That led to many years of flirting with game development in Unity. I also did some light and unsuccessful engine development in IntelliJ (using Java, yes). I even wrote C in GNU Nano on laptops at my school. I flirted with Vim and Emacs during my Linux customisation phase.

Interestingly, the one editor which never interested me at all was Visual Studio Code. It felt like it was sitting in this awkward place between being feature light and an IDE. I just... wasn't a fan. I think there was a very high chance I would've ended up a Neovim user if I was interested in development back when I was daily driving [i3](https://i3wm.org/). Somehow though, I ended up a VS Code user and now I'm trapped:

1. I need to switch back to Linux to do proper terminal centric development. It's absolutely horrible on Windows.
2. I need to dualboot Linux & Windows so I can pirate software and games (sorry not sorry).
3. I need my only spare SSD to run my home server, and I need to not waste money on a new SSD.

Hence, I am stuck. However, I realised that what I'm doing to cope with VS Code would actually work well as a path to lift oneself out of VS Code dependency into a more keyboard centric workflow. First, let's talk about why VS Code isn't that great.

# So much is wrong with VS Code

This is the part where I go on a rant.

## Instability

Let's move past the jokes about performance to make fun of VS Code in some new ways. It's embarrassingly unstable. There are countless bugs only fixed by reloading the window (in extensions and Code itself). Extensions which I have no doubt are developed by incredibly smart people (e.g the Vim & rust-analyzer plugins) are plagued by persistent bugginess. It's not hard to understand why. I don't know how many of you have had the displeasure of interacting with the VS Code system for key bindings, but it's arcane, mostly undocumented, and unbelievably verbose. It's a good way to understand how hacked together VS Code is.  

Working with VS Code is much about the least in control of my programming environment I've ever felt. In my experience, VS Code is really lovely if you want:

- A search all files menu that just seems to appear at any time it wants
- Schizophrenic Git integration that doesn't really work at all with multiple accounts
- Code suggestions that disappear and don't come back until you fully delete and retype a line
- LSP hallucinations that require an editor restart to fix

You get some bonus instability in the fact that fucking Microsoft owns your code editor. VS Code comes with a fun feature where it serves as a vertex of Microsoft's ongoing and incredibly obvious plan to:

1. Buy a popular VCS service.
2. Capitalise on a gap in the market for free user-friendly editors by using their insane wealth to undermine competitors.
3. Highly integrate that aforementioned VCS service with their editor to undermine their competitors.
4. Use open source code with no consent to build an AI tool that is also highly integrated with your editor to undermine their  competitors.
5. Gradually vertically integrate the three until new developers do not know another way of developing but the *✨Microsoft Way✨*.

## Mediocrity abounds

VS Code displays my absolute least favourite kind of UX. It lives in this valley of mediocrity where the defaults are okay enough to convince you they aren't worth changing, but they still handicap you. It's *barely* good enough. It isn't quite worth it to go through the key binds to work out what obscure value you have to change.

It's an interesting balance. VS Code with minimal key binds and heavy mouse usage is just fast enough and configuring VS Code is just painful enough that most people never worry about optimising for productivity. Even if they did, optimising VS Code doesn't get you far. I don't blame Code users (like myself) for their mediocrity in using their editor. Who would ever bother with learning the key bind for find and replace when it functions identically to find but the replace dropdown is auto expanded? Why would you ever learn to open and switch between files with the keyboard if it takes an extension and multiple configuration options to barely suppress VS Code's eagerness about re-opening its file explorer at any moment that is vaguely related to files? Invest too much time into the default set of VS Code key bindings, and you'll come out with maybe 5-10 things that are useful, half of which everyone else knows anyway. VS Code's interface isn't just mediocre, its mediocrity encourages its users to accept the defaults, only learn a key bind when something is *especially tedious*, and live with that.

VS Code holds back developers from growth in this way. It does even more harm in the manner in which it obscures the processes underlying development.

## Abstraction

VS Code serves to drag you away from the machine you're communicating with into Microsoft land. VS Code is not just a code editor. It's actually
a nearly fully featured file manager, a GUI `git` client, a debugging GUI, a terminal - three in fact, one of which supports tiling and tabs, a code linter, a fully featured Markdown editor including preview, document outline, and snippets. Oh, and it's a code editor too! With tabs, tiling, tabbed tiling, that incomprehensible system where your open tabs depend on the file you have focused, and a bunch of other stupid bullshit related to moving editors around.

What actually makes this a problem though? Plenty of editors (read, IDEs) are like this. However, VS Code is not truly an IDE. It's more like Sublime Text cosplaying a riced up Emacs config.

The difference is that those heavyweight IDEs actually achieve gains with their abstraction. Given that setting up a CMake build pipeline that actually works on more than 2.58% of computers is one of mankind's greatest unsolved problems, it's fine to put some extra bulk into a development environment. I would not expect an application that manages my entire toolchain and build process to play nice with a non-integrated terminal. The same goes for the file explorer, given the sheer weight of refactoring tools provided. Heavyweight IDEs like IntelliJ and Visual Studio are like aircraft carriers. They're giant, slow, expensive, hard to maintain, and overkill for nearly any situation. Under this analogy, Visual Studio Code is more like a cruise ship: giant, slow, expensive, hard to maintain, and overkill for nearly any situation. The difference is that the aircraft carrier achieves *something*. The cruise ship serves to take tourists through the exotic world of "Jabmascript" hundreds of feet from the shore and distant from anything that might scare them.

|Abstraction|IDE Result|VS Code Result|
|-----------|----------|--------------|
|Run & debug | Managed build pipeline | `launch,json` (???)|
|Integrated terminal|Readable output of IDE tasks|`launch,json` again???|
|File explorer|Robust and flexible refactoring tools|I had to download a fucking extension to be able to create files without the goddamn stupid fucking file explorer and then another one to stop it from automatically popping up every single time I do anything.|

VS Code does all the abstractions for no particular reason. It just makes things less scary for those who want to be developers but are terrified of being left alone with a computer. It's incredibly rare to have an editor which features both 3 kinds of integrated terminals (with multiple tabs, splits, and pop out terminals) and a userbase who would rather use the terminal to run projects over the built in tooling.

One could however point out that editors like Neovim and Emacs have the potential for and a history of custom tooling including file management, tooling, debugging, git, etc. There's an absolutely crucial difference between abstractions you *make* and abstractions you *learn*. VS Code is all abstractions you learn. Instead of learning your way around your computer, you learn your way around VS Code land. When other people make abstractions and you simply learn them, you just warp reality. Building your own abstractions however is a powerful tool for creating understanding. It's the difference between an abstraction that conceals and an abstraction that invites deeper understanding.

## Basically

VS Code is an overbuilt editor which encourages mediocrity in its users, obscures the functioning of their computer from them with overzealous abstractions that bear no fruit, and serves as a key part of Microsoft's blatant goal to establish a comfortable and intertwined monopoly over the most important parts of developer tooling. It is not a kindness from Microsoft, it is them creating the most milquetoast editor ever and then utilising their humongous amounts of money to become the primary point where new developers are onboarded in an attempt to own their souls.

Fuck Microsoft.

# Moving forward

Anyway, let's get to building a better version of VS Code. In this case, better means more keyboard focused and less cluttered. This section is intended to be taken as a step by step process. I'd recommend making these changes one at a time so you can adjust. Picture yourself as a boiling frog. The goal of making these configuration changes is to slowly adapt yourself to doing everything with your keyboard. It doesn't actually have to correlate with a set of bindings from another editor or anything. Learning new bindings is not that hard. What's hard is adapting your workflow.

In my experience from the many times I've had to relearn Vim, switching away from a mouse centric tab based workflow to something more focused feels suffocating at first. Before you adapt, it feels like you're trapped in the file. This is drastically worsened if you don't know how to switch files quickly.

## Begone tabs

The first step in our process is going to be getting rid of tabs. Tabs make sense for browsers where you want to build up a collection of sorts that you can work through in any order. In programming however, it just encourages multiple bad habits.

1. In my experience tabs don't get closed until there are so many tabs that it becomes unbearable. This clutters your workspace and slows down switching between files.
2. Tabs allow you to get away with a subpar knowledge of your own codebase. Why learn the structure of your own code if you can just keep half your project open at once?
3. The only real use for tabs is when you do need to refer to some other code as you write new code. Just use a split. It's faster.

Here's how you disable tabs:

```json
"workbench.editor.showTabs": "single",
"workbench.editor.enablePreview": false,
```

I'd also recommend some more ergonomic key binds for managing splits and groups.
This is what I personally use:

```json
  {
    "key": "ctrl+space q",
    "command": "workbench.action.closeActiveEditor"
  },
  {
    "key": "ctrl+space shift+j",
    "command": "workbench.action.moveActiveEditorGroupDown"
  },
  {
    "key": "ctrl+space shift+k",
    "command": "workbench.action.moveActiveEditorGroupUp"
  },
  {
    "key": "ctrl+space shift+h",
    "command": "workbench.action.moveActiveEditorGroupLeft"
  },
  {
    "key": "ctrl+space shift+l",
    "command": "workbench.action.moveActiveEditorGroupRight"
  },
  {
    "key": "ctrl+space k",
    "command": "workbench.action.focusAboveGroup"
  },
  {
    "key": "ctrl+space j",
    "command": "workbench.action.focusBelowGroup"
  },
  {
    "key": "ctrl+space h",
    "command": "workbench.action.focusLeftGroup"
  },
  {
    "key": "ctrl+space l",
    "command": "workbench.action.focusRightGroup"
  },
  {
    "key": "ctrl+space ctrl+k",
    "command": "workbench.action.moveEditorToAboveGroup"
  },
  {
    "key": "ctrl+space ctrl+j",
    "command": "workbench.action.moveEditorToBelowGroup"
  },
  {
    "key": "ctrl+space ctrl+h",
    "command": "workbench.action.moveEditorToLeftGroup"
  },
  {
    "key": "ctrl+space ctrl+l",
    "command": "workbench.action.moveEditorToRightGroup"
  },
]
```

It's quite a hell of a lot, but the idea is to allow me to move around splits and workspaces in a way that is inspired by Vim motions. You'll also notice the `ctrl+space` prefix to each binding, which I use somewhat consistently across any binding which has to do with the editor itself instead of the text I'm editing.

## Begone sidebar

Now that we've gotten rid of tabs, you might notice yourself spending a lot of time moving your mouse over to the file switcher to move between files. Let's get rid of the temptation, and while we're at it, all that sidebar clutter. This really forces you to make use of both `ctrl+p` and `ctrl+tab` to navigate between files in a thought-out and efficient way. Switching between files with the mouse is absurdly slow, but unfortunately monkey brains are also slow. The file explorer is always visible, and your keyboard based file switching mechanisms aren't. We need to put them on equal footing, so that your brain can accurately assess which is faster (it'll be the keyboard).

For this step, you're going to need two extensions. The first is `File Utils`, which gives you commands to create, rename, and move files. Unfortunately, VS Code is pretty handicapped in matters of file management outside of the file tree. This extension is missing functionality related to the moving of directories as far as I can tell, but it isn't a crisis to break out the terminal every once in a while. The other is `Auto Hide`, which adds the ability to auto hide the side bar/terminal on project open and whenever an editor is focused. Our intent is to only have the sidebar open if we literally *must* use it (e.g extensions), so this is perfect This is also necessary to avoid needing to manually hide the sidebar every single time you open a folder.

These are both relatively rudimentary to configure. Of course, I'd recommend some similarly easy to access keybindings for `File Utils`, but it'll always be in the command palette. Here's some additional JSON config. Line 1 is the main important thing. It stops the file explorer from auto opening and focusing a file whenever you open one.

```json
  "explorer.autoReveal": false, //The main important line
  "workbench.activityBar.location": "top", //Reduces bar width when visible
  "workbench.sideBar.location": "right", //Bar moving is less likely to shift code
```

You'll also probably want a custom keybinding for opening and closing the bar, for those rare occasions when it's needed.

## Begone uhh... not Vim

This is the part of the post that I can argue for the least objectively, but  I think it can be a worthwhile step. If I'm honest, this whole process I've described has actually been all about that Vim energy. Whether or not you decide to go for Vim bindings is up to you (and requires little configuration advice from me). However, I would recommend these binds:

```json
{
    "key": "ctrl+k",
    "command": "workbench.action.quickOpenSelectPrevious",
    "when": "inQuickOpen"
  },
  {
    "key": "ctrl+j",
    "command": "workbench.action.quickOpenSelectNext",
    "when": "inQuickOpen"
  },
  {
    "key": "ctrl+k",
    "command": "selectPrevSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus"
  },
  {
    "key": "ctrl+j",
    "command": "selectNextSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus"
  },
```

These will allow `ctrl+j/k` to work inside of both code suggestion boxes and the quick open/command palette menus. This means you have to do far less mental switching between arrow keys and Vim motions.

# Conclusion

Putting my unhinged rant aside here, I hope you can see what I'm attempting to do. I think this is a genuinely intuitive way for people to make the transition to Vim. What I like about this approach is that it teaches you not only Vim motions but also something a lot closer to the Vim workflow. I have personally experienced that when switching to Vim, I feel 'trapped' within files. The inability to quickly mouse out and click on another is difficult somehow, and it makes programming not very enjoyable.

I think that this approach to transitioning to Vim really does bridge a gap with switching to Vim that isn't often acknowledged, which is that you work very differently. It really can feel suffocating until you're skilled enough that it becomes freeing. Introducing these changes one by one and giving them time to settle could make the process of switching to Vim far less uncomfortable.

Anyway, this isn't a learning path for me. I'm just genuinely stuck on VS Code because I'm too stubborn to learn how to work in terminal on Windows (because I know it'll suck). Send help and/or an NVMe boot drive for me to use for dual booting.
