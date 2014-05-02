var pluralize;

(function(){
	
	pluralize = function(num, string, cultureInfo){
		/* { Pluralize } */
		
		var culturPattern = cultureInfo == null || cultureInfo.Pluralize == null
				? Lang.$get('Pluralize')
				: cultureInfo.Pluralize
				;
		if (typeof culturPattern === 'string')
			culturPattern = new PluralizedPattern(culturPattern);
		
		var pattern = new PluralizedPattern(string),
			val = pattern.getValue(num, culturPattern);
		if (val != null) 
			return val;
		
		console.error('<format plural: pattern not found', num, string);
		return '';
	};
	
	
	//= Private
	
	var cache__ = {};
	function PluralizedPattern(string){
		if (cache__.hasOwnProperty(string)) 
			return cache__[string];
		
		cache__[string] = this;
		
		this.items = [];
		
		var i = -1,
			index = -1,
			last = 0,
			imax = string.length,
			pare;
			
		while ((index = string.indexOf(';', index)) !== -1){
			
			if (string.charCodeAt(index) === 92) {
				// \ 
				index++;
				continue;
			}
			
			pare = string.substring(last, index);
			last = index = index + 1;
			
			if (pare) 
				this.items.push(parse_pluralizedItem(pare));
		}
		
		
		pare = string.substring(last);
		if (pare) 
			this.items.push(parse_pluralizedItem(pare));
			
		
	};
	PluralizedPattern.prototype.getValue = function(num, culturInfo){
		var i = -1,
			imax = this.items.length,
			val;
		while ( ++i < imax ){
			val = this.items[i].getValue(num, culturInfo);
			if (val != null) 
				return val;
		}
		return null;
	}
	
	function parse_pluralizedItem(str) {
		str = str.trim();
		
		// culture pattern
		if (/^[*\d]+/.test(str) === false) 
			return new PluralItem_CulturePattern(str.split(/\s*,\s*/g));
		
		
		var colon = str.indexOf(':'),
			pattern = str.substring(0, colon),
			value = str.substring(colon + 1).trim()
			;
		if (colon === -1) 
			console.error('<invalid pluralized pattern>', str);
		
		
		return new PluralItem(pattern, value);
	}
	
	
	function PluralItem(pattern, value){
		this.value = value;
		this.items = pattern
			.split(/\s*,\s*/g)
			.map(function(num_pattern){
				return init_numPattern(num_pattern);
			});
	}
	PluralItem.prototype.getValue = function(num){
		var i = -1,
			imax = this.items.length;
		
		while ( ++i < imax ){
			if (this.items[i].test(num)) 
				return this.value;
		}
		return null;
	}
	
	function PluralItem_CulturePattern(words){
		this.words = words;
	}
	PluralItem_CulturePattern.prototype.getValue = function(num, culturePattern) {
		if (culturePattern == null) {
			console.error('<pluralize> Culture info pattern is undefined');
			return null;
		}
		
		return this.words[ culturePattern.getValue(num) << 0 ];
	};
	
	
	function init_numPattern(num_pattern) {
		if (num_pattern === '*') 
			return new NumPattern_Any;
		
		if (num_pattern[0] === '*') {
			num_pattern = num_pattern.substring(1);
			
			var Ctor = num_pattern.indexOf('-') !== -1
				? NumPattern_EndingRange
				: NumPattern_Ending
				;
			return new Ctor(num_pattern);
		}
		
		var Ctor = num_pattern.indexOf('-') !== -1
			? NumPattern_StrictRange
			: NumPattern_Strict
			;
		return new Ctor(num_pattern);
	}
	
	function NumPattern_Any(){}
	NumPattern_Any.prototype.test = function(){
		return true
	};
	
	function NumPattern_Ending(pattern){
		this.multiplier = Math.pow(10, pattern.length);
		this.val = parseInt(pattern);
	}
	NumPattern_Ending.prototype.test = function(value){
		return value % this.multiplier === this.val;
	};
	
	
	function NumPattern_EndingRange(pattern) {
		var parts = pattern.split('-');
		
		this.multiplier = 10 * parts[0].length;
		this.valStart = parseInt(parts[0]);
		this.valEnd = parseInt(parts[1]);
	}
	NumPattern_EndingRange.prototype.test = function(value){
		var num = value % this.multiplier;
		
		return num >= this.valStart && num <= this.valEnd;
	};
	
	
	function NumPattern_Strict(pattern){
		this.val = parseInt(pattern);
	}
	NumPattern_Strict.prototype.test = function(value){
		return this.val === value;
	};
	
	function NumPattern_StrictRange(pattern){
		var parts = pattern.split('-');
		
		this.valStart = parseInt(parts[0]);
		this.valEnd = parseInt(parts[1]);
	}
	NumPattern_StrictRange.prototype.test = function(num){
		return num >= this.valStart && num <= this.valEnd;
	};
	
}());