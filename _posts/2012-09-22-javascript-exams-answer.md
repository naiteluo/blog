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
	
		var a = 10;
		sayHi();
		function sayHi() {
			var a = 20;
			alert(a);
		}
		alert(a);
			
	运行结果： 20 10
		
*	第二题：

		var a = 10;
		sayHi();
		function sayHi() {
			a = 20;
			alert(a);
		}
		alert(a);
		
	运行结果： 20 20

*	第三题：

		var a = 10;
		sayHi();
		function sayHi() {
			a = a + 10;
			alert(a);
			return a;
		}
		alert(a);
		alert(sayHi() + 10);
		
	运行结果： 20 20 30 40

*	第四题：

		var a = 10;
		sayHi();
		function sayHi() {
			var a = a + 10;
			alert(a);
			return a;
		}
		alert(a);
		alert(sayHi() + 10);
		
	运行结果： NAN 10 NAN NAN
	
总结：这几道题其实挺简单的，只要区分好全局变量和局部变量就OK，最后一题里面在sayHi里面的a使局部变量，但是在 `a + 10` 前a只声明未赋值，所以是`undefined`， `undefined`加上一个Number，则得到NAN。
		
> 摘自[四道JavaScript面试题检测你的js基本功](http://www.nowamagic.net/librarys/veda/detail/225)

## 三道搜狐的面试题

*	题目一，实现一个遍历数组或对象里所有成员的迭代器

	此外，可以通过回调函数的返回值，来终止迭代。
	
	这道题比较有用的知识点是判断数组和对象，`arr instanceof Array`在一般情况下还是管用的，但是如果涉及到不同的JavaScript环境，不同的框架，则不完全可靠。以下是兼容的解决方法

		var isArray = Array.isArray || function (o) {
			return typeof o === 'string' &&
				Object.prototype.toString.call(o) === '[object Array]';
		}

	还使用到`Function.call`或者`Function.apply`。call指定函数的this和参数并调用。这两个的区别在于参数的传入方式，如下：
	
		func.call(thisObj, arg0, arg1, arg2);
		func.apply(this.Obj, [arg0, arg1, arg2]);

	答案代码：[soho/ex1.html](/demos/ex/sohu/ex1.html)
	
*	题目二，实现一个叫Man的类，包含attr, words, say三个方法

	比较难的有三个地方。
	
	首先，要让Man支持两种调用方式，一种是java式的`var me = Man(options);`，另一种是使用`new`操作符的`var me = new Man(options);`。第一种方法的`this`指向的是当前执行环境，而第二种的话，会新建一个空对象，`this`指向这个对象本身，返回给变量`me`。要想使用prototype来添加方法的话，使用第二种会比较好。基本是按照第二种来写构造函数，对第一种作特殊处理。
	
		if (this.constructor !== Man) {
	        return new Man(options);
	    }
	
	如果this的构造器不是Man的话，则使用第二种方式创建实例。但是我发现这里面有个比较大的bug，就是当在Man的实例方法里面用this的构造器是Man，这样的话这个判断就无效了。使用另外一种方法可以解决这个问题：
		
		Man ＝ function (options) {
			return new Man.prototype.init(options);
		}
		
		// 真正的构造器
		Man.prototype.init = function (options) {
		
		}
		
		Man.prototype.init.prototype {
			attr: function () {},
			words: function (str) {},
			say: function () {}
		}
		
	上面的写法实际上构造器是`Man.prototype.init`，所以`me instanceof Man`返回的是`false`，所以我觉得这种写法不如上面，而且还比较难理解。
	
	第二就是在测试代码里面要求不能直接直接通过用对象的属性来写`fullname`和`gender`：
	
		me.fullname = "废柴";
	    me.gender = "人妖";
	    
	不可以这样去改变实例的这两个属性，也就是相当于让这两个属性变得私有。实现的方法是，在构造器内用`var`定义这两个变量，然后创建特权函数getter setter来操作这这两个属性，如下：
	
		Man = function (options) {
	
		    // 两种调用方式 var p = Man(options); or var p = new Man(options);
		    if (this.constructor !== Man) {
		        return new Man(options);
		    }
		
		    // private variables 私有变量
		    var fullname, 
		        gender;
		
		    // privilege functions 特权函数
		    this.setFullname = function (_name) {
		        fullname = _name;
		    }
		    this.setGender = function (_gender) {
		        gender = _gender;
		    }
		    this.getFullname = function () {
		        return fullname || '<用户未输入>';
		    }
		    this.getGender = function () {
		        return gender || '<用户未输入>';
		    }
		
		    this.attr(options);
		}
	
	再在`Man.prototype`中定义`attr`,`words`,`say`方法。
	
	第三个比较麻烦的是`attr`方法，它可以接受多种参数形式。不过只需要对参数个数的类型作判断分情况处理就可以了。还需注意的是，我们的fullname和gender都是需要用setter，getter来操作的，其他值直接通过this的属性读写。当attr的参数中有这两个特殊情况时也要分开处理。

	答案代码：[soho/ex2.html](/demos/ex/sohu/ex2.html)