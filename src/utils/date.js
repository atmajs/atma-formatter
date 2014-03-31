var date_format;

(function() {

	var _date,
		_cultureInfo /* { MONTH, MONTH_SHORT, DAY, DAY_SHORT } */ ;

	date_format = function(date, format, cultureInfo) {

		_date = date;
		_cultureInfo = cultureInfo || Lang[lang_isoCode];

		format = format
			.replace('Mm', Mm)
			.replace('MMM', MMM)
			.replace('MM', MM)
			.replace('#M', $M)

			.replace('yyyy', yyyy)
			.replace('yy', yy)

			.replace('dd', dd)
			.replace('#d', $d)
			.replace('Dd', Dd)
			.replace('DDD', DDD)

			.replace('HH', HH)
			.replace('hh', hh)
			.replace('#h', $h)

			.replace('mm', mm)
			.replace('#m', $m)

			.replace('ss', ss)
			.replace('#s', $s)

		;

		return format;

	};

	// formatters
	var yyyy,
		yy,
		$M,
		MM,
		Mm,
		MMM,
		$d,
		dd,
		Dd,
		DDD,
		$H,
		HH,
		$h,
		hh,
		$m,
		mm,
		$s,
		ss;

	yyyy = function() {
		return _date.getFullYear();
	};

	yy = function() {
		return _date.getFullYear() % 100;
	};

	$M = function() {
		return _date.getMonth() + 1;
	};

	MM = function() {
		return pad(_date.getMonth() + 1);
	};

	Mm = function() {
		return _cultureInfo.MONTH_SHORT[_date.getMonth()];
	};

	MMM = function() {
		return _cultureInfo.MONTH[_date.getMonth()];
	};

	$d = function() {
		return _date.getDate();
	};

	dd = function() {
		return pad(_date.getDate());
	};

	Dd = function() {
		return _cultureInfo.DAY_SHORT[_date.getMonth()];
	};

	DDD = function() {
		return _cultureInfo.DAY_SHORT[_date.getMonth()];
	};

	$H = function() {
		return _date.getHours();
	};

	HH = function() {
		return pad(_date.getHours());
	};
	hh = HH;
	$h = $H;

	$m = function() {
		return _date.getMinutes();
	};

	mm = function() {
		return pad(_date.getMinutes());
	};

	$s = function() {
		return _date.getSeconds();
	};

	ss = function() {
		return pad(_date.getSeconds());
	};


	// UTILS

	function replaceOnce(str) {

		var i = 0,
			imax = arguments.length,
			orig = str;

		while (++i < imax) {

			str = str.replace(arguments[i], arguments[++i]);
			if (str !== orig)
				return str;
		}

		return str;
	}

	function pad(value) {
		return value > 9 ? value : '0' + value;
	}
}());