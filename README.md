# sdiff
gets diff between two strings

```javascript
var sdiff = require('sdiff');

var source = 'aaabbc';
var target = 'aaajjc';

var changes = sdiff.pull(source, target, { chunk: 1 }); 

// changes  =
//   [{
//        start: 0,
//        length: 3
//    },
//    {
//        value: 'jj'
//    },
//    {
//        start: 5,
//        length: 1
//    }];

// send changes by network

target === sdiff.push(source, changes); // true
```