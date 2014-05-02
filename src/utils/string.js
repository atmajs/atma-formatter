var str_format,
	str_formatWithCulture

(function() {

	str_format = function(str /* ... args */ ) {
		return format(str, Array.prototype.slice.call(arguments, 1));
	};
	str_formatWithCulture = function(str, args, culture) {
		return format(str, args, culture);
	};


	// PRIVAT
	function format(str, args, cultureInfo) {
		var out = '',
			i = 0,
			last = 0,
			x;

		while ((i = str.indexOf('{', i)) !== -1) {

			if (i > 0 && str.charCodeAt(i - 1) === 92 /* \ */ ) {

				out += str.substring(last, i - 1) + '{';
				last = i + 1;
				continue;
			}

			out += str.substring(last, i);
			last = i + 1;
			i = cursor_moveToEnd(str, i);

			if (i === -1)
				break;

			x = new Interpolator(str.substring(last, i))
			out += x.process(args, cultureInfo);
			last = i + 1;
		}

		if (last < str.length)
			out += str.substring(last);

		return out;
	}
	
	function cursor_moveToEnd(str, i) {
		var stack = 0,
			imax = str.length,
			c;
		
		while(i < imax){
			c = str.charCodeAt(++i);
			if (c === 92) {
				// \ skip nextChar
				i++;
				continue;
			}
			
			if (c === 123) {
				// {
				stack++;
				continue;
			}
			if (c === 125) {
				// }
				
				if (--stack < 0)
					break;
			}
		}
		
		if (i === imax || stack > -1) 
			return -1;
		
		return i;
	}

	
	var Interpolator;
	(function() {
		var cache__ = {};

		Interpolator = function(str) {
			if (cache__.hasOwnProperty(str))
				return cache__[str];

			cache__[str] = this;

			parse(this, str);
		};

		Interpolator.prototype = {
			
			/* index|property */
			accessorType: null,
			accessor: null,
			
			
			alignment: null,
			pattern: null,
			pluralizer: null,

			process: function(args, cultureInfo) {
				var type = this.accessorType,
					accessor = this.accessor,
					pattern = this.pattern,
					alignment = this.alignment,
					plural = this.pluralizer
					;
				
				var val;
				if ('index' === type) 
					val = args[accessor];
				
				if ('property' === type) 
					val = obj_getProperty(args[0], accessor);
				
				if (val == null)
					return align(alignment, '');
				
				
				if (pattern) {
		
					if (is_Number(val))
						return align(alignment, number_format(val, pattern, cultureInfo));
		
					if (is_Date(val))
						return align(alignment, date_format(val, pattern, cultureInfo));
		
					return align(alignment, (val).toString(pattern, cultureInfo));
				}
				
				if (plural) {
					var str = pluralize(val, plural, cultureInfo);
					return str.indexOf('{') === -1
						? str
						: format(str, args, cultureInfo)
						;
				}
				
				return align(alignment, (val).toString());
			}
		}

		/* groups: */
		var i_ACCESSOR_INT = 2,
			i_ACCESSOR_PROP = 3,
			i_ALIGN = 5,
			i_PATTERN = 7,
			i_PLURALIZER = 9;
		
		var rgx = /^((\d+)|([\w\d._]+))(,([-\d]+))?(:(.+))?(;(.+))?$/;
		function parse(instance, str) {
			
			var matches = rgx.exec(str);
			if (matches == null) {
				console.error('Format pattern not matched', str);
				return;
			}
			instance.accessorType = matches[i_ACCESSOR_INT]
				? 'index'
				: 'property'
				;
			
			instance.accessor = instance.accessorType === 'index'
				? parseInt(matches[i_ACCESSOR_INT])
				: matches[i_ACCESSOR_PROP]
				;
			
			instance.alignment = matches[i_ALIGN] || null;
			instance.pattern = matches[i_PATTERN] || null;
			instance.pluralizer = matches[i_PLURALIZER] || null;
			
		}
		
		// alignment
		function align(alignment, str) {
			if (alignment == null || isNaN(alignment))
				return str;
	
			var count = alignment < 0 ? alignment * -1 : alignment;
	
	
			if (str.length > count)
				return str;
	
			var addon = repeat(' ', (count - str.length));
	
			return alignment < 0 ? str + addon : addon + str;
		}
	
		function repeat(char_, count) {
			var out = '';
			while (--count > -1)
				out += char_;
			return out;
		}

	}());

}());