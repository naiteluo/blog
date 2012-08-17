---
layout: post

title: Build a web chat room with Node.JS and Socket.IO
---

## 应用描述 ##

*WebSocket* 作为HTML5的一个新特性，它的目的是为需要双向通信的基于浏览器的应用提供一个机制，不需要依靠建立多个HTTP连接即可实现双向通信。以前，web应用要在客户端和服务器建立双向连接的话，需要发送大量的http请求向服务器进行轮询，这导致了一些问题：

1. 	为此，服务器需要为客户端使用多个的TCP连接；
2. 	每个客户端给服务器端的请求都包含HTTP header，传输开销大；
3. 	客户端编程复杂

WebSocket是基于事件的，而Node.JS使用的则是事件驱动模型，直接使用javascript，代码编写更简单。另外，node.JS很高效，结合WebSocket，适合实时性要求很高的web应用，例如游戏，IM，监控程序等。

我们的这次做的应用是使用Node.JS和Socket.IO实现的的Web聊天室，OnChat

## 开发环境及平台 ##

开发环境： Mac OX X 10.7.3, Node.Js v0.6.11, npm v1.1.1  
开发语言： JavaScript   
开发框架： Express, Socket.IO   
测试浏览器： Chrome 14+, Safari 5+

## 功能说明 ##
主要实现功能： 登陆，即时聊天，类微博@人

### 应用界面 ###

* 	后台运行界面    
	![image](https://github.com/naiteluo/Images/raw/master/snip/onchat1.png)

* 	程序前端界面   
	![image](https://github.com/naiteluo/Images/raw/master/snip/onchat2.png)

* 	登陆，及在线用户列表     
	![image](https://github.com/naiteluo/Images/raw/master/snip/onchat3.png)

* 	聊天    
	![image](https://github.com/naiteluo/Images/raw/master/snip/onchat4.png)

* 	at 人，私聊    
	![image](https://github.com/naiteluo/Images/raw/master/snip/onchat5.png)


## 程序说明 ##

### 基本web框架 ###

OnChat使用Expres框架作为基础搭建。用Express可以很快地搭建出一个包含健壮的路由、模板引擎等的轻量高效服务器，省去大量底层的工作，可以专注于应用的实现。主程序app.js主要添加一下部分以引入我们的聊天模块：
	
	// Init chat room
	var chat = Chat(sio.listen(app));
	chat.start();
	
Socket.IO则是使用到的另一个重要的module。它封装了websocket的一些常用方法，还提供多浏览器支持。我们使用Socket.IO来实现websokcet的通信。聊天室封装成一个名为CR对象，一个CR对象包括一个Room。Room对象中有一个User的列表。每个User对象作为于Room的连接，处理每个Client对服务器的通信。代码在

	./chat/index.js
	
由于同样使用JavaScript和Socket.IO，前端使用的js代码于后端基本类似。

	./public/javascripts/chat.js

### 文件目录 ###
	.
	├── Procfile
	├── README.md
	├── app.js					# 主程序
	├── chat					# 聊天室模块
	│   └── index.js
	├── example
	│   ├── client.html
	│   └── server.js
	├── node_modules			# 其他依赖模块
	│   ├── express				# web 框架
	│   ├── jade
	│   └── socket.io			# websocket 框架
	├── npm-debug.log
	├── package.json			# npm 信息
	├── public					# 公共文件
	│   ├── bootstrap
	│   ├── images
	│   ├── javascripts
	│   └── stylesheets
	├── routes					# routes
	│   └── index.js
	└── views					# 模板文件
	    ├── 404.jade
	    ├── index.jade
	    └── layout.jade

### 安装使用说明 ###

1. 	安装node.js 与 npm
2. 	下载代码，进入项目根目录，使用npm进行依赖包下载，完成后运行
	
		$ cd ./OnChat
		$ npm install
		$ node app.js

3. 	访问127.0.0.1:3000（使用chrome 14 + 或 safari 5 + 访问）
4. 	安装配置有问题的，可以访问在线demo：[OnChat on Heroku](http://onchat.herokuapp.com)

## 缺点分析 ##

一些缺点：

* 	Websocket只兼容版本较高的浏览器，当浏览器版本较低时，Socket.IO将转用传统的轮询方式
* 	没有用户注册，用户即时登陆
* 	只支持纯文本聊天

计划修改与提高：

* 	增加微博绑定认证的注册机制
* 	增加表情
* 	增加画板

## 总结 ##

这次项目过程中使用了websocket这个HTML5的新特性，在效率和速度上的优势在聊天室这个对实时性要求不是很苛刻的应用上没有特别地体现，但是有一个很明显的优势体现出来了，就是在代码编写上面变的很简单。用以往轮询的方法实现起来，代码逻辑会比较复杂。而不管是直接用websocket或者是socket.io，应用起来的逻辑都比较简单，一个是on，监听message，另一个是send，发送message。这样我们就可以很容易地讲User封装起来，代码更简洁易懂。另外，websocket还可以扩展出很多应用，例如一些实时交互的游戏，服务器监控等。
