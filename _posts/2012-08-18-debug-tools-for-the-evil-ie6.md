---
layout: post

title: IE6相关开发与debug工具
---

实习了一段时间，对ie6的厌恶感提升了不少。但脏活累活总得有人去干，ie6下出了盒子模型和各种布局样式的诡异bug外，在字符编码，还有js代码也有不少让人挠头的问题。本文不细说具体问题的原因和解决，列举几个最近用到的ie6下常用的开发和debug工具。

1.	IE6。对的，就是ie6。ie6下开发和兼容怎么能没有个ie6呢。似乎ietester是个很好东西，同时拥有ie6，7，8，9，但是在实际使用中发现ietester不能完整和真实地呈现出各版本的效果，会与实际有差异，甚至是出现一些实际版本没有错误扰乱我们发现实际的问题。所以个人还是比较推荐在用虚拟机装对应版本的系统使用对应版本的ie，这样比较能真实还原用户场景。
2.	Internet Explorer Developer Toolbar。比firebug，chrome和safari的开发者工具差得多的东西，但是嘛，在这么烂的浏览器上也别指望有特别优秀的的开发者工具了，凑合着可以查看一下dom，修改元素样式等。下载链接：[M$官方下载传送门](http://www.microsoft.com/en-us/download/details.aspx?id=18359)
3.	Debug Bar。javascript debug工具。会报告js错误，显示调用栈，错误文件以及代码所在行数；提供类似firebug的console API；一个javascript console。安装前需要先安装Microsofe Script Debugger, [下载传送门](http://www.microsoft.com/zh-cn/download/details.aspx?id=23992)。官方地址：[传送门again](http://www.my-debugbar.com/wiki/CompanionJS/HomePage)。
4.	Fiddler。fiddler是一个http/https调试器，不仅限于对ie使用，只是最近在ie6的调试中帮了很大的忙，才特别地列在这里。简单来说，fiddler做的事情就是以代理服务器的方式监听系统的网络数据，通过fiddler我们可以监控，更改这些请求。其中较常用的功能是auto response，我们可以用本地的文件来替代网络请求的结果，骗过浏览器，这样就方便我们做前端的调试，不用每次都修改服务器端的代码，直接就可以在前段进行代码修改调试了。
	下面是一些相关的教程和连接：
	*	[使用Fiddler提高前端工作效率 (介绍篇)](http://www.aliued.cn/2010/04/18/use-fiddler-to-improve-efficiency-of-front-development-introduction.html)
	*	[使用Fiddler提高前端工作效率 (实例篇)](http://www.aliued.cn/2010/04/25/use-fiddler-to-improve-efficiency-of-front-development-example.html)
	*	[官方网站](http://www.fiddler2.com/fiddler2/)
	
5.	另外，由于在xp中测试的ie6，虽然不是开发环境，但是调试过程中代码的修改工作量也不少，所以最还要下载个好用的文本编辑器。鉴于sublime text 2对gbk支持不太好，所以使用notepad++。另外由于从服务器下载的html文件一般内容都很多，代码量大，使用diff工具配合fiddler，对比线上和线下文件，效率会更高一些。推荐一个DiffMerge，下载地址自己google。