/**
 * jQuery.spUri - An URI utility plugin.
 *
 * This plugin requires: 
 *      1. jQuery >= 2.1.3
 *
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/wirexmedia/jquery.uri/blob/master/LICENSE MIT License
 * @link      https://github.com/wirexmedia/jquery.uri
 */
(function ($) {
    /**
     * Parses a query string and retrieves the parameters.
     * 
     * @param {String} query Query string
     * 
     * @return {Object.<String, String>}
     */
    function parseQuery(query) {
        var ret = {};
        var query = query.replace(/^\?/, '');
        
        if (query.length > 0) {
            var paramValues = query.split('&');
            var len = paramValues.length;
            
            for (var i = 0; i < len; i++) {
                var info = paramValues[i].split('=');
                if (info.length > 1) {
                    var param = decodeURIComponent(info[0]);
                    var value = decodeURIComponent(info[1]);
                    
                    ret[param] = value;
                }
            };
        }
        
        return ret;
    }
    
    /**
     * Available methods
     * @var {Object}
     */
    var methods = {
        /**
         * Gets a parameter value from the current URI.
         * 
         * @param {String} name Parameter name
         * 
         * @return {String}
         */
        'getParam': function (name) {
            var params = parseQuery(location.search);
            var value = params[name];
            
            return value !== undefined? value: '';
        },
        
        /**
         * Parses and obtains information about a URI.
         * 
         * Example:
         * ```JavaScript
         * // the below code prints the following info:
         * //
         * // protocol: 'http'
         * // username: 'perico'
         * // password: 'palotes'
         * // hostname: 'test.domain.com'
         * // port    : '1574'
         * // pathname: '/path/to/somewhere'
         * // params  : {'param 1': 'first param', 'param 2': 'second param'}
         * // hash    : 'tag'
         * 
         * var info = $.spUri(
         *      'parse',
         *      'http://perico:palotes@test.domain.com:1574/path/to/somewhere' +
         *      '?param%201=first%20param&param%202=second%20param#tag'
         * );
         * console.log(info);
         * ```
         * 
         * @param {String} uri URI
         * 
         * @return {Object}
         */
        'parse': function (uri) {
            var parser = document.createElement('a');
            parser.href = uri;

            return {
                protocol: parser.protocol.replace(/:$/, ''),
                username: parser.username,
                password: parser.password,
                hostname: parser.hostname,
                port: parser.port,
                pathname: parser.pathname,
                params: parseQuery(parser.search),
                hash: parser.hash.replace(/^#+/, '')
            };
        },
    };
    
    /**
     * Registers plugin.
     * 
     * @param {String} methodName Method name
     * @param {Mixed}  args,...   Additional arguments (not required)
     * 
     * @return {Mixed}
     */
    $.spUri = function (methodName, args) {
        var method = methods[methodName];
        var args = Array.prototype.slice.call(arguments, 1);
        
        if (method === undefined) {
            $.error('Method not found: ' + methodName);
        }
        
        return method.apply(this, args);
    };
})(jQuery);
