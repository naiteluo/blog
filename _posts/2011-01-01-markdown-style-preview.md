---
layout: post
title: All Markdown Style
published: true
categories: [others]
tags: markdown
preview: Basic markdown style in this blog.

---

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Strong and Emphasize

*emphasize*   **strong**
_emphasize_   __strong__

## Links and Email

Goto [mmnn](http://naiteluo.net/ "MMNN")

Click here: [Go to Google][google]. Then, anywhere
else in the doc, define the link:

  [google]: http://example.com/  "Title"
  
An email <example@example.com> link.

## Images

![Github](https://a248.e.akamai.net/assets.github.com/images/modules/about_page/octocat.png "Github")

![Github][github]

[github]: https://a248.e.akamai.net/assets.github.com/images/modules/about_page/octocat.png "Github"

## Lists

order list:

1.  Foo
2.  Bar

unorder list:

*   A list item.

    With multiple paragraphs.

*   Bar

nested list:

*   Abacus
    * answer
*   Bubbles
    1.  bunk
    2.  bupkis
        * BELITTLER
    3. burper
*   Cunning

## Blockquotes

> Email-style angle brackets
> are used for blockquotes.

> > And, they can be nested.

> #### Headers in blockquotes
> 
> * You can quote a list.
> * Etc.

## Inline Code

`<code>` spans are delimited
by backticks.

You can include literal backticks
like `` `this` ``.

## Block Code

This is a normal paragraph.

    This is a preformatted
    code block.
    
## Horizontal Rules

---

* * *

- - - - 

```
Fenced code blocks are like Stardard
Markdown’s regular code blocks, except that
they’re not indented and instead rely on a
start and end fence lines to delimit the code
block.
```