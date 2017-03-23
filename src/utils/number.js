var number_format;

(function() {

	number_format = function(number, format, cultureInfo) {
		// { Delimiter, Point }

		var NUMBER = cultureInfo == null || cultureInfo.NUMBER == null
				? Lang.$get('NUMBER')
				: cultureInfo.NUMBER;

		var info = parseFormat(format),
			delimiter = info.delimiter;		
		if (delimiter === ',')
			// default delimiter - take from culture
			delimiter = NUMBER.Delimiter;

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
		return integralFormatted + NUMBER.Point + fractionFormatted;
	};

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

	function number_formatIntegralPart(str, delimiter) {
		return str
			.replace(/^([\d]{0,2})(([\d]{3})*)$/, function(full, prefix, middle) {

			var str = prefix ? prefix + delimiter : '';

			return str + middle
				.replace(/([\d]{3})/g, '$1' + delimiter)
				.slice(0, -1);
		});

	}

	function char_isNumber(charCode) {
		return charCode >= 48 && charCode <= 57;
	}
	function countDigits (int) {
		if (int < 10) return 1;
		if (int < 100) return 2;
		if (int < 10000) return 3;
		if (int < 100000) return 4;
		if (int < 1000000) return 5;
		return (int).toString().length;
	}

	function repeat(char_, count) {
		var str = '';
		while (--count > -1)
			str += char_;
		return str;
	}

	function parseFormat (formatStr_) {
		if (0 && cache_.hasOwnProperty(formatStr_))
			return cache_[formatStr_];

		var formatStr = formatStr_,
			delimiter,
			hasDelimiter = !char_isNumber(formatStr.charCodeAt(0)),
			index = 0;
		if (hasDelimiter) {
			delimiter = formatStr[0];
			index = 1;
		}

		var pointIndex = formatStr.indexOf('.'),		
			integralPart = pointIndex === -1 ? formatStr : formatStr.substring(index, pointIndex),
			fractionPart = pointIndex === -1 ? '' : formatStr.substring(pointIndex + 1),
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
		var format = {
			delimiter: delimiter,
			integral: integralPart,
			fraction: fractionPart,
			fractionCount: fractionCount,
			fractionOptional: fractionOptional
		};		
		return cache_[formatStr_] = format;
	}
	var cache_ = {};

}());