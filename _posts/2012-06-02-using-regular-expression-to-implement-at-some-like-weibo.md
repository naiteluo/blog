---
layout: post
title: 用正则表达式检测微博中的at人
---
	
	var msg = "@reelin @naiteluo 哈哈，六一儿童节快乐";
	var list = msg.match(/ *@([\u4e00-\u9fa5A-Za-z0-9_]*) ?/g);
	var msg = msg.replace(/ *@([\u4e00-\u9fa5A-Za-z0-9_]*) ?/g, '<a href="#">$1</a>');