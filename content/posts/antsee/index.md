---
title: "antsee: a terminal color and style crate for configuration"
date: 2024-11-30
description: "Intuitive and user friendly configuration of output styles"
summary: "Intuitive and user friendly configuration of output styles"
tags: [rust, programming, terminal, crate]
draft: false
---





## Introduction

### The pitch

`antsee` is a library which allows you to effortlessly define human friendly configuration for terminal styles and colours. An example shows it best: 
```rust
struct Config {
  output_text: Style,

  border_color: Color,
  background_rgb: Rgb,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            output_text: Style::default()
                .fg(Ansi::Red)
                .attributes(Attributes::new().bold()),

            border_color: Fixed::from(XtermColors::Pinky).into(),
            background_rgb: Rgb::from_str("#342398").unwrap(),
        }
    }
}
```
Serializing `Config` leads to the following TOML: 
```toml
border_color = "xterm(Pinky)"
background_rgb = "#342398"
 
[output_text]
  fg = "Red"
 
[output_text.attributes]
  bold = true
  dimmed = false
  italic = false
  underline = false
  blink = false
  reverse = false
  hidden = false
  strikethrough = false
```

As you can see, the configuration serializes with the same hex values, color names, etc  that you set up the config with. `antsee` has color libraries for 
CSS and `xterm` color names. In addition, it supports hex values, RGB values, ANSI16 color names, or ANSI256 u8 indices. No matter what you use, it will be deserialized to a simple `Color` type which can easily be converted to your output library of choice.

`antsee` does not handle ANSI escape codes in any form. This is not going to change. `antsee` is not an output library, and is designed to be used alongside a library like `nu-ansi-term`.

*Note that all `serde` related aspects of the library are behind a feature called "serde". This is to allow the definition of type conversion crates which convert between `antsee` and an output crate without relying on `serde`.*

### Motivation

I was building a CLI tool in Rust, and I noticed something peculiar. None of the terminal color/style crates (which I will call ANSI crates from here on out) had good support for `serde`. The popular crates, which I would consider to be: 
- `owo-colors`
- `colorize`
- `nu-ansi-term`
- `yansi`

didn't have any `serde` support with the exception of `nu-ansi-term`. However, `nu-ansi-term` only supported `serde` in the most basic way, being derived `Serialize` and `Deserialize` definitions. To me, this seems like a massive gap in the ecosystem. I decided to fill that gap with a crate called `antsee`. 

However, `antsee` quite quickly grew to become a rather complex crate. I fear that my documentation writing skills are not sufficient to explain how to use the library, or why it is written the way it is. This blog post is my attempt to slowly introduce all the concepts of `antsee` in a logical order. 

## Color 

Color types make up the majority of the `antsee` codebase. `antsee` aims to define a `Color` type which can be set by human friendly values like hexcodes, CSS color names, or ANSI16 color names.

### Foundations 

There are three fundamental color formats supported by terminals. Our goal is not just to implement each, but to implement intuitive human friendly ways to set them. 

#### ANSI
```
Black
BrightBlack
Red
Bright Red
Green
Bright Green
Yellow
Bright Yellow
Blue
Bright Blue
Magenta
Bright Magenta
Cyan
Bright Cyan
White
Bright White
```

This set of colours is practically universally supported. This is also the color set you usually change when you apply a theme to your terminal. It is worth nothing that `Black` is not necessarily the background color and `White` is not necessarily the foreground color. These colors are easily representable with a Rust enum: 

```rust
pub enum Ansi {
    #[default]
    /// Default color (foreground code `39`, background code `49`)
    Default,
    ///Color #0 (foreground code `30`, background code `40`)
    ///
    ///This is not necessarily the background color
    Black,
    /// Color #0 (foreground code `90`, background code `100`)
    DarkGray,
    /// Color #1 (foreground code `31`, background code `41`)
    Red,
    /* 
      Rest of the 4-bit colors
    */
}
```

Adding `serde` support for this color format is pretty simple. To start, we can derive a Debug implementation and implement Display:
```rust
#[derive(Debug)]
enum Ansi {
// ANSI enum content
}

impl std::fmt::Display for Ansi {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        //Hacky display implementation using the auto derived debug
        write!(f, "{:?}", self)
    }
}
```

This allows us to call `.to_string()` on enum variants and get their name. For example, calling `.to_string()` on `Ansi::BrightCyan` will return `BrightCyan`. Now we can implement `FromStr` on our enum.

```rust
impl FromStr for Ansi {
    //type Err = ...
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let variants = [
            Self::Black,
            //all the other variants 
        ];
        for v in variants {
            if s == v.to_string() {
                return Ok(v);
            }
        }

        Err(//Pretend there's an error type)
    }
}
```

With that, we can implement `serde::Serialize` and `serde::Deserialize` to work with the variant names. In other words, if we put `BrightRed` in our configuration file, that will map to `Ansi::BrightRed`.

#### Fixed

ANSI 8-bit colors, also called ANSI256, or "fixed" colors (as `antsee` calls them) are a set of fixed color values with `u8` indices. Unlike ANSI 4-bit, this color library usually isn't styled. There isn't exact consensus on the RGB values of the various colours, but most terminals follow the `xterm` mapping.

Defining a type for fixed colors is very simple:
```rust
struct Fixed(pub u8);
```

However, this is not user friendly in the slightest. An 8-bit integer is not an intuitive way to set colors at all. For this reason, we're going to introduce a *color library*. This will be elaborated on in [Libraries](#libraries). The basic idea is to map a set of names to the various `u8` indices. For example, "Seafoam" maps to index 121. 

This color library is generated by a macro. The macro defines an enum called `XtermColors` where each color is a variant. It then generates multiple functions in the `impl` block of the enum to map variants to RGB values, color names, and indices. 
```rust
impl Fixed {
  pub fn set_color(&mut self, color: XtermColors) {
    //Calling color.ansi256() to get the 8-bit color index of color
    self.0 = color.ansi256();
  }
}
```

Now we have a long list of color names for our fixed colors. Wouldn't it be great if you could use those color names in the configuration file? To achieve that, we need to implement `FromStr` again. To distinguish values of `XtermColors`, we'll say that they must be wrapped in `xterm()`.

We end up implementing `FromStr` for `Fixed` by checking if the string follows the format of `xterm([color_name])`. If so, we index into `XtermColors` with `color_name`. 

Now we can implement `serde::Deserialize` with support for `XtermColors`.

#### RGB  
Finally, we get to 24-bit (RGB) color. To represent a 24-bit color, we can simply define:
```rust
struct Rgb([u8;3]);
```

Since `XtermColors` already has RGB values, we can allow `Rgb` to be created from `xterm()` in the same way as `Fixed`. However, here we use `color.rgb()` instead of `color.ansi256()`.

It would also be nice if we could create `Rgb` values from hexcodes. Finally, we're going to define another color library here for funsies. This one is `CssColors`, and contains (you guessed it!) a map of CSS color names to RGB values. 

Bringing these three together, `FromStr for Rgb` goes through the following steps:

1. Does the string start with `#`? 
2. Does the string follow the `css()` format?
3. Does the string follow the `xterm()` format?

Each step along the way, it can throw an error. If none of those 3 conditions are true, the string is invalid and an error is returned. Once again, the same logic is used in the `serde::Deserialize` implementation.

### Libraries
As previously mentioned, color libraries rely on macros to generate an enum and functions to map variants to various values. `XtermColors` and `CssColors` share a common trait:
```rust
trait ColorLibrary
where
    Self: Sized,
{
    ///The function style wrapper which identifies a value as being from this color library
    const WRAPPER: &str;

    ///Wrap a string in the style wrapper
    fn wrap_name(s: &str) -> String;
    ///Extract a string from the style wrapper
    fn unwrap_name(s: &str) -> &str;

    ///Get a color by name
    fn get_name(s: &str) -> Option<Self>;

    ///Get the name of a color
    fn color_name(&self) -> &'static str;

    ///Get the RGB value of a colour
    fn rgb(&self) -> [u8; 3];
}
```

*`XtermColors` implements two additional functions. One gets the 8-bit color index of a variant, and one gets a variant by the 8-bit color index.*

I'm not going to show the macro definitions here. However, as an example, this is the first line parsed by the macro for `CssColors`. Each line corresponds to a color.
`AliceBlue` is the variant name, `"aliceblue"` is the color name, and then the RGB value is on the right. The `XTermColors` macro is very similar, but it has an additional index field.
```rust
AliceBlue, "aliceblue", (240, 248, 255);
```

### Color sources

#### Introduction 

Right now, our library has one major flaw. We have implemented all these user friendly ways of *deserializing* colors, but what about serialising colors? We can define a default configuration where colors are set by hex for example, but once we serialise that default configuration it will just output a `[u8;3]`; 
This is where we introduce the concept of a color `Source`. The basic concept is that each color has two potential sources for its serialised value:

1. Internal source - the data which defines the color. For example, `[u8;3]` for `Rgb`.
2. External source - the value which set the color. For example, `xterm(Seafoam)` for `Fixed`.

If we add a field to `Rgb` and `Fixed` to track the value which set the color, we can use that field in a custom `Serialize` implementation.

#### Implementation

In theory, we could just add something like an `Rc<str>`, but that wouldn't be very flexible. Rather, lets define an enum:

```rust
enum Source<S> {
  Active(S),
  Inactive(S)
}
```
This enum will store the external source and track whether it is active or not. Think of it like an `Option` where `None` also contains the value but indicates that it shouldn't be used. `S` can be of any type, but for now it will always be `Rc<str>`

Now, lets define a trait with functions to manipulate the `Source`:
```rust
trait ColorSource {
    type ExternalSource;

    ///Set an external source on the color
    fn set_external_source(&mut self, value: Self::ExternalSource);
    ///Use the external source for serialization
    fn source_external(&mut self);
    ///Use the internal source (data representation) for serialization
    fn source_internal(&mut self);
}
```

Then, on our color, we store `Source<Rc<str>>`, and implement `ColorSource`.

Whenever we set our color with an external value of some kind, be it a hex color or color library value, we set the source to `Source::Active(Rc::from(external_source))`. 

One major disadvantage of this feature is that we lose `Copy` on our color types. However, this library is for defining configuration formats. Runtime performance is not a huge deal here. 

### Finishing touches 

Now as the final touch, we can define:

```rust
#[derive(serde::Serialize, serde::Deserialize)]
#[serde(untagged)]
enum Color {
  Ansi(Ansi),
  Fixed(Fixed),
  Rgb(Rgb)
}
```

There are some parts missing from all of this, like conversion between color types. Also plenty of impl blocks not shown. However, this section has covered all the most unique aspects of `antsee`.

## Styles



