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
        'get': function (name) {
            var params = parseQuery(location.search);
            var value = params[name];
            
            return value !== undefined? value: '';
        }
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
