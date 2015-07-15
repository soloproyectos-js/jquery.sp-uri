/**
 * jQuery.spUri - An URI utility plugin.
 *
 * This plugin requires: 
 *      1. jQuery ~2.0
 *
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/soloproyectos-js/jquery.sp-uri/blob/master/LICENSE MIT License
 * @link      https://github.com/soloproyectos-js/jquery.sp-uri
 */
(function ($) {
    /**
     * Parses a query string and retrieves the parameters.
     * 
     * @param {string} query Query string
     * 
     * @return {Object.<string, string>}
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
     * Appends parameters to a given URI.
     * 
     * @param {string} uri    URI
     * @param {Object} params Parameters
     * 
     * @return {string}
     */
    function appendParams(uri, params) {
        var ret = uri;
        
        // removes the tag section from the URI string
        var uriTag = '';
        var pos = ret.lastIndexOf('#');
        if (pos > 0) {
            uriTag = ret.substring(pos + 1);
            ret = ret.substring(0, pos);
        }
        
        // removes the parameters section from the URI string
        var uriParams = '';
        var pos = ret.lastIndexOf('?');
        if (pos > 0) {
            uriParams = ret.substring(pos + 1);
            ret = ret.substring(0, pos);
        }
        
        // merges and appends the parameters to the URI string
        uriParams = $.param($.extend(parseQuery(uriParams, params), params));
        if (uriParams.length > 0) {
            ret += '?' + uriParams;
        }
        
        // appends the tag section to the URI string
        if (uriTag.length > 0) {
            ret += '#' + uriTag;
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
         * This function returns an empty string if the parameter is not present.
         * 
         * For example:
         * ```JavaScript
         * console.log($.spUri('get', 'id'));
         * ```
         * 
         * @param {string} name Parameter name
         * 
         * @return {string}
         */
        'get': function (name) {
            var params = parseQuery(location.search);
            var value = params[name];
            
            return value !== undefined? value: '';
        },
        
        /**
         * Opens a new page in the same window.
         * 
         * @param {string}          uri    URI (not required)
         * @param {Object.<string>} params Parameters (not required)
         * 
         * @return {void}
         */
        'open': function (uri, params) {
            // parses arguments
            if ($.type(uri) !== 'string') {
                params = uri;
                uri = location.href;
            }
            if (params === undefined) {
                params = [];
            }
            
            window.open(appendParams(uri, params), '_self');
        }
    };
    
    /**
     * Registers plugin.
     * 
     * @param {string} methodName Method name
     * @param {mixed}  args,...   Additional arguments (not required)
     * 
     * @return {mixed}
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
