---
layout: post

title: html5游戏笔记 pingpong ball
---

下载了本《html5 Game Development by Example》的书，看着很有趣，一些游戏的实例，用来熟悉html5/css3配合javascript的新特性。记录一下写一下blog增加记忆。

<a href="http://mmnn-wordpress.stor.sinaapp.com/uploads/2011/11/1.png"><img class="size-medium wp-image-51" title="pingpong" src="http://mmnn-wordpress.stor.sinaapp.com/uploads/2011/11/1-284x300.png" alt="pingpong" width="284" height="300" /></a>

书的第一章简单地介绍了html5和css3的一些新特性；第二章的example是一个pingpong的游戏，就是左右各一块板，中间一个小球弹来弹去的游戏。这本书已经完全不考虑html之前的版本了，所以还会介绍html的一些新标签；基本不涉及到css3的内容；使用jquery做游戏开发的基本方法。游戏链接：<a title="Pingpong" href="http://mmnn.sinaapp.com/demos/pingpong/">Pingpong game demo</a>

html5使用了跟简单的文件声明,取代了原来那一串重来都只是被copy的复杂文件声明，html标签也只需加入一个lang的语言属性即可，制定字符集的meta也得到简化:这次使用了header和footer标签，以前用得很多的这两个id名终于修成正果升级成了正式的标签，加入这种标签提高了html的语义。

这里还说到一个js代码插入的位置，以前一般习惯会在head标签内插入script，而建议的将code放到页面的靠后，也就是body的结束标签之前。因为浏览器解析html代码是从上到下的，如果把js代码放到前面，延缓了内容的加载。

主要只有三个对象，两挡板和球，对其使用

	{% highlight css %}
	position:absolute;
	{% endhighlight %}

布局，再通过
	
	{% highlight javascript linenos %}
	$("#xxx").css({"top": xx, "left": yy});
	{% endhighlight %}

来改变球的位置,基本上就是用元素的top和left这两个css属性来作为x,y坐标，对三个对象进行操作。基本操作的方法就是这样，接下来要让东西动起来了。

动起来就是让他们重复第进行位置改变，对于两挡板来说，位置的改变还需要按键的触发。设置一个interval，间隔为30ms，执行gameloop函数：

	{% highlight javascript linenos %}
	$(function(){ // set interval to call gameloop every 20 milliseconds 		pingpong.timer = setInterval(gameloop, 30); // mark down what key is down and up into an array called "pressedKeys" 
		$(document).keydown(function (e) { 
			pingpong.pressedKeys[e.which] = true; 
		}); 
		$(document).keyup(function (e) { 
			pingpong.pressedKeys[e.which] = false; 
		}); 
	}); 
	function gameloop() { 
		moveBall(); 
		movePaddles(); 
	}
	{% endhighlight %}

其中，movePaddles()通过上面的keyup()获取键值，触发paddle的移动，最后只需要加上球的位置判断函数，根据位置来改变运动方向了。实例中没有考虑板的两端和背部对球的反弹，这里一并用一个inFiled()函数判断球的位置再根据板来判定反弹方向，

	{% highlight javascript linenos %}
	function inField(p) { 
		var pXL = parseInt(p.css("left")); 
		var pXR = pXL + parseInt(p.css("width")); 
		var pYT = parseInt(p.css("top")); 
		var pYB = pYT + parseInt(p.css("height")); 
		var bX = pingpong.ball.x; 
		var bY = pingpong.ball.y; 
		var bD = pingpong.ball.d; 
		var fX = pingpong.ball.speed * pingpong.ball.directionX; 
		var fY = pingpong.ball.speed * pingpong.ball.directionY; 
		    // right field, return 1
	    if (bX >= pXR && bY + bD >= pYT && bY <= pYB) {
	        if (bX + fX <= pXR) {
	            if (bY + bD + fY >= pYT && bY + fY <= pYB) {
	                return 1;
	            }
	        }
	    }
	    // left field, return 2
	    if (bX + bD <= pXL && bY + bD >= pYT && bY <= pYB) {
	        if (bX + bD + fX >= pXL) {
	            if (bY + bD + fY >= pYT && bY + fY <= pYB) {
	                return 2;
	            }
	        }
	    }
	    // top field, return 3
	    if (bX + bD >= pXL && bX <= pXR && bY + bD <= pYT) {
	        if (bY + bD + fY >= pYT) {
	            if (bX + bD + fX >= pXL && bX + fX <= pXR) {
	                return 3;
	            }
	        }
	    }
	    // bottom field, return 4
	    if (bX + bD >= pXL && bX <= pXR && bY >= pYB) {
	        if (bY + fY >= pYT) {
	            if (bX + bD + fX >= pXL && bX + fX <= pXR) {
	                return 4;
	            }
	        }
	    }
	}
	{% endhighlight %}

另外，有个作者介绍的小技巧，就是在调试程序的时候可以用如下的Grid图来作为背景，方便坐标的测定和调整：

<a href="http://mmnn-wordpress.stor.sinaapp.com/uploads/2011/11/pixel_grid.jpg"><img class="size-medium wp-image-55" title="pixel_grid" src="http://mmnn-wordpress.stor.sinaapp.com/uploads/2011/11/pixel_grid-300x300.jpg" alt="pixel_grid" width="300" height="300" /></a>

还可以利用chrome的developer工具中的js console对js进行调试.