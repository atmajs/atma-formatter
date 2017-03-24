var number_format;

(function() {

	number_format = function(number_, pattern, cultureInfo) {
		// NUMER { Delimiter, Point, Default }

		var NUMBER_DEF = typeof Lang !== 'undefined' ? Lang.$get('NUMBER') : null,
			NUMBER = cultureInfo && cultureInfo.NUMBER || NUMBER_DEF,
			DELIMITER = NUMBER.Delimiter || NUMBER_DEF.Delimiter,
			POINT = NUMBER.Point || NUMBER_DEF.Point,
			DEFAULT = NUMBER.Default == null ? NUMBER_DEF.Default : NUMBER.Default;


		var number = isNumber(number_) ? number_ : null;
		if (number == null && typeof number_ === 'string') {
			number = parseFloat(number_);			
		}
		if (isNumber(number) === false) {
			number = DEFAULT;
			if (typeof number === 'string') {
				return number;
			}
		}
		
		return format(number, pattern, DELIMITER, POINT);
	};

	function isNumber (x) {
		return typeof x === 'number' && x === x;
	}
	function format (number, pattern, delimiter, point) {
		var info = parsePattern(pattern),
			delimiter = info.delimiter;		
		if (delimiter === ',')
			// default delimiter - take from culture
			delimiter = delimiter;

		var str = info.fractionCount === Infinity
			? (number).toString()
			: (number).toFixed(info.fractionCount);
		var dot = str.indexOf('.');
		if (dot === -1)
			dot = str.length;

		var integralPart = dot === -1 ? str  : str.substring(0, dot),
			fractionPart = dot === -1 ? null : str.substring(dot + 1),
			integralFormatted = formatIntegralPart(integralPart, delimiter, info),
			fractionFormatted = formatFractionPart(fractionPart, info);

		
		if (fractionFormatted == null || fractionFormatted === '') {
			return integralFormatted;
		}
		return integralFormatted + point + fractionFormatted;
	}

	function formatIntegralPart (str_, delimiter, formatInfo) {
		var minDigits = formatInfo.integral.length;	
		var str = pad(str_, str_.length, minDigits);

		if (delimiter == null)
			return str;

		var b = str.length,
			a = b - 3,
			out = '';

		while (a > -1) {
			out = delimiter + str.substring(a, b) + out;
			a -= 3;
			b -= 3;
		}
		out = str.substring(0, b) + out;		
		return out;
	}
	function formatFractionPart (fractionPart, formatInfo) {
		if (formatInfo.fractionCount === Infinity) {
			return fractionPart;
		}
		var str = fractionPart;
		if (formatInfo.fractionOptional) {			
			var i = str.length;
			while (--i > -1) {
				if (str.charCodeAt(i) !== 48 /* 0 */) {
					i++;
					break;
				}
			}			
			if (i < str.length) {
				str = str.substring(0, i);
			}
		}
		return str;
	}
	function pad (str, digits, minDigits) {
		if (digits >= minDigits) {
			return str;
		}		
		return repeat('0', minDigits - digits) + str; 
	}	
	function char_isNumber(charCode) {
		return charCode >= 48 && charCode <= 57;
	}
	function repeat(char_, count) {
		var str = '';
		while (--count > -1)
			str += char_;
		return str;
	}
	function parsePattern (pattern) {
		if (cache_.hasOwnProperty(pattern))
			return cache_[pattern];

		var patternStr = pattern,
			delimiter,
			hasDelimiter = !char_isNumber(patternStr.charCodeAt(0)),
			index = 0;
		if (hasDelimiter) {
			delimiter = patternStr[0];
			index = 1;
		}

		var pointIndex = patternStr.indexOf('.'),		
			integralPart = pointIndex === -1 ? patternStr : patternStr.substring(index, pointIndex),
			fractionPart = pointIndex === -1 ? '' : patternStr.substring(pointIndex + 1),
			fractionCount = 0,
			fractionOptional = true;

		if (fractionPart.length > 0) {
			var p = fractionPart.indexOf('(');
			if (p === -1) {
				fractionCount = fractionPart.length;
				fractionOptional = false;
			} else {
				fractionPart = fractionPart.replace(/[()]/g, '');
				fractionCount = fractionPart.length;				
			}
		} else if (pointIndex !== -1) {
			fractionCount = Infinity;
		}
		var patternObj = {
			delimiter: delimiter,
			integral: integralPart,
			fraction: fractionPart,
			fractionCount: fractionCount,
			fractionOptional: fractionOptional
		};		
		return cache_[pattern] = patternObj;
	}
	var cache_ = {};

}());