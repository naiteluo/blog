---
layout: post

title: high performance JavaScript notes 1
---

## Chapter 1 Loading and Execution 加载和执行 ##

JavaScript的阻塞特性使js性能问题变的复杂。大多数浏览器使用单一进程来处理ui和执行脚本。代码的执行会阻塞浏览器的其他进程，例如用户界面绘制。

将script标签放到页面的底部，</body>之前。能确保脚本执行前页面已经加载完毕。

> 浏览器在解析到\<body\>前不会渲染页面

> 把内嵌脚本放在引用外链样式表的\<link\>标签后会导致页面阻塞去等待样式表的下载；是为了确保脚本执行时能获得最精准的样式信息；

合并脚本。页面中script标签越少，加载越快，响应更迅速。

使用无阻塞方式下载代码：

* 	script标签的defer属性（不推荐）
* 	动态创建script元素来下载、执行代码；脚本文件在该元素被添加到页面时开始下载，且下载和执行过程不会阻塞页面其他进程。
    
	下面是一个封装好的加载方法：
		 
		{% highlight javascript linenos %}
		(function (window) {
		    if (window.loadScript) 
		        throw new Error('loadScript fails to be modefied.');
		        
		    window.loadScript = function (url, callback) {
		        var script = document.createElement('script');
		        script.type = 'text/javascript';
		
		        if (script.readyState) {    // IE
		            script.onreadystatechange = function () {
		                if (script.readyState == 'loaded' || script.readyState == 'complete') {
		                    script.onreadystatechange = null;
		                    callback();
		                }
		            };
		        } else {    // other browser
		            script.onload = function () {
		                callback();
		            };
		        }
		
		        script.src = url;
		        document.getElementsByTagName("head")[0].appendChild(script);
		    };
		
		} (window));
		{% endhighlight %}

* 	用XHR对象下载代码，注入页面中
* 	推荐的无阻塞模式：先添加动态加载所需的代码，再加载初始化页面所需要的剩下的代码。

  	如:
 
	{% highlight html %}
	<script type="text/javascript" src="loader.js"></script>
	<script type="text/javascript">
	    loadScript("the-rest.js", function () {
	        app.init();
	    });
	</script>
	{% endhighlight %}
	
 	一旦页面初始化的脚本加载完，就可以用loadScript函数去加载页面其他功能所需的脚本了。YUI3也使用类似的方法，引入一个种子文件，来加载丰富的功能组件：

 	
	{% highlight html %}
	<script type="text/javascript" src="http://yui.yahooapis.com/combo?3.0.0/build/yui/yui-min.js"></script>
	<script type="text/javascript">
		YUI().use('dom', function (Y) {
		    Y.DOM.addClass(document.body, 'loaded');
		});
	</script>
	{% endhighlight %}

 
## Chapter 2 Data Access 数据访问 ##

### 四种基本的数据存储位置 ###

* 	直接量* 	
	> 直接量只代表自身，不存储在特定的位置。js中直接量有：字符串，数字，布尔值，对象，数组，函数，正则表达式，以及特殊的null和undefinde值。
	
* 	变量* 	
	> 开发者用关键字var定义的数存储单元。
	
* 	数组元素* 	
	> 存储在js数组对象内部，以数字作为索引。	
* 	对象成员* 	
	> 存储在js对象内部，以字符串作为索引。
	
总的来说，直接量和局部变量的访问速度快于数组项和对象成员的访问速度。

### 作用域链与标志符解析 ###

* 	局部变量位于作用域链的其实位置，访问速度比跨作用域的变量要快。变量在作用域链中的位置越深，访问时间越长。全局变量总出于作用域链的末端，所以访问速度最慢 	
	> 在函数执行过程中，每遇到一个变量，都会经历一次标志符解析过程，决定从哪里获取或存储数据。搜索的过程类似dfs，从作用域链头部开始。
	
	> 标志符的解析是有代价的，所处位置越深越往作用域链后，读写速度越慢；因此，通常函数中读写局部变量总是最快的，读写全局变量较慢。
	
* 	避免使用with语句，因为它会改变运行期上下文的作用域链，使的局部变量访问速度变慢。使用try-catch语句中的catch子句也有同样的影响。
	
	> 经过优化的js引擎可能会通过分析代码来确定那些变量可以在特定时候被访问，试图避开传统作用域链的查找，取代以标志符索引的方式进行快速查找。但当设计eval等动态作用域时，优化方法失效，要转回传统的作用域链查找方式。
	
* 	嵌套的对象成员会明显地影响性能，尽量少用。

  	用hasOwnProperty()方法判断对象是否包含特定的实例成员，要确定对象是否包含特定的属性，可以使用in操作符。
  
	{% highlight javascript linenos %}
	var book = {
	    title: "High Performance JavaScript",
	    publisher: "Yahoo! Press"
	};
	
	alert(book.hasOwnProperty("title"));    // true
	alert(book.hasOwnProperty("toString")); // false
	
	alert("title" in book);                 // true
	alert("toString" in book);              // true
	{% endhighlight %}
  		
* 	对象成员嵌套得越深，访问速度就会越慢；可以通过缓存对象成员值来优化，讲需要多次读取的同一个对象属性值保存到局部变量中。**这种技术不适用与对象的方法；许多对象方法使用this来判断执行上下文，缓存这些方法的话会导致this绑定到错误的对象上**

* 	通常来说，可以通过把常用的对象成员，数组元素，跨域变量保存到局部变量中改善JavaScript的性能，因为局部变量的访问速度更快。