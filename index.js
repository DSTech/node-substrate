var _ = require("underscore");
function substrate(obj, keys){
	obj = obj || {};
	if(typeof(keys) === "undefined" || keys === null){
		return {};//Everything was filtered out
	}
	if(_(keys).has('*')){
		return obj;//Wildcard early-out
	}
	var result={};
	_(keys).each(function(val, key){
		var original = obj[key];
		if(original === null){
			return;
		}
		if(typeof(original)==="object"){
			if(val !== null && typeof(val)==="object"){
				result[key]=substrate(original, val);
			}
		} else {
			result[key] = original;
		}
	});
	return result;
};
module.exports = substrate;

