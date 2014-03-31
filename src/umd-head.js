(function(root, factory) {
	'use strict';

	var _global = typeof window === 'undefined' || window.navigator == null ? global : window,
		_mask;

	if (typeof Mask !== 'undefined')
		_mask = Mask;
	if (typeof mask !== 'undefined') 
		_mask = mask;
	
	if (_mask == null && root)
		_mask = root.mask || (root.atma && root.atma.mask);

	if (_mask == null)
		_mask = global.mask || (global.atma && global.atma.mask);


	function construct() {

		return factory(_global, _mask);
	};

	// Browser OR Node
	var Formatter = construct();
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') 
		module.exports = Formatter;
	
	return Formatter;

}(this, function(global, mask) {
	'use strict';