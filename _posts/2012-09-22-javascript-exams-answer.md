---
layout: post
title: 一些觉得比较有用的JavaScript题目[解答]
published: true
categories: [JavaScript]
tags: JavaScript
preview: 摘自网上的一些感觉比较有用的JavaScript笔试面试题目。不纯粹为求职而整理，只为从中看到自己的不足。答案。

---

## 关于全局变量局部变量的四道小题目

写出以下各段代码的运行结果。

*	第一题：
	
		{% highlight javascript%}
		var a = 10;
		sayHi();
		function sayHi() {
			var a = 20;
			alert(a);
		}
		alert(a);
		{% endhighlight%}
		
	运行结果： 20 10
		
*	第二题：

		{% highlight javascript%}
		var a = 10;
		sayHi();
		function sayHi() {
			a = 20;
			alert(a);
		}
		alert(a);
		{% endhighlight%}
		
	运行结果： 20 20

*	第三题：

		{% highlight javascript%}
		var a = 10;
		sayHi();
		function sayHi() {
			a = a + 10;
			alert(a);
			return a;
		}
		alert(a);
		alert(sayHi() + 10);
		{% endhighlight%}
		
	运行结果： 20 20 30 40

*	第四题：

		{% highlight javascript%}
		var a = 10;
		sayHi();
		function sayHi() {
			var a = a + 10;
			alert(a);
			return a;
		}
		alert(a);
		alert(sayHi() + 10);
		{% endhighlight%}
		
	运行结果： NAN 10 NAN NAN
	
总结：这几道题其实挺简单的，只要区分好全局变量和局部变量就OK，最后一题里面在sayHi里面的a使局部变量，但是在 `a + 10` 前a只声明未赋值，所以是`undefined`， `undefined`加上一个Number，则得到NAN。
		
> 摘自[四道JavaScript面试题检测你的js基本功](http://www.nowamagic.net/librarys/veda/detail/225)

## 三道搜狐的面试题

*	题目一，实现一个遍历数组或对象里所有成员的迭代器

	答案代码：[soho/ex1.html](/demos/ex/sohu/ex1.html)