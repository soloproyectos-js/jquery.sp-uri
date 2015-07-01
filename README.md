# jQuery.spUri
An URI utility plugin for jQuery.

## Installation

Copy the [dist](dist) files in your preferred location.

## Examples

```JavaScript
// gets parameters from the current URL
var param1 = $.spUri('getParam', 'param1');
var param2 = $.spUri('getParam', 'param2');

// escapes parameters
var url = 'http://www.mysite.com/' +
  '?param1=' + $.spUri('escapeParam', 'hello my friend') +
  '&param2=' + $.spUri('escapeParam', 'how do you do?');
console.log(url);

// parses a URI
// the below code prints the following info:
//
// protocol: 'http'
// username: 'perico'
// password: 'palotes'
// hostname: 'test.domain.com'
// port    : '1574'
// pathname: '/path/to/somewhere'
// params  : {'param 1': 'first param', 'param 2': 'second param'}
// hash    : 'tag'
var info = $.spUri(
  'parse',
  'http://perico:palotes@test.domain.com:1574/path/to/somewhere' +
  '?param%201=first%20param&param%202=second%20param#tag'
);
console.log(info);
```
