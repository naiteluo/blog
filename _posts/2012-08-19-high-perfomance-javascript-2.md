---
layout: post

title: high performance JavaScript notes 2
---

## Chapter 3 DOM Scripting DOM 编程

> 用脚本进行DOM操作的代价很昂贵，它是富Web应用中最常见的性能瓶颈。

这章主要涉及一下三类问题：

*	访问和修改DOM元素
*	修改DOM元素的样式会导致**重绘(repaint)**和**重排(reflow)**
*	通过DOM事件处理与用户的交互

文档对象模型是一个语言无关的，用于操作XML和HTML文档的应用程序借口API。虽然它是语言无关的，但是在浏览器中的接口却是用JavaScript实现的。浏览器中通常会把DOM和JavaScript独立实现，两个相互独立的功能只要通过接口彼此连接，就会产生消耗。

### DOM访问与修改

对比一下两个实例：

	{% highlight javascript linenos %}
	function innerHTMLLoop1 () {
	    for (var count = 0; count < 15000; count++) {
	        document.getElementById('here').innerHTML += 'a';
	    }
	}
	
	function innerHTMLLoop2 () {
	    var content = '';
	    for (var count = 0; count < 15000; count++) {
	        content += 'a';
	    }
	    document.getElementById('here').innerHTML += content;
	}
	{% endhighlight %}
	
第一个实例中多次访问修改DOM，第二个实例中则在javascript中循环处理好内容之后，一次性访问修改DOM.所以：**减少访问DOM的次数，把运算尽量留在ECMAScript这一端处理**。

innerHTML与原生DOM方法对比实验表明，在旧版浏览器中innerHTML的优势较明显，但在新版本中则不那么明显，在基于webkit内核的新版本浏览器中DOM方法反而略胜一筹。

使用DOM方法更新页面内容的另一个途径是克隆已有元素，即使用 `element.cloneNode()` 替代 `document.createElement()` ，效率会稍有提高。

#### HTML Collections HTML集合 **\***

HTML集合是包含了DOM节点引用的类数组对象，以下方法的返回值就是一个集合：

*	`document.getElementByName()`
*	`document.getElementsByClassName()`
*	`document.getElementsByTagName()`

下面的属性同样返回HTML集合：

*	`document.images // 页面中所有img元素`
*	`document.links // 所有a元素`
*	`document.forms // 所有表单元素`
*	`document.forms[0].elements // 页面中第一个表单的所有字段`

以上返回的都是HTML集合对象，是个类似数组的列表。它们并不是真的数组，但提供了一个类似数组中的length属性，而且可以以数字索引的方式访问列表里的元素。其中一个重要的特性：

> 正如DOM标准中所定义的，HTML集处于一种“实时状态”实时存在，这意味着当底层文档对象更新时，它也会自动更新（[参考](http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-75708506)）。

这就意味着集合是一直和文档保持连接的，每次需要更新信息时，都会重复查询文档，哪怕只是获取它的length属性。这就是它低效的原因。

下面是一个有趣的死循环：

	{% highlight javascript linenos %}
	// 一个意外的死循环
	var alldivs = document.getElementsByTagName('div');
	for (var i = 0; i < alldivs.length; i++) {
	    document.body.appendChild(document.createElement('div'));
	}
	{% endhighlight %}

代码中的alldivs.length反映出的底层文档的当前状态。这样的遍历操作不仅可能会导致逻辑错误，而且很慢，每次迭代都要执行查询操作。

优化方法有两种，一种是讲HTML集合拷贝到普通数组中：

	{% highlight javascript linenos %}
	function toArray (collection) {
	    for (var i = 0, a = [], len = collection.length; i < len; i++) {
	        a[i] = collection[i];
	    }
	    return a;
	}
	{% endhighlight %}

另一种方法是将collection的长度缓存到局部变量中。一般来说遍历较小的集合加入了缓存就可以了。在相同的内容和数量下，遍历一个数组的速度是明显快于遍历一个HTML集合的。但是将集合放到数组中又需要额外的一次遍历，所以应该进行衡量评估，再选用合适的方法。

访问集合元素的时候也同样可以使用局部变量来缓存此成员，然后用局部变量去访问元素，下面是三个例子：
	
	{% highlight javascript linenos %}
	// 较慢
	function collectionGlobal () {
	    var collection = document.getElementsByTagName('div'),
	        len = collection.length,
	        name = '';
	    for (var count = 0; count < len; count++) {
	        name = document.getElementsByTagName('div')[count].nodeName;
	        name = document.getElementsByTagName('div')[count].nodeType;
	        name = document.getElementsByTagName('div')[count].tagName;
	    }
	    return name;
	}
	
	// 较快
	function collectionLocal () {
	    var collection = document.getElementsByTagName('div'),
	        len = collection.length,
	        name = '';
	    for (var count = 0; count < len; count++) {
	        name = collection[count].nodeName;
	        name = collection[count].nodeType;
	        name = collection[count].tagName;
	    }
	    return name;
	}
	
	// 最快
	function collectionNodesLocal () {
	    var collection = document.getElementsByTagName('div'),
	        len = collection.length,
	        name = '',
	        el = null;
	    for (var count = 0; count < len; count++) {
	        el = collection[count];el
	        name = el.nodeName;
	        name = el.nodeType;
	        name = el.tagName;
	    }
	    return name;
	}
	{% endhighlight %}
	
#### 遍历DOM

*	爬行的两种方式
	*	使用`childNodes`得到元素集合（childNodes是HTML集合，使用时谨记缓存length属性）
	*	使用`nextSiblig`来获取每个相邻元素
	
	再不同浏览器中两种方法运行时间几乎相等，但是在IE6，7中nextSibling要快很多倍（16、105倍）。

*	元素节点

	`childNode`,`firstChild`,`nextSibling`都是不区分元素节点和其他类型节点的，比如注释和文本。
	
	能区分元素机节点和其他节点的DOM属性
	
	属性名                  | 被替换属性            
	---------------------- | -------------------- 
	children               | childNodes          
	childElementCount      | childNodes.length          
	firstElementChild      | firstChild          
	lastElementChild       | lastChild          
	nextElementSibling     | childNodes          
	previousElementSibling | previousSibling
	
	IE6、7、8只支持`children`属性。在所有浏览器中`children`替代`childNodes`会更快，因为集合项更少。而且在IE中遍历children集合的速度要明显快于遍历childNodes。
	
*	选择器API：`querySelectorAll()`和`querySelector()`
	*	对比：

			{% highlight javascript linenos %}	
			// 返回值是一个NodeList：包含着匹配节点的类数组对象，
			// 区别于HTML集合，它并不会对应实时的文档结构
			var elements = document.querySelectorAll('#menu a');
			
			// 返回值是HTML集合
			var elements = document.getElementById('menu').getElementsByTagName('a');
			{% endhighlight %}
			
		如果要处理大量组合查询，使用`querySelectorAll()`会更有效率，以下例子是很好的对比：
			
			{% highlight javascript linenos %}
			var errs = document.querySelectorAll('div.warning, div.notice');
			
			var errs = [],
				divs = document.getElementsByTagName('div'),
				classname = '';
			for (var i = 0, len = divs.length; i < len; i++) {
				classname = divs[i].className;
				if (classname === 'notice' || classname === 'warning') {
					errs.push(divs[i]);
				}
			}
			{% endhighlight %}
		
		
		第一段代码出了更简洁之外，效率还比第二段高2～6倍。
		
	*	支持的浏览器： IE8, Firefox 3.5+, Safari 3.1+, Chrome1+, Opera 10+
	

###重绘与重排

> 浏览器下载完成页面中的所有组件：HTML标记，JavaScript,CSS,图片，之后会解析并生成两个内部数据结构：

*	DOM树
	
	表示页面结构
	
*	渲染树

	表示DOM节点如何显示
	
当DOM的变化影响了元素的集合属性（宽高），浏览器需要重新计算元素的集合属性，同样其他元素的集合属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树，这个过程称为“**重排(reflow)**”；完成重排后，浏览器会重新绘制受影响的部分到屏幕中，该过程称为“**重绘(repaint)**”。

重绘和重排操作都是代价昂高的操作，导致UI反应迟钝，要尽量减少。

####重排何时发生？

页面布局和几何属性发生改变：

*	添加或删除可见的DOM元素。
*	元素位置改变。
*	元素尺寸改变（margin, padding, border, width, height）。
*	页面渲染器初始化。
*	浏览器窗口尺寸改变。

####渲染树变化的排列与刷新

获取布局信息的操作会导致队列刷新

*	offsetTop, offsetLeft, offsetWidth, offsetHeight
*	scrollTop, scrollLeft, scrollWidth, scrollHeight
*	clientTop, clientLeft, clientWidth, clientHeight
*	getComputedStyle() (currentStyle in IE)

在修改样式的过程中，最好避免使用上面列出的属性，因为不管它本身有没有改变，使用以上属性都会刷新渲染队列。**\***

####最小化重绘和重排

优化方法：合并多次对DOM和样式的修改，然后一次性处理掉。

例子：

	{% highlight javascript linenos %}
	// 可能触发多次重排
	var el = document.getElementById('myDiv');
	el.style.borderLeft = '1px';
	el.style.borderRight = '2px';
	el.style.padding = '5px';
	
	// 优化
	el.style.cssText += 'border-left: 1px; border-right:2px; padding: 5px;';
	
	// 另一种优化, 将样式写到CSS的class中
	el.className = 'active';
	{% endhighlight %}
	
要对DOM元素进行一系列操作时，可通过一下步骤来减少重绘和重排的次数：

1.	使元素脱离文档流
2.	对其应用多重改变
3.	把元素带回文档中

其中第1，3步各触发一次重排。

三种基本方法可以使DOM脱离文档：

*	隐藏元素，应用修改，重新显示
	
	通过改变display属性来实现
	
*	使用文档片段（document fragment）在当前DOM之外构建一个子树，再把它拷贝回文档

	这就用到一个叫文档片段fragment的轻量级document对象，它的设计初衷就是为了完成更新和移动节点的任务，使用方法见下面的gist：
	
	<script src="https://gist.github.com/3549691.js?file=文档片段fragment.js"></script>


*	将原始元素拷贝到一个脱离文档的节点中，修改副本，完成后再替换原始元素

####缓存布局信息

查询布局信息，例如： offsets，scroll values或computedstyle values的时候，浏览器为了返回最新的值，会刷新队列并应用所有变更。

优化犯法：用局部变量缓存布局信息，减少布局信息的获取次数

考虑一下代码

	{% highlight javascript linenos %}
	// 低效的
	myElement.style.left = 1 + myElement.offsetLeft + 'px';
	myElement.style.top = 1 + myElement.offsetTop + 'px';
	if (myElement.offsetLeft >= 500) {
	    stopAnimation();
	}
	
	// 优化： 缓存offsets值
	var current = myElement.offsetLeft;
	
	//...
	
	current++;
	myElement.style.left = current + 'px';
	myElement.style.top = current + 'px';
	if (current >= 500) {
	    stopAnimation();
	}
	{% endhighlight %}
	
####让元素脱离动画流

动画中使用绝对定位，使用拖放代理

####IE和hover

在IE中如果大量元素使用了:hover，会降低响应速度。IE8尤其明显。

####事件委托

使用事件委托来减少事件处理器的数量。

原理：事件逐层冒泡并能被父级元素捕获

参考以下gist：

<script src="https://gist.github.com/3549691.js?file=事件委托.js"></script>

其中要注意跨浏览器的部分，包括：

*	访问事件对象，并判断事件源
*	取消文档树中的冒泡
*	阻止默认动作