---
layout: post

title: high performance JavaScript notes 3
---

## Chapter 6 Responsive Interfaces 快速响应的用户界面

JavaScript 和用户界面更新在同一个进程中运行，一次只能处理一件事情。当JavaScript在运行时，用户界面处于“锁定”状态，不能响应输入。

任何JavaScript任务都不应当执行超过100毫秒。过长的运行时间会导致UI更新出现明显的延迟，从而对用户体验产生负面影响。

定時器可用來安排代碼延遲執行，使得你可以把長時間運行腳本分解成一系列的小任務，見以下gist，我們可以將複雜任務拆分成若干個原子任務，把原子任務放在定時器中調用：

<script src="https://gist.github.com/3549691.js?file=multiStep.js"></script>

第二個封裝的方法，加入了簡單的時間監測機制，使得每個定時期可以處理多個任務，避免把任務分解得過於零碎。

Web Workders是新版瀏覽器支持的特性，它允許你在UI線程外部執行JavaScript代碼，從而避免鎖定UI。（稍後會補上實例與代碼）

總而言之，沒有什麼JavaScript代碼會重要到可以影響用戶體驗的程度。