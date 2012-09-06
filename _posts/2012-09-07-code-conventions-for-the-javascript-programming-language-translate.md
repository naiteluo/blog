---
layout: post

title: Code Conventions for the JavaScript Programming Language
---

> 本文翻譯自Douglas Crockford老先生的《[Code Conventions for the JavaScript Programming Language](http://javascript.crockford.com/code.html)》，規範具有參考價值，但是不是真理，要經過自己的思考和理解，形成適合自己或團隊的編碼規範。文中若是以塊引用標誌的地方，則是我自己的理解和說明。如有任何翻譯不當或理解錯誤的地方，歡迎指正，謝謝。

這是一系列使用JavaScript編程的習慣和規則。它的靈感從Sun的[ Code Conventions for the Java Programming Language](http://)而來。因為JavaScript不是Java， 所以其中很大的部分作出了改動。

一個軟件對一個組織的長遠價值，與代碼庫的質量成正比。在一個程序的一生中，會被很多人修改和閱讀。如果程序能夠清晰地表達它的結構和特性，那它在不遠的未來中發生錯誤的可能性就會更小。

編程習慣可以幫助提高程序的健壯性。

我們所有的JavaScript代碼都是直接發佈的。它應該具備發佈的質量*。

Neatness counts.

## JavaScript文件

JavaScript程序應該存儲為`.js`文件，並通過`.js`文件傳輸。

JavaScript最好不要內嵌在HTML文件中，除非該代碼是專門針對一個單獨的會話的。HTML中的js代碼會明顯地增加頁面的大小，這些增加的部分是無法通過緩存和壓縮HTML文件來減輕。

`<script src="filename.js">`標籤應該盡可能地放在body的尾部。這樣減少因加載腳本而引起的頁面其他部分加載的延遲。不需要在標簽中使用language或者type屬性。MIME類型是由服務器決定的，而不是標簽本身。

## 縮進

縮進的單位是4個空格。避免使用tab。因為至今依然沒有tabstop放置的標準（本文在21世紀撰寫）。使用空格會增加文件的大小，但是這些增加對本地網絡來說不明顯，而且可以通過minification來減輕影響。

## 行的長度

避免一行超過80個字符。當一個語句一行寫不下的時候，就有必要折行。把換行位置放到一個操作符後面，最理想的情況是逗號後面*。在操作符後面的換行減少了復制粘貼帶來的錯誤被自動插入分號所掩蓋的可能性。下一行應該要縮進8個空格。

> 關於這裡的80個字符其實有個有趣的來源。1801年開始，計算機普遍使用打孔卡來作為處理媒介，後來打孔卡的標準行數是80行，這也是說打孔卡一次可以紀錄的字符是80個。這個尺寸限制至今仍在許多地方被使用。例如這裡。

## 註釋

大方地使用註釋。留下信息以便供需要理解你做了什麼的人（很可能是你自己）閱讀。註釋要寫的認真明了，就跟它所注解的代碼一樣。加入適度的幽默會有益於你的註釋，挫折和不滿的情緒則反之。

保持註釋是最新的十分重要。有錯誤的註釋會使程序更難閱讀和理解。

註釋要有意義。集中於不能立刻顯現的問題。不要讓讀者的時間浪費在類似這樣的東西上：

	i ＝ 0; // Set i to zero.

一般使用行註釋。塊註釋用於正式文檔和註釋掉代碼。

## 變量聲明

所有變量都要在使用前被聲明。JavaScript沒有要求要這樣，但是這樣做可以使得程序更易讀，而且可以更容易監查到未被聲明的變量不小心被聲明成全局變量。永遠也不要使用隱含的全局變量。

`var`聲明應該放在function主體的前面。

最好每個變量都在單獨的一行內聲明和註釋，並按字典序排列。

	var currentEntry;	// currenty selectd table entry
	var level; 			// indentation level
	var size; 			// size of table
	
JavaScript沒有塊作用域，所以在塊內聲明變量會讓其他習慣C家族語言的程序員產生困惑。所以應該在函數體的頂部就聲明好所有變量。

減少使用全局變量。並永遠不要使用隱含的全局變量。

## 函數聲明

所有的函數都應該在被使用前聲明。 內部函數要在var聲明之後聲明。這使變量的作用域更易理解。

函數名和參數列表的左括號之間應該沒有空格，又括號和函數聲明主體的左大括號間要留一個空格。主體本身要縮進4個空格。右大括號與包含函數聲明的那一行對齊。

	function outer(c, d) {
		var e = c * d;
		
		function inner(a, b) {
			return (e * a) + b;
		}
		
		return inner(0, 1);
	}
	
這個習慣在JavaScript中表現很好，因為在JavaScript中，函數和對象的字面量可以放在任何允許使用表達式的地方。這樣的習慣提高了行內的函數和複雜的結構的可讀性。

	function getElementsByClassName(className) {
		var results = [];
		walkTheDom(document.body, function (node) {
			var a;						// array of class names
			var cn = node.className; 	// the node's classname
			var i;						// loop counter
			
			if (cn) {
				a = c.split(' ');
				for (i = 0; i < a.length; i += 1) {
					if (a[i] === className) {
						results.push(node);
						break;
					}
				}
			}	
		});
		return results;
	}
	
如果一個函數字面量使匿名的，那關鍵字`function`和左括號間應該要加一個空格，避免引起函數名是function的誤會。

	div.onclick = function (e) {
		return false;
	};
	
	that = {
		method: function () {
			return this.datum;
		},
		datum: 0
	};
	
減少使用全局函數。

當一個函數在聲明後立即執行，整個調用表達式應該被包在一對括號中。這樣就清晰地表明獲取到的值是函數的返回值，而不是函數本身。

	var collection = (function () {
		var keys = [], values = [];
		
		return {
			get: function (key) {
				var at = keys.indexOf(key);
				if (at >= 0) {
					return values[at];
				}
			},
			set: function (key, value) {
				var at = keys.indexOf(key);
				if (at < 0) {
					at = keys.length;
				}
				keys[at] = key;
				values[at] = value;
			},
			remove: function (key) {
				var at = keys.indexOf(key);
				if (at >= 0) {
					keys.splice(at, 1);
					values.splice(at, 1);
				}
			}
		};
	}());
	
## 命名

命名應由26個大寫和26個小寫字母(A..Z,a..z)，10個數字(0..9)，和下劃線`_`組成。避免使用國際的字符，因為它們可讀性沒那麼強而且可能不是所有地方都能理解。在命名中不要使用`$`美元符和`\`右下斜線。

命名不要以下劃線開頭。有時下劃線開頭被用來表明變量是私有的，但是它本身並不提供這樣的功能。如果私有十分重要，則使用能提供私有成員的形式。避免表明能力不足的習慣。

大部分變量與函數應該以小寫字母開頭。

要與`new`操作符一起使用的構造器函數應該以大寫字母開頭。如果new是必要的，但是被遺漏了，JavaScript是不會發出編譯時警告和運行時警告的。這時如果沒有使用new的話，可能會引發問題，所以首字母大寫的習慣（是提醒我們真確使用構造器）的僅有的一道防線。

全局變量應該全部大寫表示。（JavaScript中沒有宏和常量，所以使用大寫來表示一一個JavaScript中沒有的特性其實沒有多大的意義。）

## 語句

### 簡單語句

每一行都應該至少包含一個語句。在每一個簡單語句後要以分號`;`結束。一個給變量賦函數字面量或者對象字面量的賦值語句也是一個賦值語句，也要以分號結束。

JavaScript允許把任何表達式當作一個語句。這會掩蓋了一些錯誤，特別是在存在分號插入的情況下。所以能用作語句的只能是賦值和調用。

### 複合語句

複合語句是包含用大括號`{ }`括起多個語句的語句

*	閉合的語句應該多縮進4個空格
*	左大括號應該在複合語句開始行的結尾
*	右大括號應該在一行的開頭，並且縮進要與複合語句包括了左大括號的開始行對齊
*	當語句是控制結構（如`if`和`for`語句）的一部分時，不管是包括多條或者一條語句，都要用大括號括起來。這樣更容易添加新語句，且不會無意中引入bug

### 標簽

語句標簽是可選的。只有這些語句需要標記：`while`, `do`, `for`, `switch`.

### `return`語句

有返回值的return語句中返回值不需要被括號括住，返回值表達式要跟關鍵字`return`在同一行開始，以免分號插入帶來的錯誤。

> 一個因分號插入產生的錯誤:

	(function () {
	    var a = 'hello';
	    return 
	    {
	        word: a
	    };
	}());
	
	// 相當於
	
	(function () {
	    var a = 'hello';
	    return;
	    {
	        word: a
	    };
	}());
	
	// 結果返回值為undefined

### `if`語句

if類的語句應該按照以下格式：

	if (條件) {
		語句
	}
	
	if (條件) {
		語句
	} else {
		語句
	}
	
	if (條件1) {
		語句
	} else if (條件2) {
		語句
	} else {
		語句
	}

### `for`語句

for類的語句應該按照以下格式：

	for (賦初值; 條件; 更新值) {
		語句
	}
	
	for (變量 in 對象) {
		if (過濾器) {
			語句
		}
	}
	
第一種形式用在數組或者有已知相關參數的循環迭代中。

第二種應該用於對象。要注意的是，有一些添加在對象原型(prototype)中的成員也會被枚舉。有必要主動地用`hasOwnProperty`方法去區分枚舉的是不是對象真正成員：

	for (variable in object) {
		if (object.hasOwnProperty(variable)) {
			statements
		}
	}
	
### `while`語句

while語句應該按照以下格式：

	while (條件) {
		語句
	}
	
### `do`語句

do語句應該按照以下格式：

	do {
		語句
	} while (條件);
	
跟其他複合語句不一樣，do語句一定要以分號結尾。


### `switch`語句

switch語句應該按照以下格式：

	switch (表達式) {
	case 表達式:
		語句
	default:
		語句
	}

每個`case`都要與`switch`對齊。這避免了過度縮進。

每組語句（除了`default`中的）都要以`break`, `return`或`throw`結尾，否則它會一直往下執行。

### `try`語句

try類語句應該按照以下格式：

	try {
		語句
	} catch (變量) {
		語句
	}
	
	try {
		語句
	} catch (變量) {
		語句
	} finally {
		語句
	}

### `continue`語句

避免使用continue語句。它往往掩蓋了函數的控制流。


### `with`語句

不應該使用with語句。

### 空格

空行可以分開邏輯上關聯的代碼塊，提高代碼的可讀性。

空格要在以下的情況使用：

*	關鍵字與緊隨的左括號之間應該要加一個空格。

		while (true) {
		
*	函數值和左括號間不要加空格。這樣幫助區分關鍵字和函數調用。
*	所有二元操作符，除了`.`, `(` 和`[`，要用空格把兩個操作數都分開。
*	一元操作符和它的操作數之間不應該加空格，除了像`typeof`這種一個詞語式的
*	for語句中的控制部分里的分號後面都要加一個空格。
*	所有的逗號後面都要跟一個空格。	

## 額外建議

### `{}`和`[]`

用`{}`代替`new Object()`，用`[]`代替`new Array()`。

當成員的命名是有序的整數，則用數組。當成員的命名是抽象的字符串或名字，則用對象。

### `,`操作符號

除了很有按規定地使用在for語句的控制部分中，其他地方都避免使用逗號操作符。（這不適用於作為分離符號的逗號，例如對象字面量，數組字面量，var語句，和參數列表。）

### 塊作用域

在JavaScript中塊不存在作用域。只有函數具有作用域。除了複合語句所需外，不要使用塊。

### 賦值表達式

避免在`if`和`while`的條件中使用賦值。

例如

	if (a = b) {
	
上面的是不是一個正確的語句呢？它是不是想要表達

	if (a == b) {
	
避免使用這種容易產生誤解的結構。

### `===`和`!==`操作符

幾乎所有情況下，使用`===`和`!==`比使用`==`和`!=`好。`==`和`!=`會進行類型轉換。尤其不能使用`==`去比較假值。

### 難以理解的加或減

要注意不能在`+`後面緊跟`+`或者`++`。這種形式會讓人難以理解。加上括號，讓你的意圖更清晰。

	total = subtotal + +myInput.value;
	
最好寫成下面的形式：

	total = subtotal + (+myInput.value);

這樣`+ +`就不會被看成`++`了。

### `eval`是邪惡的

`eval`是最常被誤用的JavaScript特性。避免使用它。

`eval`有別名。例如不要使用`Function`構造器。不要傳字符串給`setTimeout`和`setInterval`。






