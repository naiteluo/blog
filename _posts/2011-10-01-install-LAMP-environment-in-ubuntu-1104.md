---
layout: post

title: Ubuntu 11.04 LAMP安装配置
---

11.04是lts的版本，以后用ubuntu的话可以作为首选，这里纪录一下LAMP的配置方法。

1.	首先是安装LAMP，一个命令：

		sudo apt-get install apache2 php5 libapache2-mod-php5 mysql-server libapache2-mod-auth-mysql php5-mysql phpmyadmin 

	期间会要求你输入mysql数据库的root用户密码，选择服务器类型［apache］，phpMyAdmin的密码等。

2.	装完之后重启一下apache，命令：

		sudo /etc/init.d/apache2 restart

3.	把安装的phpmyadmin 链接过来，在/var/www/下用命令：
	
		ln -s /usr/share/phpmyadmin phpmyadmin