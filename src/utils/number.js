var number_format;

(function() {



	number_format = function(number, format, cultureInfo) {
		// { Delimiter, Point }

		var NUMBER = cultureInfo == null || cultureInfo.NUMBER == null
				? Lang.$get('NUMBER')
				: cultureInfo.NUMBER
				,

			hasDelimiter = !char_isNumber(format.charCodeAt(0)),

			parts, integral, fraction, fractionCount,

			delimiter, point, pointIndex, str;

		if (hasDelimiter) {
			delimiter = format[0];
			format = format.substring(1);

			if (delimiter === ',')
				// default delimiter - take from culture
				delimiter = NUMBER.Delimiter;
		}


		parts = format.split('.');
		integral = parts[0];
		fraction = parts.length === 1
			? null
			: parts[1]
			;

		fractionCount = fraction == null
			? 0
			: (fraction.length === 0 ? null : fraction.length)
			;

		str = fractionCount == null
			? (number).toString()
			: (number).toFixed(fractionCount)
			;

		// placeholders
		pointIndex = str.indexOf('.');
		if (pointIndex === -1)
			pointIndex = str.length;

		if (integral.length >= pointIndex)
			str = repeat('0', integral.length - pointIndex + 1) + str;

		if (fractionCount != null && fractionCount > str.length - pointIndex - 1)
			str = str + repeat('0', fractionCount - (str.length - pointIndex + 1));

		if (!hasDelimiter)
			return str.replace('.', NUMBER.Point);

		// format integral part
		pointIndex = str.indexOf('.');

		if (fraction == null) 
			return number_formatIntegralPart(str, delimiter);
			
		if (pointIndex <= 3)
			return str.replace('.', NUMBER.Point);

		return number_formatIntegralPart(str.substring(0, pointIndex), delimiter)
			+ NUMBER.Point
			+ str.substring(pointIndex + 1)
			;
	};


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

	function repeat(char_, count) {
		var str = '';
		while (--count > 0)
			str += char_;
		return str;
	}

}());