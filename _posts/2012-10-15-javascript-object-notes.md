---
layout: post
title: JavaScript Object reading notes
published: false
categories: [javascript]
tags: JavaScript
preview: Notes about Object in JavaScript, from <JavaScript the definitive guide>

---

## 知识点

*   JavaScript对象是动态的，属性可以任意添加删除。
*   在JavaScript中所有不是`string`,`number`,`true`,`false`,`null`和`undefined`的值都是对象。
*   赋值操作中是引用传递而不是值传递。
*   属性包括名和值，属性名可以是任意的字符串，包括空字符，但不能有同名的属性。

## 创建对象

*   三种方法：对象字面量，`new`操作符，（在ECMAScipt中的）`Object.create()`方法。
*   对象字面量属性名在ECMASCript 3中保留字必须用引号括起，5 中则不要求。在ECMAScript 5中最后一个属性后面的引号是会忽略掉的，ECMAScript 3的大部分实现也会将其忽略，但是在IE中则会报错。

## `prototype`

*   用对象字面量创建的对象的`prototype`都是`Object.prototype`
*   用`new`创建的对象的`prototype`值则是构造器函数的`prototype`
*   `Object.prototype`是少有的没有原型的对象。其他内建的构造器函数的`prototype`都继承自`Object.prototype`，例如`Date.prototype.prototype`是`Object.prototype`
*   上述的链式原型对象则称为原型链

## `Object.create()`

*   返回一个新对象，第一个参数是对象的`prototype`，第二个可选参数是对象的属性描述
*   `Object.create(Object.prototype)`等效于`{}`或`new Object()`
*   `inherit`函数，创建一个集成某个`prototype`的新对象

        /**
         * 创建一个继承原型p的新对象
         */
        function inherit(p) {
            if (p == null) {
                throw new TypeError();
            }
            if (Object.create) {
                return Object.create(p);
            }
            var type = typeof p;
            if (p !== 'object' || p !== 'function') {
                throw new TypeError();
            }
            function f() {};        // 创建一个空函数作为构造器
            f.prototype = p;        // 将其原型设为p
            return new f();         // 创建新对象并返回，新对象的原型即为p
        }

*   `inherit`函数的一个用途是用来保护对象，在若要传递对象而不想原对象被改变，则可以将对象作为`prototype`传递，例如：

        var o = { x: "value don't wanna be changed." };
        some_function(inherit(o));  // 传递值又保证o不会被修改

## 查询和设置属性值

如下

    var author = book.author;
    var name = book[name];
    var attrName = 'title';
    var title = book[attrName];

*   对象属性的查询会一只顺着原型链进行，一直到属性被找到或者到达为`null`的原型。
*   