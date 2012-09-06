---
layout: post

title: JavaScript the Definitive Guide Reading Introduction to JavaScript
---

##Chapter 1, Introduction to JavaScript##

> HTML to specify the content of web pages, css to specify the presentation of web pages, and JavaScript to specify the behavior of web pages.

High-level, dynamic, untyped interpreted(解释). Well-suited to object-oriented and functional programming styles.

Minimal built-in API for working with text, arrays, dates, and regular expressions but does not include any input or output functionality. I, O are the responsibility of the "host environment", usually web browser.

###1.1 Core JavaScript###

blablabla…

JavaScript is object-oriented, but it is quite different than most. Here show how to create class to represent 2D geometric points.

	{% highlight javascript linenos %}
	// Define a construtor function to initialize a new Point object
	function Point(x, y) {		// by convention, constructors start with capitals
		this.x = x;				// this keyword is the new object being init
		this.y = y;				
	}							// no return is necessary

	// Use a constructor function with the keyword "new" to create instances
	var p = new Point(1, 1);

	// Define methods for Point objects by assigning them to the prototype
	// object associated with constructor function.
	Point.prototype.r = function () {
		return Math.sqrt(this.x * this.x + this.y + this.y);
	};

	// Now instances of Point object inherits the method r()
	console.log(p.r());
	{% endhighlight %}

###1.2 Client-Side JavaScript###

About web pages:

* 	JavaScript in Web Browser
* 	Scripting Documents
* 	Scripting CSS
* 	Handling Events 

	(addEventListener or attachEvent ? Compatibility with IE?)

* 	The jQuery Library


Focus on web applications:

* 	Scripted HTTP
* 	Client-Side Storage
* 	Scripted Media and Graphics
* 	HTML5 APIs, OS typed
