backupApp.service('AppService', function($http) {
    this.apiurl = '/api/v1';

    var setupConfig = function (method, options, data) {
        options = options || {};
        options.method = options.method || method;
        options.responseType = options.responseType || 'json';
        options.xsrfHeaderName ='X-XSRF-Token';
        options.xsrfCookieName = 'xsrf-token';
        options.headers = options.headers || {};

        if (method == "POST" && options.headers['Content-Type'] == null && data != null && typeof(data) != typeof('')) {
			options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
			options.transformRequest = function(obj) {
		        var str = [];
		        for(var p in obj)
		        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		        return str.join("&");
		    };
        }

        return options;
    };

    this.get = function(url, options) {
        var rurl = this.apiurl + url;
        return $http.get(rurl, setupConfig('GET', options));
    };

    this.patch = function(url, data, options) {
        var rurl = this.apiurl + url;
        return $http.patch(rurl, data, setupConfig('PATCH', options, data));
    };

    this.post = function(url, data, options) {
        var rurl = this.apiurl + url;
        return $http.post(rurl, data, setupConfig('POST', options, data));
    };

});