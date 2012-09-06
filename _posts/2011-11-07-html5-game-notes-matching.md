---
layout: post

title: html5游戏笔记 matching game
---

我也不知道这个游戏的中文名叫什么，就是12张扑克，翻开两张如果不是一对就自动翻回来，一对的话就可以取走，最后所有牌都取走了游戏就结束。貌似挺无聊的游戏，不过不得不自愧设计功力之低，树上简单的几个css和几个图片，整个页面就变得很有质感和层次感。游戏主要通过CSS3来实现翻转，用javascript来改变DOM的类和整个游戏的逻辑。我觉得最主要吸收的精华是：用CSS3来实现页面元素的动画（效率是不是比cavans高？ 迟点再验证），用javascript控制逻辑。

## CSS3实现元素动画 ##

首先来看看CSS3的新的动画animation相关属性。 一开始还有点模糊，因为英文书上用了tween这个单词，查了一下单词的含义并仔细分析以下代码后，得知这动画的实现是利用transition属性来为transform属性的转化增加补间动画。有点绕，意思就是，本来transform属性的变化的是一个状态，是没有过程的，例如从一个位置translate到另一个位置，从一个角度rotate到另一个角度，一个跳跃式的变化。而transition的作用就是让这一切变得不那么突然，先看看CSS3 transition的W3C的解释

> CSS transition allows property changes in CSS values to occur smoothly over a specified duration.

transition属性将瞬间的变化减慢，并附加指定的动画，它的用法如下：
	
	{% highlight css %}		
	/*
	 * 值：应用属性名，可设为all，
	 *     设置动画
	 *     补间时长
	 *     动画开始的延时
	 */
	transition: property_name duration timing_function delay;
	/* 为所有变化都附加时长为1s的线性补间动画 */
	transition: all 1s linear;
	/* 为透明化增加0.3s的补间动画，并为背景颜色变化增加0.5s的补间动画 */
	transition: opacity 0.3s, background-color o.5s;
	{% endhighlight %}
	
transition属性的介绍大概到这里，附送一些参考链接：


接着看看transform的用法，可能会跟以前接触到的CSS属性比较不一样，它所接受的值是函数：
	
	{% highlight css %}		
	transform: transform-function1 transform-function2;
	/* 移动到(150px,150px)的位置上，并上下翻转180度 */
	transform: translate(150px,150px) rotate3d(1,0,0,180deg);
	{% endhighlight %}
		
主要有2D和3D两种函数，3D与2D的基本相似，增加了Z轴。所以这里只简单介绍3D transfroms functions：

旋转函数,其中的[x, y, z]是一个单位向量：

	{% highlight css %}						
	rotate3d(x, y, z, angle)
	/* equals to */
	rotateX(angle)
	rotateY(angle)
	rotateZ(angle)
	{% endhighlight %}		
				
移动函数，其中(tx, ty, tz)为空间坐标值：
	
	{% highlight css %}	
	translate3d(tx, ty, tz)
	/* equals to */
	translateX(tx)
	translateY(ty)
	translateZ(tz)
	{% endhighlight %}
		
缩放函数：
		
	{% highlight css %}				
	scale3d(sx, sy, sz)
	/* equals to */
	scaleX(sx)
	scaleY(sy)
	scaleZ(sz)
	{% endhighlight %}
				
综上，就可以总结一下大概要设置哪些css类了

	{% highlight css %}		
	.card {
		/* 卡牌的类，设置定位，设置所有动画0.3秒的补间 */
	}
	.face {
		/* 设置卡牌牌面的需要补间的动哈：透明度，变形，盒阴影，补间0.3秒 */
	}
	.front {
		/* 牌的正面的背景图，z-index高于.back */
	}
	.back {
		/* 牌底背景图，未设置background-position，
		 * 后面会使用css spirit
		 */
	}
	.card:hover .face, .card-flipped .face {
		/* 设置盒阴影 */
	}
	.card-flipped .front {
		/* 旋转变换，设置z-index小于.back */
	}
	.card-flipped .front {
		/* 旋转变换 */
	}
	.card-removed {
		/* 设置淡去效果，并用于作为删除元素的标记 */
	}
	
	/* cards' css sprite */
	.cardXX { background-position: xpx ypx ;}
	{% endhighlight %}
		
CSS3实现动画的部分好像讲得太多了，不过那是比较陌生的东西，所以看得比较细置，接下来简单记录以下游戏的逻辑：

洗牌发牌，随机排列预定义的数组，并复制.card元素，通过根据index来作绝对定位，增加css类改变牌底背景坐标，用attr函数给我们自定义的data-pattern属性赋值，用于辨别牌型。最后给每张牌都绑定一个oncli，触发selecCard函数,selectCard先判断现在翻开的牌数：

	{% highlight javascript linenos %}		
	// flip the card and schedule the checking function
	function selectCard() {
		// we do nothing if there are already two card flipped
		if ($(".card-flipped").size() > 1) {
			return;
		}
		$(this).addClass("card-flipped");
		// check the pattern of both flipped card 0.7s later
		if ($(".card-flipped").size() == 2) {
			setTimeout(checkPattern, 300);
		}
	}
	{% endhighlight %}
	
对牌进行匹配判断，获取已翻开牌的data-pattern属性值来比较，同样的牌则对牌增加.card-removed作为标记，并在变换的补间动画后删除这两个标置了的牌；不匹配的话就将.card-filpped去掉.

逻辑比较简单，不详细说了。