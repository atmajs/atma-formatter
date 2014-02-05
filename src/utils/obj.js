var obj_extend;

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
	
}());