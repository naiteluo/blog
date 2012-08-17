---
layout: default

title: Archlinux 安装配置问题
---

已经重装了6、7 archlinux了，每次都因为一些琐碎的问题无法解决而选择重装，这次静下心来读wiki，看帖子，总算把之前积累的问题大概都解决了。

用的默认的network进行网络管理，开机启动特别慢，而且gnome启动后的networkmanager因为冲突而disabled。networkmanager是一个DAEMON,可以手动用/etc/rc.d/networkmanager start来启动它，更好地是将其加入/etc/rc.conf的DAEMON列表中，并将原来的network用’!'感叹号取消掉，即可。安装network-manager-applet后就能在gnome里显示图标方便使用。

此后发现了一个很严重的问题，nerworkmanager连不上校园网，网上也很多说wifi无法连接的文章，与其自己修改到崩溃，不如早点换一个，就试用了wicd，目前尚且完美。安装：
	
	# pacman -S wicd
	# pacman -S wicd-gtk

开启前必须关闭所有网络的daemons,

	# rc.d stop network
	# rc.d stop dhcpcd
	# rc.d stop networkmanager

设置DAEMONS，依赖dbus，前面禁用其他网络管理软件：

	# vim /etc/rc.conf
	DAEMONS=(syslog-ng dbus !network !dhcdbd !networkmanager wicd ...)
	~
	~

后续工作咯

ibus1.4安装完后无法显示输入法，google之网友们说是一个bug，修复方法如下：

	sudo pacman -S abs
	sudo abs community/ibus-sunpinyin
	mkdir ~/abs
	cp -r /var/abs/community/ibus-sunpinyin ~/abs
	cd ~/abs/ibus-sunpinyin
	makepkg -s
	sudo pacman -U ibus-sunpinyin-2.0.3-1-*.pkg.tar.xz

并在~/.profile文件中加入以下代码让其自启动：

	export GTK_IM_MODULE=ibus
	export XMODIFIERS=@im=ibus
	export QT_IM_MODULE=ibus
	ibus-daemon -d -x

