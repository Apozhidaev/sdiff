# sdiff
gets diff between two strings

```javascript
var source = 'aabbcc';
var target = 'aajjcc';

var diff = sdiff.calc(source, target); // { value: 'jj', begin: 2, end: 2 }

// send diff by network

target === sdiff.restore(source, diff); // true
```