(function(root, factory) {
	'use strict';

	var _global = typeof window === 'undefined' || window.navigator == null ? global : window,
		_mask;

	if (typeof Mask !== 'undefined')
		_mask = Mask;

	if (_mask == null && root)
		_mask = root.mask || (root.atma && root.atma.mask);

	if (_mask == null)
		_mask = global.mask || (global.atma && global.atma.mask);


	function construct() {

		return factory(_global, mask || _mask);
	};

	// Browser OR Node
	return construct();

}(this, function(global, mask) {
	'use strict';