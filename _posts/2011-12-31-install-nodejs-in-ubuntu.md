---
layout: post

title: Ubuntu 11.04 Node.js 配置
---

实在是很折腾，冲着一个好的设计环境换回了windows7，但是感觉做开发的话还是linux下限值会比较小，于是用虚拟机，刚开始装回archlinux，发现vmware下装archlinux又是另外的折腾了，装不好gnome3，不能忍受难看的界面，另外也懒得折腾了，于是改装了ubuntu，10.10不太稳定，选择了10.04 lts。啥都不管了，直奔node的配置，找了篇国外的文章，一边操作一边翻译一下:

由于直奔node而去，之前什么都没有配置过，所以可以直接按照一下来满足node.js的alias：

	sudo apt-get install g++ curl libssl-dev apache2-utils

最简单的方法当然用git下载node的源码啦，先安装git

	sudo apt-get install git-core
	git clone git://github.com/joyent/node.git

我这里直接在官网上下载了包：

	tar -zxf node-v0.6.5.tar.gz
	cd node-v0.6.5
	./configure
	make
	sudo make install

接下来是npm，One Line Install

	curl http://npmjs.org/install.sh | sh

作者还给喜欢很多行安装方法的人提供了方法，遇到如权限问题等，具体可以到[npm官网](http://npmjs.org)上查看

OK啦，又开始nodejs啦