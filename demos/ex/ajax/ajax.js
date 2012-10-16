(function (global) {

    var ajax = {
        get: function () {
            var url,
                params, 
                callback;

            url = arguments[0];

            if (arguments.length === 2) {
                callback = arguments[1];
            } else if (arguments.lenght === 3) {
                params = arguments[1];
                callback = arguments[2];
            }

            if (params) {
                url += '?';
                for (var key in params) {
                    url += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }
            }

            var xhr = ajax.createXHR();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                        try {
                            var data = JSON.parse(xhr.responseText);
                            callback(data);
                        } catch (e) {
                            try {
                                var data = eval('(' + xhr.responseText + ')');
                                callback(data);
                            } catch (e) {
                                ajax.debug(e);
                            }
                        }
                    } else {
                        ajax.debug('Request was unsuccessful: ' + xhr.status);
                    }
                }
            };
            xhr.send(null);
        },

        createXHR: function () {
            if (window.XMLHttpRequest === undefined) {
                try {
                    return new ActiveXObject('MSXML2.XMLHTTP.6.0');
                } catch(e) {
                    try {
                        return new ActiveXObject('MSXML2.XMLHTTP.3.0');
                    } catch(e) {
                        throw new Error('XMLHttpRequest is not supported');
                    }
                }
            } else {
                return new XMLHttpRequest();
            }
        },

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
        alert(1);
        throw new Error('ajax object already existed.');
    }

    // expose the ajax object to global environment
    global.ajax = ajax;

}(window));