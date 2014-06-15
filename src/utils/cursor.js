var cursor_moveToEnd;

(function(){

	cursor_moveToEnd = function (str, i, openCharCode, closeCharCode) {
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
			if (c === openCharCode) {
				stack++;
				continue;
			}
			if (c === closeCharCode) {
				if (--stack < 0)
					break;
			}
		}
		
		return i === imax || stack > -1
			? -1
			: i
			;
	};
}());
