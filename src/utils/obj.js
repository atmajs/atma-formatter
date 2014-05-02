var obj_extend,
	obj_getProperty
	;

(function(){
	
	obj_extend = function(target, source) {
		if (target == null) 
			target = {};
		
		if (source == null) 
			return target;
		
		for (var key in source) {
			target[key] = source[key];
		}
		
		return target;
	}
	
	obj_getProperty = function(obj, accessor){
		var value = obj,
			props = accessor.split('.'),
			i = -1,
			length = props.length;
	
		while (value != null && ++i < length) {
			value = value[props[i]];
		}
	
		return value;
	};
	
}());