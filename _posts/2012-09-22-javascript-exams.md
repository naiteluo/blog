---
layout: post
title: 一些觉得比较有用的JavaScript题目
published: true
categories: [JavaScript]
tags: JavaScript
preview: 摘自网上的一些感觉比较有用的JavaScript笔试面试题目。不纯粹为求职而整理，只为从中看到自己的不足。答案见之后的post。

---

## 关于全局变量局部变量的四道小题目

写出以下各段代码的运行结果。

*	第一题：
	
		{% highlight javascript %}
		var a = 10;
		sayHi();
		function sayHi() {
			var a = 20;
			alert(a);
		}
		alert(a);
		{% endhighlight %}
		
*	第二题：

		{% highlight javascript %}
		var a = 10;
		sayHi();
		function sayHi() {
			a = 20;
			alert(a);
		}
		alert(a);
		{% endhighlight %}

*	第三题：

		{% highlight javascript %}
		var a = 10;
		sayHi();
		function sayHi() {
			a = a + 10;
			alert(a);
			return a;
		}
		alert(a);
		alert(sayHi() + 10);
		{% endhighlight %}

*	第四题：

		{% highlight javascript %}
		var a = 10;
		sayHi();
		function sayHi() {
			var a = a + 10;
			alert(a);
			return a;
		}
		alert(a);
		alert(sayHi() + 10);
		{% endhighlight %}
		
> 摘自[四道JavaScript面试题检测你的js基本功](http://www.nowamagic.net/librarys/veda/detail/225)
		
## 三道搜狐的面试题

*	题目一，实现一个遍历数组或对象里所有成员的迭代器

		{% highlight javascript %}
		var each = function(obj, fn){
			//+++++++++++答题区域+++++++++++
			
			//+++++++++++答题结束+++++++++++
		};
		
		try{
			var data1 = [4,5,6,7,8,9,10,11,12];
			var data2 = {
			"a": 4,
			"b": 5,
			"c": 6
			};
			
			console.group(data1);
			
			each(data1, function(o){
				if( 6 == this )
					return true;
				else if( 8 == this )
					return false;
				console.log(o + ": \"" + this + "\"");
			});
			
			console.groupEnd();
			
			/*------[执行结果]------
			
			1: "4"
			2: "5"
			4: "7"
			
			------------------*/
			
			console.group(data2);
			
			each(data2, function(v, n){
				if( 5 == this )
					return true;
				console.log(n + ": \"" + v + "\"");
			});
			
			console.groupEnd();
			
			/*------[执行结果]------
			
			a: "4"
			c: "6"
			
			------------------*/
		
		}catch(e){
			console.error("执行出错，错误信息: " + e);
		}
		{% endhighlight %}

*	题目二，实现一个叫Man的类，包含attr, words, say三个方法

		{% highlight javascript %}
		var Man;
		//+++++++++++答题区域+++++++++++
		
		//+++++++++++答题结束+++++++++++
		
		try{
		
	        var me = Man({ fullname: "小红" });
	        var she = new Man({ fullname: "小红" });
	
	        console.group();
	        console.info("我的名字是：" + me.attr("fullname") + "\n我的性别是：" + me.attr("gender"));
	        console.groupEnd();
	        /*------[执行结果]------
	
	        我的名字是：小红
	        我的性别是：<用户未输入>
	
	        ------------------*/
	
	        me.attr("fullname", "小明");
	        me.attr("gender", "男");
	        me.fullname = "废柴";
	        me.gender = "人妖";
	        she.attr("gender", "女");
	
	        console.group();
	        console.info("我的名字是：" + me.attr("fullname") + "\n我的性别是：" + me.attr("gender"));
	        console.groupEnd();
	        /*------[执行结果]------
	
	        我的名字是：小明
	        我的性别是：男
	
	        ------------------*/
	
	        console.group();
	        console.info("我的名字是：" + she.attr("fullname") + "\n我的性别是：" + she.attr("gender"));
	        console.groupEnd();
	        /*------[执行结果]------
	
	        我的名字是：小红
	        我的性别是：女
	
	        ------------------*/
	
	        me.attr({
	                "words-limit": 3,
	                "words-emote": "微笑"
	        });
	        me.words("我喜欢看视频。");
	        me.words("我们的办公室太漂亮了。");
	        me.words("视频里美女真多！");
	        me.words("我平时都看优酷！");
	
	        console.group();
	        console.log(me.say());
	        /*------[执行结果]------
	
	        小明微笑："我喜欢看视频。我们的办公室太漂亮了。视频里美女真多！"
	
	        ------------------*/
	
	        me.attr({
	                "words-limit": 2,
	                "words-emote": "喊"
	        });
	
	        console.log(me.say());
	        console.groupEnd();
	        /*------[执行结果]------
	
	        小明喊："我喜欢看视频。我们的办公室太漂亮了。"
	
	        ------------------*/
		
		}catch(e){
	        console.error("执行出错，错误信息: " + e);
		}
		{% endhighlight %}

*	题目三，实现一个URI解析方法，把url里#之后的参数解析成指定的数据结构

		{% highlight javascript %}
		function urlParser(s){
	        //+++++++++++答题区域+++++++++++
	
	        //+++++++++++答题结束+++++++++++
		}
		
		try{
	        var url1 = "http://www.abc.com/m/s/#page/2/?type=latest_videos&page_size=20";
	        var url2 = "http://www.abc.com/m/s/#type=latest_videos&page_size=20";
	        var url3 = "http://www.abc.com/m/s/#page?type=latest_videos&page_size=20";
	
	        console.group();
	        console.info( urlParser(url1) );
	        console.info( urlParser(url2) );
	        console.info( urlParser(url3) );
	        console.groupEnd();
	        /*------[执行结果]------
	
	        ["page", "2", { "type": "latest_videos", "page_size": 20 }]
	        [{ "type": "latest_videos", "page_size": 20 }]
	        ["page", { "type": "latest_videos", "page_size": 20 }]
	
	        ------------------*/
		
		}catch(e){
	        console.error("执行出错，错误信息: " + e);
		}
		{% endhighlight %}

> 摘自[搜狐JavaScript面试题](http://www.muzilei.com/archives/255)

## 人人网javascript面试题

要求，使用原生代码，不使用任何框架。第五题选做。（论坛中说这是社会招聘的题目，时间为一周）

*	在页面的固定区域内实现图片展示

	1.	每点击一次右箭头，图片区域向左滚动出一张图片，反之相同
	2.	当发现图片滚动到末尾时，响应的箭头变成不可点击状态
	3.	鼠标在图片区域内滑动滚轮，图片会随着鼠标滚轮的方向进行响应的滚动
	
*	用js、html、css实现一个弹出提示控件:

	1.	分别实现类似于系统的  alert、confirm、prompt对话框
	2.	对话框大小根据提示内容进行自适应（有一个最小宽高），默认出现在页面的水平垂直居中的位置
	3.	对话框可拖动
	4.	对话框中的事件模拟系统对话框的事件（例如：alert 对话框，点击确定按钮，对话框消失）
	5.	解决IE6被 select控件遮挡的问题
	
*	实现 input 输入框的自动匹配

	1.	对 input框中输入的字符进行匹配，将匹配到的内容以菜单的形式展现在input框的下方
	2.  只针对英文字符进行匹配，并且匹配到的内容在菜单中加粗
	2.	通过键盘上的上下箭头可以对菜单进行选择，按下回车后将选中的内容写入到input框中

*	在页面上实现一个二级菜单控件

	1.	这个控件可以绑定到页面上的任意一个元素，当点击页面元素出现菜单
	2.	菜单出现的方向根据所在页面的位置自动进行调整
	3.	一级菜单中的元素，鼠标划过后，将会在相应的位置出现二级菜单，二级菜单中的元素
点击将会有事件响应 

*	实现一个所见即所得编辑器（选作）

	需提供以下功能：
	
	1.	字体加粗
	2.	文本左对齐、右对齐、居中
	3.	设置字体
	4.	设置字号
	5.	设置字体颜色
	6.	插入超链接
	7.	插入图片

> 摘自[这里](http://www.w3cfuns.com/thread-5591957-1-1.html)，里面有图。



