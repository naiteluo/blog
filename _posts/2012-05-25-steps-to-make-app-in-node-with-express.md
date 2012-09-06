---
layout: post

title: Steps to make app in node with express
---

##Preparation##

安装配置好node.js和npm。

##Steps##

1.	创建App文件夹，进入文件夹

		mkdir guess
		cd guess

2. 	用npm下载express

		npm install express

3. 	用Express初始化App，可能会警告文件夹非空，选择y继续

		./node_module/express/bin/express .

4. 	文件目录如下：

		.
		├── app.js				# 应用的入口，主文件
		├── node_modules		# node 模块
		│   └── express			
		├── package.json		# 配置文件
		├── public				# 公共文件，静态文件
		│   ├── images				# 图片
		│   ├── javascripts			# 前端js
		│   └── stylesheets			# 样式表
		├── routes				# 路由文件
		│   └── index.js
		└── views				# 模版
		    ├── index.jade
		    └── layout.jade

5. 	打开package.json文件，这个文件是npm用来获取app的信息和相关依赖module信息的，修改如下：

		{% highlight javascript linenos %}
		{
		    "name": "guess"
		  , "version": "0.0.1"
		  , "private": true
		  , "dependencies": {
		      "express": "2.5.8"
		    , "jade": ">= 0.0.1"
		    , "socket.io" : ">= 0.0.1"
		  }
		}
		{% endhighlight %}

	我们添加了socket.io module，保存。再用npm来安装所有依赖的modules。

		npm install

6. 	基本的配置已经完成了，接下来我们编辑./views/index.js

		{% highlight javascript linenos %}
		/*
		 * GET home page.
		 */
		
		exports.index = function(req, res){
		  res.render('index', { title: 'Guess' })
		};
		{% endhighlight %}

	将title修改成我们应用的名字：Guess。

7. 	接下来就可以运行程序了

		node app.js
		Express server listening on port 3000 in development mode

	在浏览器中访问：[http://localhost:3000/](http://localhost:3000/) ，效果如下:

	> <h1>Guess</h1>
	> <p>Welcome to Guess</p>
