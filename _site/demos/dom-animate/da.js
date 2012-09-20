/**
 *  DOM动画方法扩展
 *  使用方法：
 *  document.getElementsByTagName('div')[0].hide(200);
 *  document.getElementsByTagName('div')[0].show(500);
 *  document.getElementsByTagName('div')[0].animate(300, 300, 500);
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
            // style的成员默认类型为String
            opacity = _getComputedStyle(element, 'opacity'),
            // 每次变化量
            m = 0.01,
            // 控制淡入淡出速度
            speed = (time) ? ((time < 100) ? 5 : (time / (opacity - 0) / m)) : 5;

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
                opacity = opacity - m;
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
            // style的成员默认类型为String
            opacity = _getComputedStyle(element, 'opacity'),
            // 每次变化量
            m = 0.01,
            // 控制淡入淡出速度
            speed = (time) ? ((time < 100) ? 5 : (time / (1 - opacity) / m)) : 5;

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
                opacity = opacity + m;
                element.style.opacity = opacity;
                element.animateTimer = setTimeout(step, speed);
            }       
        }

        step();

        return this;
    };

    Element.prototype.animate = function (width, height, time) {
        var element = this,
            currentWidth = _getComputedStyle(element, 'width'),
            currentHeight = _getComputedStyle(element, 'height'),
            maxRange = currentWidth > currentHeight ? currentWidth : currentHeight,
            m = 1,
            speed = (time) ? ((time < 100) ? 5 : (time / maxRange / m)) : 5;

        element.stop();

        function step() {
            if (currentWidth === width && currentHeight === height) {
                console.log('Animate finished!');
                return;
            } else {
                if (currentWidth !== width) {
                    currentWidth = currentWidth + (width > currentWidth ? m : -m);
                    element.style.width = currentWidth + 'px';
                }
                if (currentHeight !== height) {
                    currentHeight = currentHeight + (height > currentHeight ? m : -m);
                    element.style.height = currentHeight + 'px';
                }
                element.animateTimer = setTimeout(step, speed);
            }
        }

        step();

        return this;
    }

    // 中止淡入淡出
    Element.prototype.stop = function () {
        var element = this;
        if (element.animateTimer) {
            clearTimeout(element.animateTimer);
            console.log('Fade in or out terminated!');
        }
        return this;
    }

    function _getComputedStyle(element, property) {
        return parseInt(window.getComputedStyle(element, null)[property]);
    }

}(document));



