---
layout: post

title: problems of front end 1
---

### 问题描述

在做一个有很多节点的菜单（最深有4层）的时候，我们一开始的步骤是从一个服务器生成的静态的js文件里面获取菜单的树内容，再将树的那内容生成dom。这样再普通浏览器上显示还比较正常，但是如果机子的性能比较差或者是在ie6等浏览器上，菜单部分则会显示空白，经过1～2秒的空白后，完成树的遍历和节点的生成后，才显示到页面中，体验极差。

	{% highlight javascript linenos %}
	$.each(menuData, function(i, elem) {
		
		// blablabla ...
				
		var channel = $('<div class="channel"></div>'),
			tree = $('<div></div>');

		channel.append(tree);

		menu.append('<h3><a href="#" data-board="' + elem.id + '">' + elem.name + '</a></h3>')
			.append(channel);

		// 生成子树
		tree.dynamictree({
			source: elem.sub
		});
	});

	// 初始化菜单
	menu.accordion({
		autoHeight: false,
		collapsible: true,
		active: false
	});
	{% endhighlight %}

### 解决方案

可以考虑先生成显示一级的菜单，一级菜单加载显示了之后，再去生成子菜单。

### 代码实现

最早的时候，同事建议给生成树的操作加一个setTimeout，延时设为0，这样就是树的加载是异步进行的，代码修改如下：

	{% highlight javascript linenos %}
	setTimeout(function () {
		tree.dynamictree({
			source: elem.sub
		});
	}, 0);
	{% endhighlight %}
	
这个解决方法很立杆见效，加载树的操作异步执行了，但是有一个问题，我们需要在整个菜单都加载完之后，激活当前所在版块。这样的话我们还必须保证激活当前版块的操作在树加载完成的操作后执行。

中间有考虑过用jquery的deferred对象来实现，将最后激活当前版块的操作写成一个回调函数，但是阅读文档和搜索相关资料后发现，deferred多用在ajax的异步操作，而且现在的ajax操作都返回一个deferred对象，而setTimeout等timer函数则很难使用用deferred对象和方法。

我们打算将所有子树生成的操作先放入一个队列中，再将激活当前版块的操作放入队列尾，最后只要再一级菜单生成后再顺序执行操作队列就可以了，代码如下：

	{% highlight javascript linenos %}
	$.each(menuData, function(i, elem) {
		
		// blablabla ...

		// 将生成子树的操作放入事件队列，延后执行
		queue.push(function () {
			tree.dynamictree({
				source: elem.sub,
				itemRendered: itemRendered
			});
		});
	}
	
	// 所有子树生成后激活当前版块
	queue.push(activeCurrentBoard);

	menu.accordion({
		autoHeight: false,
		collapsible: true,
		active: false
	});

	// 异步执行，解决ie6卡顿bug
	setTimeout(function () {
		$.each(queue, function (i, func) {
			func();
		});
	}, 0);
	{% endhighlight %}
	
实习一段时间了，感觉实际中遇到最多的问题都不是什么复杂的问题，都是些需要去仔细察觉的问题，例如怎么写才可以在代码可读性和代码的性能间取得平衡，怎么设计和保护代码，使它们不相互污染，多考虑一些容错情况，等等。