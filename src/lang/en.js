(function() {

	var MONTH = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
	];

	var MONTH_SHORT = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'June',
			'July',
			'Aug',
			'Sept',
			'Oct',
			'Nov',
			'Dec',
	];

	var DAY = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
	];
	var DAY_SHORT = [
			'Mon',
			'Tues',
			'Weds',
			'Thurs',
			'Fri',
			'Sat',
			'Sun',
	];


	Lang.$register('en', {
		MONTH: MONTH,
		MONTH_SHORT: MONTH_SHORT,
		DAY: DAY,
		DAY_SHORT: DAY_SHORT,

		NUMBER: {
			Delimiter: ',',
			Point: '.'
		}
	});
}());