# jQuery.spUri
An URI utility plugin for jQuery.

## Installation

Copy the [dist](dist) files in your preferred location.

## Examples

```JavaScript
// gets parameters from the current URL
var param1 = $.spUri('get', 'param1');
var param2 = $.spUri('get', 'param2');

// opens the current page in the same window and appens some parameter
$.spUri('open', {param1: 'Param 1', param2: 'Param 2'});

// opens a new page in the same window
$.spUri('open', 'location/page.html');

// opens a new page in the same window and appends some parameter
$.spUri('open', 'http://www.site.com/path/to/page.html', {param1: 'Param 1', param2: 'Param 2'});
```
