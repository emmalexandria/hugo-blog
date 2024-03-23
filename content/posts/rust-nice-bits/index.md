---
title: "Rust is nice at programming"
date: 2024-03-23
description: "Why Rust is great even if you aren't a giga memory nerd"
tags: [Rust, Programming]
draft: true
---

Rust is a language which is evangelised primarily for it's safety. I'm going to be real here. I like writing safe programs, but I don't really care that much. I was never a C or C++ developer. I did follow [javid9x's fantastic tutorials](https://www.youtube.com/@javidx9) when I was younger, but my only real attempt to build something complex in either language was a sudoku solver which never worked because my code for drawing the board kept segfaulting. However, I still really like and appreciate Rust. If you aren't a developer with a particular care for memory safety, I want to try and convince you that Rust is still worth it and a great language to learn. There may sometimes be gaps between the part of the article where code is shown and where it's explained. This article is also very code heavy, so be ready. 

{{<toc>}}

# Clarity

The most significant reason I think Rust is great is the sheer productivity boost it bestows on me. Rust is the only programming language in which I can consistently work for 4-5 hours straight without running my project once, and then run it to find everything works perfectly. This is possible in other languages of course, but in Rust it happens so regularly that it's not even exciting anymore. I think this is because Rust doesn't really have many opportunities for subtle bugs. It does not expect you to keep a million things in your head about the standard library and the way Rust works. Instead, everything you need to know about how a given object will behave is easily available and explicitly stated. I saw a Javascript example which I think is perfect to illustrate exactly the kind of thing which never happens in Rust: 

```js
console.log(new RegExp({}).test('mom'));
console.log(new RegExp({}).test('dad'));

//Output:
//true
//false
``` 

What's happening here is rather odd, and very interesting. I'd recommend taking a second to see if you can work it out. If not, here's what's going on: 

1. `{}` becomes an empty Javascript object.
2. This object is coerced into a string by getting its debug representation, `[object Object]`.
3. `[]` is regex for "match any characters between the square brackets".
4. 'mom' matches the o in `object Object`, while 'dad' does not.

This is an extreme example. Most languages aren't as fucked up as Javascript. However, this kind of nasty implicit behaviour occurs in many languages, and (in my experience) leads to a lot of bugs. Rust is not only strongly and statically typed, but explicit in its type conversions, their implementations, and their use. However, it still allows huge flexibility in type conversion (more than many languages). Due to Rust's flexibility, it isn't impossible to get behaviour like the above. The difference is that it requires you to be explicit that that is the behaviour that you want. In Rust you could write the following code:
```rust
#[derive(Debug)] // Derive debug so we can get a debug print of the object
pub struct SillyGuy;

impl Into<String> for SillyGuy {
    fn into(self) -> String {
        return format!("{:?}", self) // Into<String> returns the debug print
    }
}
```

It would let you do the same exact thing: get the debug representation of an object and pass it into Regex. However, that is not an implicit conversion in Rust. It has to be explicitly written out in code, available for reference. The closest equivalent to implicit type casting that's really available is using the `as` keyword, which will silently truncate data if the value doesn't fit in its new type.

This flexibility also gives you the power to write some really fucked up code if you want. Here's a classic of mine:  

```rust
pub trait UnsafeSub<T>
where
    Self: TryInto<T>,
    T: std::ops::Sub<T, Output = T>,
    <Self as TryInto<T>>::Error: std::fmt::Debug,
{
    fn unsafe_sub(self, lhs: Self) -> T {
        <Self as TryInto<T>>::try_into(self).unwrap() - lhs.try_into().unwrap()
    }
}

impl UnsafeSub<isize> for usize {}
```
This code allows you to subtract two `usize` values and receive a signed `isize` value. However, if either of the `usize` values use all 64 bits, the code will crash and burn. Fun!

Rust explicitly tells you what data can do, and lets you define your own transformations. Rust *doesn't do* implicit data transformation, and if you use the tools Rust provides correctly, all your data conversions will follow a predictable pattern. I find this to be a huge boost to productivity, and by the end of a session programming in Rust I nearly always end up with code which is trivial to follow, if not exactly beautiful. Programming is universally about three basic steps, repeated as many times as necessary:

1. Input data
2. Transform data
3. Output data

Rust makes the entire second step explicit and consistent, which is hugely helpful for writing good code without struggle. Unlike in Javascript, a function cannot just coerce your object to a debug string without requiring that it implement `Debug`. Unlike C, casting a 64 bit integer into a 32 bit integer requires use of `as` which explicitly states you are fine with data loss. In C, it'll just treat it like any other type conversion. 

# Traits

Traits are to me the single most interesting part of Rust as a language. They underpin so many great features of the language, and allow code written completely seperately to interoperate beautifully. The best way to think of a trait is as an interface in an OO language. They define methods and functions on objects to allow for shared behaviour. The difference in Rust is that nearly the entire language is implemented through a variety of traits. Here's an example of implementing a basic trait:

```rust
//Define a new object with fields
struct Person { 
  name: String,
  age: i32,
  occupation: String
}

//Create a constructor
impl Person {
    pub fn new(name: &str, age: i32, occupation: &str) -> Person {
        Person {
            name: name.to_string(),
            age,
            occupation: occupation.to_string()
        }
    }
}

//Implement the trait Display, which allows an arbitrary type to be printed to stdout
impl std::fmt::Display for Person {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> Result<(), std::fmt::Error> {
        write!(f, "{} is {} and works as a {}", self.name, self.age, self.occupation)
    }
}

fn main() {
    let brian = Person::new("Brian", 35, "JS Developer");
    println!("{brian}");
}

//Output: Brian is 35 and works as a JS Developer

```

Isn't that just lovely? We were able to define custom output formatting for our type which will be automatically picked up by any of Rust's formatting macros (`println!`, `print!`, `eprintln!`, etc). The `Display` trait is built into Rust, and is used across codebases and crates. This is what makes traits so magical. There are many other extremely useful traits, such as the previously shown `TryInto`, and ones like `Error`, `From`, `Default`, `AsRef<T>`, etc. Furthermore, you can define traits on any type, including primitives. Rust libraries can actually extend the functionality of the language in a completely natural way! For example, the extremely popular crate [colored](https://docs.rs/colored/latest/colored/) (which provides code to print colored text using ANSI escape codes) works via a trait. It implements the `Colorize` trait on Rust's primitive string type. If you import that trait from the library, you can then use its defined functions on any Rust string like you would use a function from the standard library.

```rust
println!("{}", "Some green text".green())
```

Traits can also be specified in generic functions to constrain what types can be passed in. For example, a simple function to convert a path to a string might look like this:
```rust
pub fn path_to_string<P: AsRef<Path>>(path: P) -> String {
    match path.as_ref().to_str() {
        Some(s) => s.to_string(),
        None => path.as_ref().to_string_lossy().to_string(),
    }
}
```

`P`, the generic type, is constrained to types that implement `AsRef<Path>`. This is because that is the only interface necessary to convert either of Rust's path types (`PathBuf` and `Path`) into a string. This code will also work on any other type which implements `AsRef<Path>` from any library.

This kind of trait behaviour lets you implement code which feels like it's part of the standard library in quality and behaviour. The best part is that the new code you wrote won't just feel like it's part of the standard library, it will interoperate with it flawlessly. 

## Healthy limits
The other benefit of traits is how constrained they are. You could *technically* achieve OOP like inheritance behaviour with traits, but it becomes so complicated that the borrow checker will repeatedly smash your head into a wall until you give up. Traits bring in the parts of OOP that work well (interfaces basically), while severely limiting the amount of real OOP you can do. It leaves Rust structs somewhere between C and C++. They're far more than just buckets of variables, but they also aren't quite class-like. 

You can technically define traits and supertraits, like so:
```rust
pub trait ProgrammingLanguage{}

pub trait MemorySafe: ProgrammingLanguage {}

pub trait ReleasedInThe2010s{}

pub trait Rust: MemorySafe + ReleasedInThe2010s
```
This does give one a bit of inheritance like behaviour, but it's a struggle to work with. The language encourages you to find a better way. In fact, supertraits and subtraits are barely intended for inheritance like behaviour. It's more to solve the problem of one trait requiring the implementation of another trait to work. For example, the `std::error::Error` trait requires `std::fmt::Display`, because errors must be printable. However, there isn't any kind of inheritance relationship there. It's more like a list of requirements that you can coerce into behaving like inheritance if you want to feel pain.   

# Enums
Rust has pretty ridiculously powerful enums. If you're coming from another language, Rust enums are completely different. They still represent static variants of a type, but they can also do so much more. Each variant can hold differing values, and they can be used together with the `match` statement for powerful and easy manipulation of control flow. As an example: 

```rust
enum IPAddress {
    IPv4 { addr: [u8; 4] },
    IPv6 { addr: [u16; 8] },
}

impl std::fmt::Display for IPAddress {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            IPAddress::IPv4 { addr } => {
                write!(f, "{}.{}.{}.{}", addr[0], addr[1], addr[2], addr[3])
            }
            IPAddress::IPv6 { addr } => write!(f, "{:x}.{:x}.{:x}.{:x}.{:x}.{:x}.{:x}.{:x}", 
            addr[0], addr[1], addr[2], addr[3], addr[4], addr[5], addr[6], addr[7]),
        }
    }
}

fn main() {
    let ipv4 = IPAddress::IPv4{addr: [192, 168, 68, 111]};
    println!("{ipv4}");
    let ipv6 = IPAddress::IPv6{
      addr: [0x2001, 0x0db8, 0x0000, 0x1234, 0x0000, 0x0567, 0x0008, 0x0001]
    };
    println!("{ipv6}");
}

//Output:
//192.168.68.111
//2001.db8.0.1234.0.567.8.1
```

The important thing to notice here is the ability to define a type which does not necessarily always have the same fields. We can easily represent an IP address as either IPv6 or IPv4, and any function can take a value of `IPAddress`. Enum variants can have practically anything stored in them, including custom types like structs. You could even have an enum variant which contains a struct which contains an enum variant which contains a struct. 

This model of enums gives you a very powerful ability to pass around information. When used with match, it can be used to ensure that your program must have a valid state at all times. The compiler ensures your match statement handles all possible cases, and warns you if one of your cases is not reachable. 

As an example of a situation where we want to ensure our state is valid, consider parsing arguments. Your subcommands could be represented as an enum, with each variant taking the arguments of that subcommand as fields. You can then match the passed subcommand and create an enum variant. If you can't get all of the data required by that variant out of your arguments, you have an invalid state and the program has to exit. If used correctly, enums can make it really difficult to reach an invalid state within your application.

```rust
enum InstallTarget {
  USER,
  SYSTEM
}

enum Subcommands {
  GET {pkg_url: String, output_location: String, silent: bool}
  REMOVE {package: String, silent:bool}
  INSTALL {app_url: String, install_target: InstallTarget, silent:bool}  
}
```

# Error handling
The final thing I feel I must mention is error handling. In Rust, errors are values. There are no try catch statements or anything of the sort. An error is a type just like any other. This is a bit similar to Go, but the difference is that this doesn't mean constantly writing:
```go
result, err := some_func()
if err != nil {
  return err
}
```

Rust is a lot more clever. Instead, two error handling types are used: `Result<T,E>` and `Option<T>`. They are used by convention however, and are not necessary to handle errors. These are both simple enum types. 
```rust
pub enum Option<T> {
    None,
    Some(T),
}

pub enum Result<T,E> {
  Ok(T),
  Err(E),
}
```

`Option` is used to represent a value that may or may not exist, and `Result` is used to represent either a value that's guaranteed to exist or an error. You can `.unwrap` these values to return `Some(T)` or `Ok(T)` while panicking if the value is `None` or `Err(E)`. You can also `.expect()`, `.is_some_and()`, etc. This makes it trivial to handle errors in more complex ways than just checking if there is an error of some kind (like in Go). 

The most powerful part of Rust's error handling however is the `Try` trait. Both `Result` and `Option` implement `Try`, which allows the use of the suffix `?`. Explaining what `?` does concisely requires a code example:

```rust
fn delete_file(file: &Path) -> std::io::Result<()> {
  fs::remove_file(file)?;
  Ok(())
}
```
In this code, our function returns a `std::io::Result<()>`, which is equivalent to `Result<(), std::io::Error>`. The question mark operator does something incredibly powerful, which is to return `Err(e)` if and only if `fs::remove_file` returns an error. This is possible because `fs::remove_file` also returns `Result<(), std::io::Error>`. In this way, our error handling can be inlined, and passed up the chain of function calls until it reaches the function which should actually handle the error and decide how to proceed. 

## The error trait

As values, Rust errors can implement traits. Most implement the `Error` trait. This allows the creation of a wrapper error which allows you to keep track of additional error context. Going back to the above example, imagine we wanted one function to delete many files instead of just one.  
```rust
fn delete_files(paths: Vec<&std::path::Path>) -> std::io::Result<()> {
  for path in paths {
    std::fs::remove_file(path)?;
  }

  Ok(())
}
```

The problem with this approach is that `std::io::Error` doesn't contain any information about the file which caused the error. If a file deletion fails, we can't tell the user which file caused the error. This can be solved very simply by defining our own error type. 

```rust 
#[derive(Debug)] 
struct FileError {
  error: Box<dyn std::error::Error>,
  file_path: String
}
//error is a heap allocated 'trait object'.
//Represents a trait implementation on a specific object.

//Constructor for a new error
impl FileError {
  pub fn new<T: AsRef<std::path::Path>>
  (error: Box<dyn std::error::Error>, file_path: T) -> FileError {
    FileError {
        error,
        file_path: file_path.as_ref().to_string_lossy().to_string()
    }
  }
}

//Trait 
impl std::error::Error for FileError{
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        Some(&*self.error)
    }
} 

//Required by std::error::Error
impl std::fmt::Display for FileError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> Result<(), std::fmt::Error> {
        write!(f, "{} caused by {}", self.error, self.file_path)
    }
}
```

Now we have a custom error type with all of the required traits to be used exactly like any other error. We can then use it in our newly defined function with `.map_err`, a function defined on Result which takes a closure which is run if an error is encountered.

```rust
fn delete_files(paths: Vec<&std::path::Path>) -> Result<(), FileError> {
  for path in paths {
    std::fs::remove_file(path).map_err(|e| FileError::new(Box::new(e), path))?;
  }

  Ok(())
}
```

With a very simple change, we can now track additional context alongside our error value, and succintly handle any errors that arise from the `remove_file` call.

# Conclusion
I'm not sure how convincing I have been in this blog post, but I hope I've said enough to get you to give Rust a try. Typically, Rust evangelists tend to hide the slightly more complicated parts of the language (a few of which have been displayed here) to avoid scaring people off. I disagree with this approach. Rust's biggest strengths lie in its scariest looking parts, and programmers aren't babies. `Box<dyn std::error::Error>` or `fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> Result<(), std::fmt::Error>` might look scary, especially if you aren't familiar with any low level programming. I think you should give Rust a try anyway. Rust frontloads the hard parts, and beats your ass repeatedly, but from there the difficulty remains fairly constant regardless of the complexity of what you're doing. Languages like Javascript and Python put off introducing complexity for as long as possible at great expense, and become extremely difficult to work with.


To steal a great diagram from [No Boilerplate](https://www.youtube.com/watch?v=2hXNd6x9sZs):

{{<simg src="rustvjs.png" caption="Difficulty curves">}}

