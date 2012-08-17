---
layout: default

title: archlinux简单网络配置与命令
---

这里只是给出简单的网络配置和常用命令，备忘。详细的可查阅官方wiki上的：
Configuring Network

首先是/etc/rc.conf的配置，动态获取ip的只需要选择一个接口：

	interface="eth0"
	address=
	netmask=
	gateway=

想要自定义dns，在/etc/dhcpcd.conf

	nohook resolv.conf

并将自己的dns服务器加入/etc/resolv.conf中。

	/*
	 * 静态ip的还不太了解，
	 * 挖个坑以后再填。
	 */

重启nerwork daemon，启用配置:

	# /etc/rc.d/network restart

通过ping看是否已成功连接

	$ ping -c 3 www.google.com
	
手动连接或断开网络接口：

	# ip link set  up/down
	
接下来是无线网络设置与连接，需要先安装wireless_tools和取得哦给相关软件包madwifi:

	# pacman -S wireless_tools
	# pacman -S madwifi
	
确定接口和相应模块

	# lspci | grep -i net
	
确定此模块已经被载入。使用命令

	# lsmod | grep 

接下来可以开始连接了，确定驱动已经创建了可用的接口(wlanX, ethX, athX):

	# iwconfig

启用无线接口:

	# ip link set wlan0 up
	
搜索可用的接入点

	# iwlist wlan0 scan
	
以下是几种不同的wifi的接入：

*	No encryption 无加密的

		# iwconfig wlan0 essid "MyEssid"

*	WEP

		# #hecadecimal key
		# iwconfig wlan0 essid "MyEssid" key 1234567890
		# #ASCII key
		# iwconfig wlan0 essid "MyEssid" key s:asciikey
				
确定是否连接到接入点：

	# iwconfig wlan0
	
动态分配IP

	# dhcpcd wlan0
	
当然，最简单的还是用网络管理器如：Wicd,NetworkManager.不过我在连接校园网的wifi时用networkmanager未果，故推荐wicd。