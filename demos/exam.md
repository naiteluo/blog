---
layout: demo

---

# BaoBao Duai's EXAM

[返回首页](/) ｜｜
[第一题](#exam1) ｜ 
[第二题](#exam2) ｜
[第三题](#exam3) ｜
[第四题](#exam4) ｜
[第五题](#exam5) ｜
[第六题](#exam6) ｜
[第七题](#exam7) ｜
[第八题](#exam8) ｜
[第九题](#exam9) ｜｜新增：
[第十题](#exam10)｜
[第十一题](#exam11)｜


---

1.	<span id="exam1"></span>实现`walkTheDom`函数，接受两个参数，一个是根节点，另一个是回调函数。结构如下：

		function walkTheDom(root, callback) {
			// todo
		};
		
	callback接受一个参数，就是当前遍历到的节点。walkTheDom的功能是，遍历所给根结点及其所有子树节点，对每个遍历到的节点都执行callback回调函数。使用示例：
	
		walkTheDom(document.getElementById('wrapper'), function (element) {
			element.style.backgroundColor = 'green';
		});
		
	该示例使用walkTheDom方法遍历id为wrapper的节点和它的所有子节点，将所有节点的背景色变成绿色。
	
	知识点总结：
	
	*	children v.s. childNodes
	*	firstChild, nextSibling, previousSibling
	*	函数作为参数
	*	怎么判断
	
	答案：
	
		function walkTheDom(root, callback) {
			var children = root.children;
			var length = children.length;
			
			callback(root);
			
			if (length === 0) {
				return;
			} else {
				for (var i = 0; i < length; i++) {
					walkTheDom(children[i], callback);
				}
			}
		}

2.	<span id="exam2"></span>解密：

	`var code = "l,m,t,h,.,f,d,s,a,j,k,l,f,d,a,8,9,3,2,1,l,k,k,j,s,a,/,t,e,n,.,o,u,l,e,t,i,a,n,/,/,:,p,t,t,h"`
	
	code是一个经过加密的秘密网址，用JavaScript进行解密吧！
	
	提示：用到String和Array的操作
	
	答案：
	
		code.split(',').reverse().join('');

3.	<span id="exam3"></span>实现`getSecondToZero`函数，返回距离当天凌晨的毫秒数：

		function getSecondToZero() {
			// todo
		}
		
	提示: `+new Date`可以很简单地获取到此刻的毫秒数。		
4.	<span id="exam4"></span>以下是对Element对象的扩展，理解代码并在问号处添加注释：

		/**
		 *  淡出淡入
		 */

		(function (d) {
		
		    // ?? 
		    if (d.hide || d.show) {
		        throw new Error('methods already exist');
		    }
		
		    Element.prototype.hide = function (time) {
		        var element = this,
		            speed = (time) ? ((time < 100) ? 5 : (time / 100)) : 5,
		            // ??
		            opacity = (+element.style.opacity) || 1;
		
		        // ??
		        if (element.animateTimer) {
		            clearTimeout(element.animateTimer);
		        }
		
		        // 递归函数
		        function step() {
		            if (opacity <= 0) {
		                opacity = 0;
		                element.style.opacity = opacity;
		                element.style.display = 'none';
		                return;
		            } else {
		                opacity = opacity - 0.01;
		                element.style.opacity = opacity;
		                element.animateTimer = setTimeout(step, speed);
		            }   
		        }
		
		        // 开始执行
		        step();
		
		        // 链式调用
		        return this;
		    };
		
		    Element.prototype.show = function (time) {
		        var element = this,
		            speed = (time) ? ((time < 100) ? 5 : (time / 100)) : 5,
		            opacity = (+element.style.opacity) || 0;
		
		        element.style.display = 'block';
		
		        // 清除正在进行的动画
		        if (element.animateTimer) {
		            clearTimeout(element.animateTimer);
		        }
		
		        function step() {
		            if (opacity >= 1) {
		                opacity = 1;
		                element.style.opacity = opacity;
		                return;
		            } else {
		                opacity = opacity + 0.01;
		                element.style.opacity = opacity;
		                element.animateTimer = setTimeout(step, speed);
		            }       
		        }
		
		        step();
		
		        return this;
		    };
		
		}(document));
		
	注释版：
		
		/**
		 *  淡出淡入
		 *  使用方法：
		 *  document.getElementsByTagName(body)[0].hide(200);
		 *  document.getElementsByTagName(body)[0].show(500);
		 */
		
		(function (d) {
		
		    // 避免命名冲突
		    if (d.hide || d.show || d.stop) {
		        throw new Error('methods already exist');
		    }
		
		    // 添加方法到Element的原型
		    Element.prototype.hide = function (time) {
		        // 初始化
		        var element = this,
		            // 控制淡入淡出速度
		            speed = (time) ? ((time < 100) ? 5 : (time / 100)) : 5,
		            // style的成员默认类型为String
		            opacity = (+element.style.opacity) || 1;
		
		        // 清除正在进行的动画
		        element.stop();
		
		        // 递归函数
		        function step() {
		            if (opacity <= 0) {
		                opacity = 0;
		                element.style.opacity = opacity;
		                element.style.display = 'none';
		                console.log('Fade out finished!');
		                return;
		            } else {
		                opacity = opacity - 0.01;
		                element.style.opacity = opacity;
		                element.animateTimer = setTimeout(step, speed);
		            }   
		        }
		
		        // 开始执行
		        step();
		
		        // 允许链式调用
		        return this;
		    };
		
		    Element.prototype.show = function (time) {
		        var element = this,
		            speed = (time) ? ((time < 100) ? 5 : (time / 100)) : 5,
		            opacity = (+element.style.opacity) || 0;
		
		        element.style.display = 'block';
		
		        // 清除正在进行的动画
		        element.stop();
		        
		        function step() {
		            if (opacity >= 1) {
		                opacity = 1;
		                element.style.opacity = opacity;
		                console.log('Fade in finished!');
		                return;
		            } else {
		                opacity = opacity + 0.01;
		                element.style.opacity = opacity;
		                element.animateTimer = setTimeout(step, speed);
		            }       
		        }
		
		        step();
		
		        return this;
		    };
		
		    // 中止淡入淡出
		    Element.prototype.stop = function () {
		        var element = this;
		        if (element.animateTimer) {
		            clearTimeout(element.animateTimer);
		            console.log('Fade in or out terminated!');
		        }
		        return this;
		    }
		
		}(document));


5.	<span id="exam5"></span>参照题目4中的`hide`和`show`，在上面的必包函数中新增一个`animate`方法，对调用对象进行变形。

		Element.prototype.animate = function (width, height, time) {
			// todo: blablabla
			
			return this;
		}


6.	<span id="exam6"></span>JavaScript中将对象值赋给一个变量并不会复制这个对象，而是让变量指向同一个对象。写一个`copy`方法，完成对象的拷贝：

		function copy(obj) {
			// todo
			return newObj;
		}
		
		// 使用方法：
		var a = {name: 'aaa', age: 13};
		var b = copy(a);
		

7.	<span id="exam7"></span>列出所有假值。
8.	<span id="exam8"></span>简述`null`与`undefined`的区别。
9.	<span id="exam9"></span>部分浏览器是不支持`getElementsByClassName`方法的，扩展Element，新增一个`myGetElementsByClassName`方法，以供跨浏览器使用

		Element.prototype.myGetElementsByClassName = function (className) {
			var result = [];
			// todo
			return result;
		}
		
	方法的使用方法和原生方法一样，如`document.getElementById('wrapper').myGetElementsByClassName('box');`将返回wrapper元素内的所有类名为box的节点。
10.	<span id="exam10"></span>实现`getRandomBetween`方法，方法有三个参数，返回大小在参数1，参数2之间的随机数，第三个参数为可选波尔值参数，当为true的时候，返回值不需要取整，当没有该参数或赋值false时，返回值要取整。

		function getRandomBetween(from, to, flag) {
			// todo
			return num;
		}
		
11.	<span id="exam11"></span>下载附件中的.html文件，按要求完成页面功能。 [右键另存为](/demos/attachment/ex11.html)
12.	<span id="exam11"></span>使用jQuery实现上题。

---

> ** 加油！加油！！加油！！！ **