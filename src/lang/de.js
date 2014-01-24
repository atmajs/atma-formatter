(function() {

	var MONTH = [
			'Januar',
			'Februar',
			'März',
			'April',
			'Mai',
			'Juni',
			'Juli',
			'August',
			'September',
			'Oktober',
			'November',
			'Dezember',
	];

	var DAY = [
			'Sonntag',
			'Montag',
			'Dienstag',
			'Mittwoch',
			'Donnerstag',
			'Freitag',
			'Samstag',
	];


	Lang.$register('de', {
		MONTH: MONTH,
		MONTH_SHORT: MONTH.map(function(x) {
			return x.substring(0, 3);
		}),
		DAY: DAY,
		DAY_SHORT: DAY.map(function(x) {
			return x.substring(0, 2);
		}),

		NUMBER: {
			Delimiter: '.',
			Point: ','
		}
	});
}());