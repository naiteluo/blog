(function (d) {
    // items 为HTML集合，是包含了HTML节点引用的类数组对象；
    // 它并不是真正的数组，但提供了一个类似数组的length属性；
    // HTML集合是实时存在的，每次dom信息更新，该集合也会连同更新；
    var list = d.getElementById('items'),
        items = list.getElementsByTagName('li'),
        itemName = d.getElementById('item_name'),
        btnAdd = d.getElementById('add'),
        btnDel = d.getElementById('del'),
        btnDelAll = d.getElementById('del_all');

    // 返回一个item元素
    function createItem(itemName) {
        var item = d.createElement('li');
        item.appendChild(d.createTextNode(itemName || 'no name'));
        // 每创建一个item元素都对它的onclick事件进行绑定
        item.onclick = clickHandler;
        return item;
    }

    // item 点击事件
    function clickHandler(e) {
        toggleSelected(this);
    }

    // 选择与未选择状态切换
    function toggleSelected(item) {
        if (item.className.indexOf('selected') === -1) {
            item.className += ' selected';
        } else {
            item.className = item.className.replace('selected', '');
        }
    }

    // “添加item”事件
    btnAdd.onclick = function (e) {
        var name = itemName.value;
        if (name) {
            list.appendChild(createItem(name));
            itemName.value = '';
        } else {
            alert('item名不能为空！');
        }
    }

    // “删除item”事件
    btnDel.onclick = function (e) {
        for(var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            if(item.className.indexOf('selected') !== -1) {
                list.removeChild(item);
                // html集合是实时的，所以删除元素之后整个items也会一同更新
                // 这时length值会变化，元素的index也会变化
                // 要注意改变dom结构对html集合的影响，特别是在枚举中
                i--;
                len--;
            }
        }
    }

    // “删除全部item”事件
    btnDelAll.onclick = function (e) {
        for(var i = 0, len = items.length; i < len; i++) {
            // 要注意改变dom结构对html集合的影响，特别是在枚举中
            list.removeChild(items[i]);
            i--;
            len--;
        }
    }

    // 页面初始就有的item也要进行事件绑定
    for(var i = 0, len = items.length; i < len; i++) {
        var item = items[i];
        item.onclick = clickHandler;
    }

}(document));