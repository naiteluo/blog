---
layout: post
title: Regular Expression in JavaScript
published: false
categories: [others]
tags: JavaScript
preview: Notes about regular expression in JavaScript.

---

## Define Regular Expressions

In JavaScript, regular expressions are represented by RegExp objects.

We can create it in two ways: `RegExp()`constructor, or simply using literal syntax. For example:

	var p = new RegExp('javascript');
	
	var p = /javascript/;

### Literal characters

All alphabetic characters and digits match themselves literally in regular expressions. JavaScript regular-expression syntax also supports certain noalphabetic characters through escape sequences that begin with backslash(\\). The following table lists these characters.

Character                | Matches
------------------------ | ----------------------------
alphabetic charecters    | itself
\0                       | the Null character (\u0000)
\t                       | tab (\u0009)
\n                       | Newline (\u0000A)
\v                       | Vertical tabn (\u0000B)
\f                       | Form feed (\u000C)
\r                       | Carriage return (\u000D)
\x nn                    | The Latin character specified by the hexadecimal number nn; for example, \x0A is the same as \n
\u xxxx                  | The Unicode character specified by the hexadecimal number xxxx; for example, \u0009 is the same as \t
\cX                      | The control character ^ X; for example the \cJ is equivalent to the newline character \n

Some punctuation characters have special meaning in regular expression.

		^ $ . * + ? = ! : | \ / ( )[ ] { }

if we want them to be treated literally in regualr expressions, we can precede them with a backslash(\\).

### Character class

Individual literal characters can be combined into character classes by placing them within square brackets.

	/[abc]/		// match any one of the characters a, b or c

A negated character class is specified by placing a caret (^) as the first character inside the left bracket.
	
	/[^abc]/	// match any one characters other than a, b or c

Character classes can use a hyphen to indicate a range of characters.

	/[a-z]/		// match any one lowercase character from the Latin alphabet

We can also combine ranges.

	/[a-zA-Z0-9]/	// match any letter or digit from the Latin alphabet

Because certain character classes are commonly used, the JavaScript regular-expression syntax includes special characters and escape sequences to represent these common classes. 

Character                | Matches
------------------------ | ----------------------------
[...]                    | Any one character between the brackets.
[^...]                   | Any one character not between the brackets.
.                        | Any character except newline or another Unicode 
\w                       | Any ASCII word character. Equivalent to [a-zA-Z0-9_].
\W	                     | Any character that is not an ASCII word character. Equivalent to [^a-zA-Z0-9_].
\s                       | Any Unicode whitespace character.
\S                       | Any character that is not Unicode whitespace. Note that \w and \S are not the same thing. \d Any ASCII digit. Equivalent to [0-9].
\D                       | Any character other than an ASCII digit. Equivalent to [^0-9].
[\b]                     | A literal backspace (special case).

We can use them within square brackets:

	/[\s\d]/

### Repetition

Regular expression repetition characters

Character        | Matches
---------------- | -------------------------------------------
{n,m}            | Match the previous item at least n times but no more than m times.
{n,}             | Match the previous item n or more times.
{n}              | Match exactly n occurrences of the previous item.
?                | Match zero or one occurrences of the previous item. That is, the previous item is optional. Equivalent to {0,1}.
+                | Match one or more occurrences of the previous item. Equivalent to {1,}.
\*               | Match zero or more occurrences of the previous item. Equivalent to {0,}.

Some examples:

	/\d{2,4}/ // Match between two and four digits
	/\w{3}\d?/ // Match exactly three word characters and an optional digit 
	/\s+java\s+/ // Match "java" with one or more spaces before and after 
	/[^(]*/ // Match zero or more characters that are not open parenthesis

Be careful when using the * and ? repetition characters. Since these characters may match zero instances of whatever precedes them, they are allowed to match nothing. For example:

	/a*/ // matches string 'bbbb'

#### Nongreedy repetition

The repetition characters listed in Table 10-3 match as many times as possible while still allowing any following parts of the regular expression to match. It is also possible to specify that repetition should be done in a nongreedy way. Simply follow the repetition character or characters with a question mark(?), it will match as few characters as necessary.

	'baaaaa'.match(/ba+/);		// ['baaaaa']
	'baaaaa'.match(/ba+?/);		// ['ba']

### Alternation, Grouping, and References

The `|` character separates alternatives. For example, `/ab|cd|ef/` matches the string “ab” or the string “cd” or the string “ef”. And `/\d{3}|[a-z]{4}/` matches either three digits or four lowercase letters.

Note that alternatives are considered left to right until a match is found. 
	
	'ab'.match(/a|ab/);		// ['a']

Parentheses have several purposes in regular expressions. 

*	to group separate items into a single subexpression so that the items can be treated as a single unit by |, *, +, ?, and so on. 
	
		/java(script)?/ 	// matches “java” followed by the optional “script”. 

		/(ab|cd)+|ef/		// matches either the string “ef” or one or more repetitions of either of the strings “ab” or “cd”.

*	to define subpatterns within the complete pattern.

	When a regular expression is successfully matched against a target string, it is possible to extract the portions of the target string that matched any particular parenthesized subpattern. 

	A related use of parenthesized subexpressions is to allow you to refer back to a subex- pression later in the same regular expression. 

	A reference to a previous subexpression of a regular expression does not refer to the pattern for that subexpression but rather to the text that matched the pattern. 

	For example, the following regular expression matches zero or more characters within single or double quotes. However, it does not require the opening and closing quotes to match

		/['"][^'"]*['"]/

	To require the quotes to match, use a reference:

		/(['"])[^'"]*\1/

	It is not legal to use a reference within a character class, so you cannot write:
		
		/(['"])[^\1]*\1/

	It is also possible to group items in a regular expression without creating a numbered reference to those items. Just  begin the group with (?: and end it with ). 

		/([Jj]ava(?:[Ss]cript)?)\sis\s(fun\w*)/

	Here summarizes the regular-expression alternation, grouping, and referencing operators.

	Character      | Meaning
	-------------- | ----------------
	\|             | Alternation. Match either the subexpression to the left or the subexpression to the right.	
	(...)          | Grouping. Group items into a single unit that can be usewith *, +, ?, |, and so on. Alsod  remember the character that match this group for use with later references.
	(?:...)        | Grouping only. Group items into a single unit, but do not remember the characters that match this group.
	\n             | Match the same characters that were matched when group number n was first matched. Groups are subexpressions within (possibly nested) parentheses. Group numbers are assigned by counting left parentheses from left to right. Groups formed with (?: are not numbered.


*see more in 10.1.4 of \<JavaScript the Definitive Guide\>*

### Specifying Match Position

Other regular ex- pression elements match the positions between characters, instead of actual characters.

Here summarizes regular-expression anchors.

Character | Meaning
--------- | -----------
^         | Match the beginning of the string and, in multiline searches, the beginning of a line.
$         | Match the end of the string and, in multiline searches, the end of a line.
\b        | Match a word boundary. That is, match the position between a \w character and a \W character or between a \w character and the beginning or end of a string. (Note, however, that [\b] matches backspace.)
\B        | Match a position that is not a word boundary.
(?=p)     | A positive lookahead assertion. Require that the following characters match the pattern p, but do not include those characters in the match.
(?!p)     | ￼￼A negative lookahead assertion. Require that the following characters do not match the pattern p.

For example: 
	
	/^JavaScript$/	// match the word “JavaScript” on a line by itself
	/\bJava\b/ 	// search for “Java” as a word by itself

The following pattern matches the word “JavaScript” in “JavaScript: The Definitive Guide”, but it does not match “Java” in “Java in a Nutshell”, because it is not followed by a colon.
	
	/[Jj]ava([Ss]cript)?(?=\:)/

`/Java(?! Script)([A-Z]\w*)/` matches “Java” followed by a capital letter and any number of additional ASCII word characters, as long as “Java” is not followed by “Script”. It matches “JavaBeans” but not “Javanese”, and it matches “JavaScrip” but not “Java- Script” or “JavaScripter”.

### Flag

JavaScript supports three flags

Character | Meaning
--------- | ---------------
i         | Perform case-insensitive matching.
g         | Perform a global match—that is, find all matches rather than stopping after the first match.
m         | Multiline mode. ^ matches beginning of line or beginning of string, and $ matches end of line or end of string.

## String Methods for Pattern Matching

Strings support four methods that use regular expressions. 

*	`search()`. This method takes a regular-expression argument and returns either the character po- sition of the start of the first matching substring or −1 if there is no match.

	For examples:

		"JavaScript".search(/script/i);		// return 4

	If the argument to `search()` is not a regular expression, it is first converted to one by passing it to the RegExp constructor. `search()` does not support global searches; it ignores the g flag of its regular expression argument.

	If a $ followed by a digit appears in the replacement string, replace() replaces those two characters with the text that matches the specified subexpression. This is a very useful feature. 

*	`replace()`. t takes a regular ex- pression as its first argument and a replacement string as its second argument. It searches the string on which it is called for matches with the specified pattern. 

	If the regular expression has the g flag set, the `replace()` method replaces all matches in the string with the replacement string; otherwise, it replaces only the first match it finds.




