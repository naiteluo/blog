(function (global) {

    /**
     *  Ajax操作对象
     */
    var ajax = {

        /**
         *  GET
         *
         *  使用方法：
         *
         *  ajax.get(url, function (data) {
         *      // 回调函数，data为请求返回的内容
         *  });
         *
         *  第二个参数为可选的params：
         *
         *  ajax.get(url, {page: 1}, function (data) {
         *      // 回调函数，data为请求返回的内容
         *  });
         *
         *  相当于发出一个url + '?page=1'这样的get请求
         *
         **/
        get: function () {
            var url,
                params, 
                callback;

            // todo: 判断参数个数

            if (params) {
                url += '?';
                for (var key in params) {
                    url += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }
            }


            var xhr = ajax.createXHR();
            
            // todo: 发送、处理请求            
        },

        /**
         *  POST
         *
         *  暂不要求
         */
        post: function () {

        },

        /**
         *  其他方法......
         */

        /**
         *  返回一个XHR对象；多浏览器兼容
         */
        createXHR: function () {
            // todo: 创建XHR对象，注意浏览器兼容
        },

        /**
         *  debug信息输出
         */
        debug: function (message) {
            message = 'AJAX DEBUG: ' + message;
            if (console && console.log) {
                console.log(message);
            } else {
                alert(message);
            }
        }
    };

    if (global.ajax) {
        throw new Error('ajax object already existed.');
    }

    // 在全局环境中引入ajax对象
    global.ajax = ajax;

}(window));