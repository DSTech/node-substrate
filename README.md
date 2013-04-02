node-substrate
==============

A simple Node Module used for whitelist filtering of object and json inputs.

Inspired by https://github.com/visionmedia/node-only

Usage Example:
```javascript
var substrate = require("substrate");
substrate(
	{//Original object to be filtered
		"a": 5,
		"b": 6,
		"c":{
			"pi": 3.14,
			"cake": "pi^2"
		},
		"d": 7
	},
	{//Filter / Whitelist declaration
		"a":true,
		"b":true,
		"c":{"cake":true}//Object instead of true allows objects to pass through. Rules are recursive.
	}
)//=>{"a":5,"b":6,"c":{"cake":"pi^2"}}
```
