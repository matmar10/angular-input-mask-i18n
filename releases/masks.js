/**
 * angular-input-mask-i18n
 * Personalized input masks for AngularJS
 * @version v1.5.0
 * @link http://github.com/matmar10/angular-input-mask-i18n
 * @license MIT
 */
(function (angular) {

var StringMask = (function() {
	var tokens = {
		'0': {pattern: /\d/, _default: '0'},
		'9': {pattern: /\d/, optional: true},
		'#': {pattern: /\d/, optional: true, recursive: true},
		'S': {pattern: /[a-zA-Z]/},
		'$': {escape: true} 
	};
	var isEscaped = function(pattern, pos) {
		var count = 0;
		var i = pos - 1;
		var token = {escape: true};
		while (i >= 0 && token && token.escape) {
			token = tokens[pattern.charAt(i)];
			count += token && token.escape ? 1 : 0;
			i--;
		}
		return count > 0 && count%2 === 1;	
	};
	var calcOptionalNumbersToUse = function(pattern, value) {
		var numbersInP = pattern.replace(/[^0]/g,'').length;
		var numbersInV = value.replace(/[^\d]/g,'').length;
		return numbersInV - numbersInP;
	};
	var concatChar = function(text, character, options) {
		if (options.reverse) return character + text;
		return text + character;
	};
	var hasMoreTokens = function(pattern, pos, inc) {
		var pc = pattern.charAt(pos);
		var token = tokens[pc];
		if (pc === '') return false;
		return token && !token.escape ? true : hasMoreTokens(pattern, pos + inc, inc);
	};
	var insertChar = function(text, char, position) {
		var t = text.split('');
		t.splice(position >= 0 ? position: 0, 0, char);
		return t.join('');
	};
	var StringMask = function(pattern, opt) {
		this.options = opt || {};
		this.options = {
			reverse: this.options.reverse || false,
			usedefaults: this.options.usedefaults || this.options.reverse
		};
		this.pattern = pattern;

		StringMask.prototype.process = function proccess(value) {
			if (!value) return '';
			value = value + '';
			var pattern2 = this.pattern;
			var valid = true;
			var formatted = '';
			var valuePos = this.options.reverse ? value.length - 1 : 0;
			var optionalNumbersToUse = calcOptionalNumbersToUse(pattern2, value);
			var escapeNext = false;
			var recursive = [];
			var inRecursiveMode = false;

			var steps = {
				start: this.options.reverse ? pattern2.length - 1 : 0,
				end: this.options.reverse ? -1 : pattern2.length,
				inc: this.options.reverse ? -1 : 1
			};

			var continueCondition = function(options) {
				if (!inRecursiveMode && hasMoreTokens(pattern2, i, steps.inc)) {
					return true;
				} else if (!inRecursiveMode) {
					inRecursiveMode = recursive.length > 0;
				}

				if (inRecursiveMode) {
					var pc = recursive.shift();
					recursive.push(pc);
					if (options.reverse && valuePos >= 0) {
						i++;
						pattern2 = insertChar(pattern2, pc, i);
						return true;
					} else if (!options.reverse && valuePos < value.length) {
						pattern2 = insertChar(pattern2, pc, i);
						return true;
					}
				}
				return i < pattern2.length && i >= 0;
			};

			for (var i = steps.start; continueCondition(this.options); i = i + steps.inc) {
				var pc = pattern2.charAt(i);
				var vc = value.charAt(valuePos);
				var token = tokens[pc];
				if (!inRecursiveMode || vc) {
					if (this.options.reverse && isEscaped(pattern2, i)) {
						formatted = concatChar(formatted, pc, this.options);
						i = i + steps.inc;
						continue;
					} else if (!this.options.reverse && escapeNext) {
						formatted = concatChar(formatted, pc, this.options);
						escapeNext = false;
						continue;
					} else if (!this.options.reverse && token && token.escape) {
						escapeNext = true;
						continue;
					}
				}

				if (!inRecursiveMode && token && token.recursive) {
					recursive.push(pc);
				} else if (inRecursiveMode && !vc) {
					if (!token || !token.recursive) formatted = concatChar(formatted, pc, this.options);
					continue;
				} else if (recursive.length > 0 && token && !token.recursive) {
					// Recursive tokens most be the last tokens of the pattern
					valid = false;
					continue;
				} else if (!inRecursiveMode && recursive.length > 0 && !vc) {
					continue;
				}

				if (!token) {
					formatted = concatChar(formatted, pc, this.options);
					if (!inRecursiveMode && recursive.length) {
						recursive.push(pc);
					}
				} else if (token.optional) {
					if (token.pattern.test(vc) && optionalNumbersToUse) {
						formatted = concatChar(formatted, vc, this.options);
						valuePos = valuePos + steps.inc;
						optionalNumbersToUse--;
					} else if (recursive.length > 0 && vc) {
						valid = false;
						break;
					}
				} else if (token.pattern.test(vc)) {
					formatted = concatChar(formatted, vc, this.options);
					valuePos = valuePos + steps.inc;
				} else if (!vc && token._default && this.options.usedefaults) {
					formatted = concatChar(formatted, token._default, this.options);
				} else {
					valid = false;
					break;
				}
			}

			return {result: formatted, valid: valid};
		};

		StringMask.prototype.apply = function(value) {
			return this.process(value).result;
		};

		StringMask.prototype.validate = function(value) {
			return this.process(value).valid;
		};
	};

	StringMask.process = function(value, pattern, options) {
		return new StringMask(pattern, options).process(value);
	};

	StringMask.apply = function(value, pattern, options) {
		return new StringMask(pattern, options).apply(value);
	};

	StringMask.validate = function(value, pattern, options) {
		return new StringMask(pattern, options).validate(value);
	};

	return StringMask;
}());

/** Used to determine if values are of the language type Object */
var objectTypes = {
	'boolean': false,
	'function': true,
	'object': true,
	'number': false,
	'string': false,
	'undefined': false
};

if (objectTypes[typeof module]) {
	module.exports = StringMask;	
}

/**
 * br-validations
 * A library of validations applicable to several Brazilian data like I.E., CNPJ, CPF and others
 * @version v0.2.2
 * @link http://github.com/the-darc/br-validations
 * @license MIT
 */
(function () {
  var root = this;
var CNPJ = {};

CNPJ.validate = function(c) {
	var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];
	c = c.replace(/[^\d]/g,'');

	var r = /^(0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14})$/;
	if (!c || c.length !== 14 || r.test(c)) {
		return false;
	}
	c = c.split('');

	for (var i = 0, n = 0; i < 12; i++) {
		n += c[i] * b[i+1];
	}
	n = 11 - n%11;
	n = n >= 10 ? 0 : n;
	if (parseInt(c[12]) !== n)  {
		return false;
	}

	for (i = 0, n = 0; i <= 12; i++) {
		n += c[i] * b[i];
	}
	n = 11 - n%11;
	n = n >= 10 ? 0 : n;
	if (parseInt(c[13]) !== n)  {
		return false;
	}
	return true;
};


var CPF = {};

CPF.validate = function(cpf) {
	cpf = cpf.replace(/[^\d]+/g,'');
	var r = /^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11})$/;
	if (!cpf || cpf.length !== 11 || r.test(cpf)) {
		return false;
	}
	function validateDigit(digit) {
		var add = 0;
		var init = digit - 9;
		for (var i = 0; i < 9; i ++) {
			add += parseInt(cpf.charAt(i + init)) * (i+1);
		}
		return (add%11)%10 === parseInt(cpf.charAt(digit));
	}
	return validateDigit(9) && validateDigit(10);
};

var IE = function(uf) {
	if (!(this instanceof IE)) {
		return new IE(uf);
	}

	this.rules = IErules[uf] || [];
	this.rule;
	IE.prototype._defineRule = function(value) {
		this.rule = undefined;
		for (var r = 0; r < this.rules.length && this.rule === undefined; r++) {
			var str = value.replace(/[^\d]/g,'');
			var ruleCandidate = this.rules[r];
			if (str.length === ruleCandidate.chars && (!ruleCandidate.match || ruleCandidate.match.test(value))) {
				this.rule = ruleCandidate;
			}
		}
		return !!this.rule;
	};

	IE.prototype.validate = function(value) {
		if (!value || !this._defineRule(value)) {
			return false;
		}
		return this.rule.validate(value);
	};
};

var IErules = {};

var algorithmSteps = {
	handleStr: {
		onlyNumbers: function(str) {
			return str.replace(/[^\d]/g,'').split('');
		},
		mgSpec: function(str) {
			var s = str.replace(/[^\d]/g,'');
			s = s.substr(0,3)+'0'+s.substr(3, s.length);
			return s.split('');
		}
	},
	sum: {
		normalSum: function(handledStr, pesos) {
			var nums = handledStr;
			var sum = 0;
			for (var i = 0; i < pesos.length; i++) {
				sum += parseInt(nums[i]) * pesos[i];
			}
			return sum;
		},
		individualSum: function(handledStr, pesos) {
			var nums = handledStr;
			var sum = 0;
			for (var i = 0; i < pesos.length; i++) {
				var mult = parseInt(nums[i]) * pesos[i];
				sum += mult%10 + parseInt(mult/10);
			}
			return sum;
		},
		apSpec: function(handledStr, pesos) {
			var sum = this.normalSum(handledStr, pesos);
			var ref = handledStr.join('');
			if (ref >= '030000010' && ref <= '030170009') {
				return sum + 5;
			}
			if (ref >= '030170010' && ref <= '030190229') {
				return sum + 9;
			}
			return sum;
		}
	},
	rest: {
		mod11: function(sum) {
			return sum%11;
		},
		mod10: function(sum) {
			return sum%10;
		},
		mod9: function(sum) {
			return sum%9;
		}
	},
	expectedDV: {
		minusRestOf11: function(rest) {
			return rest < 2 ? 0 : 11 - rest;
		},
		minusRestOf11v2: function(rest) {
			return rest < 2 ? 11 - rest - 10 : 11 - rest;
		},
		minusRestOf10: function(rest) {
			return rest < 1 ? 0 : 10 - rest;
		},
		mod10: function(rest) {
			return rest%10;
		},
		goSpec: function(rest, handledStr) {
			var ref = handledStr.join('');
			if (rest === 1) {
				return ref >= '101031050' && ref <= '101199979' ? 1 : 0;
			}
			return rest === 0 ? 0 : 11 - rest;
		},
		apSpec: function(rest, handledStr) {
			var ref = handledStr.join('');
			if (rest === 0) {
				return ref >= '030170010' && ref <= '030190229' ? 1 : 0;
			}
			return rest === 1 ? 0 : 11 - rest;
		},
		voidFn: function(rest) {
			return rest;
		}
	}
};


/**
 * options {
 *     pesos: Array of values used to operate in sum step
 *     dvPos: Position of the DV to validate considering the handledStr
 *     algorithmSteps: The four DV's validation algorithm steps names
 * }
 */
function validateDV(value, options) {
	var steps = options.algorithmSteps;

	// Step 01: Handle String
	var handledStr = algorithmSteps.handleStr[steps[0]](value);

	// Step 02: Sum chars
	var sum = algorithmSteps.sum[steps[1]](handledStr, options.pesos);

	// Step 03: Rest calculation
	var rest = algorithmSteps.rest[steps[2]](sum);

	// Fixed Step: Get current DV
	var currentDV = parseInt(handledStr[options.dvpos]);

	// Step 04: Expected DV calculation
	var expectedDV = algorithmSteps.expectedDV[steps[3]](rest, handledStr);

	// Fixed step: DV verification
	return currentDV === expectedDV;
}

function validateIE(value, rule) {
	if (rule.match && !rule.match.test(value)) {
		return false;
	}
	for (var i = 0; i < rule.dvs.length; i++) {
		// console.log('>> >> dv'+i);
		if (!validateDV(value, rule.dvs[i])) {
			return false;
		}
	}
	return true;
}

IErules.PE = [{
	//mask: new StringMask('0000000-00'),
	chars: 9,
	dvs: [{
		dvpos: 7,
		pesos: [8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	// mask: new StringMask('00.0.000.0000000-0'),
	chars: 14,
	pesos: [[1,2,3,4,5,9,8,7,6,5,4,3,2]],
	dvs: [{
		dvpos: 13,
		pesos: [5,4,3,2,1,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11v2']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.RS = [{
	// mask: new StringMask('000/0000000'),
	chars: 10,
	dvs: [{
		dvpos: 9,
		pesos: [2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.AC = [{
	// mask: new StringMask('00.000.000/000-00'),
	chars: 13,
	match: /^01/,
	dvs: [{
		dvpos: 11,
		pesos: [4,3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 12,
		pesos: [5,4,3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.MG = [{
	// mask: new StringMask('000.000.000/0000'),
	chars: 13,
	dvs: [{
		dvpos: 12,
		pesos: [1,2,1,2,1,2,1,2,1,2,1,2],
		algorithmSteps: ['mgSpec', 'individualSum', 'mod10', 'minusRestOf10']
	},{
		dvpos: 12,
		pesos: [3,2,11,10,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.SP = [{
	// mask: new StringMask('000.000.000.000'),
	chars: 12,
	match: /^[0-9]/,
	dvs: [{
		dvpos: 8,
		pesos: [1,3,4,5,6,7,8,10],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'mod10']
	},{
		dvpos: 11,
		pesos: [3,2,10,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'mod10']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	// mask: new StringMask('P-00000000.0/000')
	chars: 12,
	match: /^P/i,
	dvs: [{
		dvpos: 8,
		pesos: [1,3,4,5,6,7,8,10],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'mod10']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.DF = [{
	// mask: new StringMask('00000000000-00'),
	chars: 13,
	dvs: [{
		dvpos: 11,
		pesos: [4,3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 12,
		pesos: [5,4,3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.ES = [{
	// mask: new StringMask('000.000.00-0')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.BA = [{
	// mask: new StringMask('000000-00')
	chars: 8,
	match: /^[0123458]/,
	dvs: [{
		dvpos: 7,
		pesos: [7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
	},{
		dvpos: 6,
		pesos: [8,7,6,5,4,3,0,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	chars: 8,
	match: /^[679]/,
	dvs: [{
		dvpos: 7,
		pesos: [7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 6,
		pesos: [8,7,6,5,4,3,0,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	// mask: new StringMask('0000000-00')
	chars: 9,
	match: /^[0-9][0123458]/,
	dvs: [{
		dvpos: 8,
		pesos: [8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
	},{
		dvpos: 7,
		pesos: [9,8,7,6,5,4,3,0,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	chars: 9,
	match: /^[0-9][679]/,
	dvs: [{
		dvpos: 8,
		pesos: [8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 7,
		pesos: [9,8,7,6,5,4,3,0,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.AM = [{
	//mask: new StringMask('00.000.000-0')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.RN = [{
	// {mask: new StringMask('00.000.000-0')
	chars: 9,
	match: /^20/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
},{
	// {mask: new StringMask('00.0.000.000-0'), chars: 10}
	chars: 10,
	match: /^20/,
	dvs: [{
		dvpos: 8,
		pesos: [10,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.RO = [{
	// mask: new StringMask('0000000000000-0')
	chars: 14,
	dvs: [{
		dvpos: 13,
		pesos: [6,5,4,3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.PR = [{
	// mask: new StringMask('00000000-00')
	chars: 10,
	dvs: [{
		dvpos: 8,
		pesos: [3,2,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	},{
		dvpos: 9,
		pesos: [4,3,2,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.SC = [{
	// {mask: new StringMask('000.000.000'), uf: 'SANTA CATARINA'}
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.RJ = [{
	// {mask: new StringMask('00.000.00-0'), uf: 'RIO DE JANEIRO'}
	chars: 8,
	dvs: [{
		dvpos: 7,
		pesos: [2,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.PA = [{
	// {mask: new StringMask('00-000000-0')
	chars: 9,
	match: /^15/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.SE = [{
	// {mask: new StringMask('00000000-0')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.PB = [{
	// {mask: new StringMask('00000000-0')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.CE = [{
	// {mask: new StringMask('00000000-0')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.PI = [{
	// {mask: new StringMask('000000000')
	chars: 9,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.MA = [{
	// {mask: new StringMask('000000000')
	chars: 9,
	match: /^12/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.MT = [{
	// {mask: new StringMask('0000000000-0')
	chars: 11,
	dvs: [{
		dvpos: 10,
		pesos: [3,2,9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.MS = [{
	// {mask: new StringMask('000000000')
	chars: 9,
	match: /^28/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.TO = [{
	// {mask: new StringMask('00000000000'),
	chars: 11,
	match: /^[0-9]{2}((0[123])|(99))/,
	dvs: [{
		dvpos: 10,
		pesos: [9,8,0,0,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.AL = [{
	// {mask: new StringMask('000000000')
	chars: 9,
	match: /^24[03578]/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.RR = [{
	// {mask: new StringMask('00000000-0')
	chars: 9,
	match: /^24/,
	dvs: [{
		dvpos: 8,
		pesos: [1,2,3,4,5,6,7,8],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod9', 'voidFn']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.GO = [{
	// {mask: new StringMask('00.000.000-0')
	chars: 9,
	match: /^1[015]/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'goSpec']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

IErules.AP = [{
	// {mask: new StringMask('000000000')
	chars: 9,
	match: /^03/,
	dvs: [{
		dvpos: 8,
		pesos: [9,8,7,6,5,4,3,2],
		algorithmSteps: ['onlyNumbers', 'apSpec', 'mod11', 'apSpec']
	}],
	validate: function(value) { return validateIE(value, this); }
}];

var BrV = {
   ie: IE,
   cpf: CPF,
   cnpj: CNPJ
};
var objectTypes = {
	'function': true,
	'object': true
};
if (objectTypes[typeof module]) {
	module.exports = BrV;	
} else {
	root.BrV = BrV;
}
}.call(this));
'use strict';

angular.module('ui.utils.masks.cep', [])
.directive('uiBrCepMask', [function() {
	var cepMask = new StringMask('00000-000');

	function clearValue (value) {
		if(!value) {
			return value;
		}

		return value.replace(/[^0-9]/g, '');
	}

	function applyCepMask (value, ctrl) {
		if(!value) {
			ctrl.$setValidity('cep', true);
			return value;
		}
		var processed = cepMask.process(value);
		ctrl.$setValidity('cep', processed.valid);
		var formatedValue = processed.result;
		return formatedValue.trim().replace(/[^0-9]$/, '');
	}

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attrs, ctrl) {
			if (!ctrl) {
				return;
			}

			ctrl.$formatters.push(function(value) {
				return applyCepMask(value, ctrl);
			});

			ctrl.$parsers.push(function(value) {
				if (!value) {
					return applyCepMask(value, ctrl);
				}

				var cleanValue = clearValue(value);
				var formatedValue = applyCepMask(cleanValue, ctrl);

				if (ctrl.$viewValue !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}

				return clearValue(formatedValue);
			});
		}
	};
}]);

'use strict';

(function() {
	var cnpjPattern = new StringMask('00.000.000\/0000-00');
	var cpfPattern = new StringMask('000.000.000-00');

	function validateCPF (ctrl, value) {
		var valid = ctrl.$isEmpty(value) || BrV.cpf.validate(value);
		ctrl.$setValidity('cpf', valid);
		return value;
	}

	function validateCNPJ (ctrl, value) {
		var valid = ctrl.$isEmpty(value) || BrV.cnpj.validate(value);
		ctrl.$setValidity('cnpj', valid);
		return value;
	}

	function validateCPForCNPJ (ctrl, value) {
		if(!value || value.length <= 11) {
			validateCNPJ(ctrl, '');
			return validateCPF(ctrl, value);
		}else {
			validateCPF(ctrl, '');
			return validateCNPJ(ctrl, value);
		}
	}

	function uiBrCpfMask() {
		function applyCpfMask (value) {
			if(!value) {
				return value;
			}
			var formatedValue = cpfPattern.apply(value);
			return formatedValue.trim().replace(/[^0-9]$/, '');
		}

		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attrs, ctrl) {
				if (!ctrl) {
					return;
				}

				ctrl.$formatters.push(function(value) {
					return applyCpfMask(validateCPF(ctrl, value));
				});

				ctrl.$parsers.push(function(value) {
					if(!value) {
						return value;
					}

					var actualNumber = value.replace(/[^\d]/g,'');
					var formatedValue = applyCpfMask(actualNumber);

					if (ctrl.$viewValue !== formatedValue) {
						ctrl.$setViewValue(formatedValue);
						ctrl.$render();
					}

					return formatedValue.replace(/[^\d]+/g,'');
				});

				ctrl.$parsers.push(function(value) {
					return validateCPF(ctrl, value);
				});
			}
		};
	}

	function uiBrCnpjMask() {
		function applyCnpjMask (value) {
			if(!value) {
				return value;
			}
			var formatedValue = cnpjPattern.apply(value);
			return formatedValue.trim().replace(/[^0-9]$/, '');
		}
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attrs, ctrl) {
				if (!ctrl) {
					return;
				}

				ctrl.$formatters.push(function(value) {
					return applyCnpjMask(validateCNPJ(ctrl, value));
				});

				ctrl.$parsers.push(function(value) {
					if(!value) {
						return value;
					}

					var actualNumber = value.replace(/[^\d]+/g,'');
					var formatedValue = applyCnpjMask(actualNumber);

					if (ctrl.$viewValue !== formatedValue) {
						ctrl.$setViewValue(formatedValue);
						ctrl.$render();
					}

					return formatedValue.replace(/[^\d]+/g,'');
				});

				ctrl.$parsers.push(function(value) {
					return validateCNPJ(ctrl, value);
				});
			}
		};
	}

	function uiBrCpfCnpjMask() {
		function applyCpfCnpjMask (value) {
			if(!value) {
				return value;
			}
			var formatedValue;
			if (value.length > 11) {
				formatedValue = cnpjPattern.apply(value);
			} else {
				formatedValue = cpfPattern.apply(value);
			}
			return formatedValue.trim().replace(/[^0-9]$/, '');
		}
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attrs, ctrl) {
				if (!ctrl) {
					return;
				}

				ctrl.$formatters.push(function(value) {
					return applyCpfCnpjMask(validateCPForCNPJ(ctrl, value));
				});

				ctrl.$parsers.push(function(value) {
					if(!value) {
						return value;
					}

					var actualNumber = value.replace(/[^\d]+/g,'');
					var formatedValue = applyCpfCnpjMask(actualNumber);

					if (ctrl.$viewValue !== formatedValue) {
						ctrl.$setViewValue(formatedValue);
						ctrl.$render();
					}

					return formatedValue.replace(/[^\d]+/g,'');
				});

				ctrl.$parsers.push(function(value) {
					return validateCPForCNPJ(ctrl, value);
				});
			}
		};
	}

	angular.module('ui.utils.masks.cpfCnpj', [])
	.directive('uiBrCpfMask', [uiBrCpfMask])
	.directive('uiBrCnpjMask', [uiBrCnpjMask])
	.directive('uiBrCpfcnpjMask', [uiBrCpfCnpjMask])
	// deprecated: will be removed in the next major version
	.directive('uiCpfMask', [uiBrCpfMask])
	// deprecated: will be removed in the next major version
	.directive('uiCnpjMask', [uiBrCnpjMask])
	// deprecated: will be removed in the next major version
	.directive('uiCpfcnpjMask', [uiBrCpfCnpjMask]);
})();

'use strict';

/*global moment*/
var globalMomentJS;
if (typeof moment !== 'undefined') {
	globalMomentJS = moment;
}

var dependencies = [];

try {
	//Check if angular-momentjs is available
	angular.module('angular-momentjs');
	dependencies.push('angular-momentjs');
} catch (e) {}

angular.module('ui.utils.masks.date', dependencies)
.directive('uiDateMask', ['$locale', '$log', '$injector', function($locale, $log, $injector) {
	var moment;

	if (typeof globalMomentJS === 'undefined') {
		if ($injector.has('MomentJS')) {
			moment = $injector.get('MomentJS');
		} else {
			throw new Error('Moment.js not found. Check if it is available.');
		}
	} else {
		moment = globalMomentJS;
	}

	var dateFormatMapByLocalle = {
		'pt-br': 'DD/MM/YYYY',
	};

	var dateFormat = dateFormatMapByLocalle[$locale.id] || 'YYYY-MM-DD';

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attrs, ctrl) {
			var dateMask = new StringMask(dateFormat.replace(/[YMD]/g,'0'));

			function clearValue (value) {
				if(angular.isUndefined(value)) {
					return value;
				}

				return value.replace(/[^0-9]/g, '');
			}

			function applyMask (value) {
				if(angular.isUndefined(value) || value.length === 0) {
					return;
				}

				var cleanValue = clearValue(value);
				var formatedValue = dateMask.process(cleanValue).result;

				return formatedValue.trim().replace(/[^0-9]$/, '');
			}

			function formatter (value) {
				$log.debug('[uiDateMask] Formatter called: ', value);
				if(angular.isUndefined(value)) {
					return;
				}

				var formatedValue = applyMask(moment(value).format(dateFormat));
				validator(formatedValue);
				return formatedValue;
			}

			function parser(value) {
				$log.debug('[uiDateMask] Parser called: ', value);

				var formatedValue = applyMask(value);
				$log.debug('[uiDateMask] Formated value: ', formatedValue);

				if (ctrl.$viewValue !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}
				validator(formatedValue);

				var modelValue = moment(formatedValue, dateFormat);
				return modelValue.toDate();
			}

			function validator(value) {
				$log.debug('[uiDateMask] Validator called: ', value);

				var isValid = moment(value, dateFormat).isValid() &&
					value.length === dateFormat.length;
				ctrl.$setValidity('date', ctrl.$isEmpty(value) || isValid);
			}

			ctrl.$formatters.push(formatter);
			ctrl.$parsers.push(parser);
		}
	};
}]);

'use strict';

angular.module('ui.utils.masks.helpers', [])
.factory('PreFormatters', [function(){
	function clearDelimitersAndLeadingZeros(value) {
		var cleanValue = value.replace(/^-/,'').replace(/^0*/, '');
		cleanValue = cleanValue.replace(/[^0-9]/g, '');
		return cleanValue;
	}

	function prepareNumberToFormatter (value, decimals) {
		return clearDelimitersAndLeadingZeros((parseFloat(value)).toFixed(decimals));
	}

	return {
		clearDelimitersAndLeadingZeros: clearDelimitersAndLeadingZeros,
		prepareNumberToFormatter: prepareNumberToFormatter
	};
}])
.factory('NumberValidators', [function() {
	return {
		maxNumber: function maxValidator(ctrl, value, limit) {
			var max = parseFloat(limit);
			var validity = ctrl.$isEmpty(value) || isNaN(max)|| value <= max;
			ctrl.$setValidity('max', validity);
			return value;
		},
		minNumber: function minValidator(ctrl, value, limit) {
			var min = parseFloat(limit);
			var validity = ctrl.$isEmpty(value) || isNaN(min) || value >= min;
			ctrl.$setValidity('min', validity);
			return value;
		}
	};
}])
.factory('NumberMasks', [function(){
	return {
		viewMask: function (decimals, decimalDelimiter, thousandsDelimiter) {
			var mask = '#' + thousandsDelimiter + '##0';

			if(decimals > 0) {
				mask += decimalDelimiter;
				for (var i = 0; i < decimals; i++) {
					mask += '0';
				}
			}

			return new StringMask(mask, {
				reverse: true
			});
		},
		modelMask: function (decimals) {
			var mask = '###0';

			if(decimals > 0) {
				mask += '.';
				for (var i = 0; i < decimals; i++) {
					mask += '0';
				}
			}

			return new StringMask(mask, {
				reverse: true
			});
		}
	};
}]);

'use strict';

angular.module('ui.utils.masks.ie', [])
.directive('uiBrIeMask', ['$parse', function($parse) {
	var ieMasks = {
		'AC': [{mask: new StringMask('00.000.000/000-00')}],
		'AL': [{mask: new StringMask('000000000')}],
		'AM': [{mask: new StringMask('00.000.000-0')}],
		'AP': [{mask: new StringMask('000000000')}],
		'BA': [{chars: 8, mask: new StringMask('000000-00')},
			   {mask: new StringMask('0000000-00')}],
		'CE': [{mask: new StringMask('00000000-0')}],
		'DF': [{mask: new StringMask('00000000000-00')}],
		'ES': [{mask: new StringMask('00000000-0')}],
		'GO': [{mask: new StringMask('00.000.000-0')}],
		'MA': [{mask: new StringMask('000000000')}],
		'MG': [{mask: new StringMask('000.000.000/0000')}],
		'MS': [{mask: new StringMask('000000000')}],
		'MT': [{mask: new StringMask('0000000000-0')}],
		'PA': [{mask: new StringMask('00-000000-0')}],
		'PB': [{mask: new StringMask('00000000-0')}],
		'PE': [{chars: 9, mask: new StringMask('0000000-00')},
			   {mask: new StringMask('00.0.000.0000000-0')}],
		'PI': [{mask: new StringMask('000000000')}],
		'PR': [{mask: new StringMask('000.00000-00')}],
		'RJ': [{mask: new StringMask('00.000.00-0')}],
		'RN': [{chars: 9, mask: new StringMask('00.000.000-0')},
			   {mask: new StringMask('00.0.000.000-0')}],
		'RO': [{mask: new StringMask('0000000000000-0')}],
		'RR': [{mask: new StringMask('00000000-0')}],
		'RS': [{mask: new StringMask('000/0000000')}],
		'SC': [{mask: new StringMask('000.000.000')}],
		'SE': [{mask: new StringMask('00000000-0')}],
		'SP': [{mask: new StringMask('000.000.000.000')},
			   {mask: new StringMask('-00000000.0/000')}],
		'TO': [{mask: new StringMask('00000000000')}]
	};

	function clearValue (value) {
		if(!value) {
			return value;
		}
		return value.replace(/[^0-9]/g, '');
	}

	function getMask(uf, value) {
		if(!uf || !ieMasks[uf]) {
			return undefined;
		}
		var _uf = uf.toUpperCase();
		if (_uf === 'SP' && /^P/i.test(value)) {
			return ieMasks.SP[1].mask;
		}
		var masks = ieMasks[uf];
		var i = 0;
		while(masks[i].chars && masks[i].chars < clearValue(value).length && i < masks.length - 1) {
			i++;
		}
		return masks[i].mask;
	}

	function applyIEMask (value, uf, ctrl) {
		var mask = getMask(uf, value);
		if(!value || !mask) {
			ctrl.$setValidity('ie', true);
			return value;
		}
		var processed = mask.process(clearValue(value));
		ctrl.$setValidity('ie', BrV.ie(uf).validate(value));
		var formatedValue = processed.result;
		if (uf && uf.toUpperCase() === 'SP' && /^p/i.test(value)) {
			return 'P'+(formatedValue ? formatedValue.trim().replace(/[^0-9]$/, '') : '');
		}
		if(!formatedValue) {
			return formatedValue;
		}
		return formatedValue.trim().replace(/[^0-9]$/, '');
	}

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attrs, ctrl) {
			var state = $parse(attrs.uiBrIeMask)(scope);

			if (!ctrl) {
				return;
			}

			scope.$watch(attrs.uiBrIeMask, function(newState) {
				state = newState;
				applyIEMask(ctrl.$viewValue, state, ctrl);
			});

			ctrl.$formatters.push(function(value) {
				return applyIEMask(value, state, ctrl);
			});

			ctrl.$parsers.push(function(value) {
				if (!value) {
					return applyIEMask(value, state, ctrl);
				}

				var formatedValue = applyIEMask(value, state, ctrl);

				if (ctrl.$viewValue !== formatedValue) {
					ctrl.$setViewValue(formatedValue);
					ctrl.$render();
				}

				if (state && state.toUpperCase() === 'SP' && /^p/i.test(value)) {
					return 'P'+clearValue(formatedValue);
				}
				return clearValue(formatedValue);
			});
		}
	};
}]);

'use strict';

angular.module('ui.utils.masks', [
	'ui.utils.masks.helpers',
	'ui.utils.masks.number',
	'ui.utils.masks.percentage',
	'ui.utils.masks.money',
	'ui.utils.masks.phone',
	'ui.utils.masks.cep',
	'ui.utils.masks.ie',
	'ui.utils.masks.cpfCnpj',
	'ui.utils.masks.date',
	'ui.utils.masks.time',
	'ui.utils.masks.scientific-notation',
	'ui.utils.masks.nfe'
])
.config(['$logProvider', function($logProvider) {
	$logProvider.debugEnabled(false);
}]);

'use strict';

angular.module('ui.utils.masks.money', [])
.directive('uiMoneyMask',
	['$locale', '$parse', 'PreFormatters', 'NumberValidators',
	function ($locale, $parse, PreFormatters, NumberValidators) {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attrs, ctrl) {
				var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
					thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
					currencySym = $locale.NUMBER_FORMATS.CURRENCY_SYM,
					decimals = parseInt(attrs.uiMoneyMask);

				if (!ctrl) {
					return;
				}

				if (angular.isDefined(attrs.uiHideGroupSep)){
					thousandsDelimiter = '';
				}

				if(isNaN(decimals)) {
					decimals = 2;
				}
				var decimalsPattern = decimals > 0 ? decimalDelimiter + new Array(decimals + 1).join('0') : '';
				var maskPattern = currencySym+' #'+thousandsDelimiter+'##0'+decimalsPattern;
				var moneyMask = new StringMask(maskPattern, {reverse: true});

				ctrl.$formatters.push(function(value) {
					if(angular.isUndefined(value)) {
						return value;
					}

					var valueToFormat = PreFormatters.prepareNumberToFormatter(value, decimals);
					return moneyMask.apply(valueToFormat);
				});

				function parse(value) {
					if (!value) {
						return value;
					}

					var actualNumber = value.replace(/[^\d]+/g,'');
					actualNumber = actualNumber.replace(/^[0]+([1-9])/,'$1');
					var formatedValue = moneyMask.apply(actualNumber);

					if (value !== formatedValue) {
						ctrl.$setViewValue(formatedValue);
						ctrl.$render();
					}

					return formatedValue ? parseInt(formatedValue.replace(/[^\d]+/g,''))/Math.pow(10,decimals) : null;
				}

				ctrl.$parsers.push(parse);

				if (attrs.uiMoneyMask) {
					scope.$watch(attrs.uiMoneyMask, function(decimals) {
						if(isNaN(decimals)) {
							decimals = 2;
						}
						decimalsPattern = decimals > 0 ? decimalDelimiter + new Array(decimals + 1).join('0') : '';
						maskPattern = currencySym+' #'+thousandsDelimiter+'##0'+decimalsPattern;
						moneyMask = new StringMask(maskPattern, {reverse: true});

						parse(ctrl.$viewValue || '');
					});
				}

				if(attrs.min){
					ctrl.$parsers.push(function(value) {
						var min = $parse(attrs.min)(scope);
						return NumberValidators.minNumber(ctrl, value, min);
					});

					scope.$watch(attrs.min, function(value) {
						NumberValidators.minNumber(ctrl, ctrl.$modelValue, value);
					});
				}

				if(attrs.max) {
					ctrl.$parsers.push(function(value) {
						var max = $parse(attrs.max)(scope);
						return NumberValidators.maxNumber(ctrl, value, max);
					});

					scope.$watch(attrs.max, function(value) {
						NumberValidators.maxNumber(ctrl, ctrl.$modelValue, value);
					});
				}
			}
		};
	}
]);

'use strict';

angular.module('ui.utils.masks.nfe', [])
.directive('uiNfeAccessKeyMask', ['$log', function($log) {
	var nfeAccessKeyMask = new StringMask('0000 0000 0000 0000 0000' +
		' 0000 0000 0000 0000 0000 0000');

	function clearValue (value) {
		if (angular.isUndefined(value) || value.length === 0) {
			return value;
		}

		return value.replace(/[^0-9]/g, '').slice(0, 44);
	}

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			function formatter (value) {
				$log.debug('[uiNfeAccessKeyMask] Formatter called: ', value);
				if(angular.isUndefined(value) || value.length === 0) {
					return value;
				}

				var formattedValue = nfeAccessKeyMask.apply(value);
				return formattedValue.replace(/[^0-9]$/, '');
			}

			function parser (value) {
				$log.debug('[uiNfeAccessKeyMask] Parser called: ', value);

				var modelValue = clearValue(value);
				var viewValue = formatter(modelValue);

				if(ctrl.$viewValue !== viewValue) {
					ctrl.$setViewValue(viewValue);
					ctrl.$render();
				}

				return modelValue;
			}

			function validator (value) {
				$log.debug('[uiNfeAccessKeyMask] Validator called: ', value);

				if(angular.isUndefined(value)) {
					return value;
				}

				var isValid = value.toString().length === 44;

				ctrl.$setValidity('nfe-access-key', ctrl.$isEmpty(value) || isValid);
				return value;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$formatters.push(validator);
			ctrl.$parsers.push(parser);
			ctrl.$parsers.push(validator);
		}
	};
}]);

'use strict';

angular.module('ui.utils.masks.number', [])
.directive('uiNumberMask',
	['$locale', '$parse', 'PreFormatters', 'NumberMasks', 'NumberValidators',
	function ($locale, $parse, PreFormatters, NumberMasks, NumberValidators) {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attrs, ctrl) {
				var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
					thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
					decimals = $parse(attrs.uiNumberMask)(scope);

				if (!ctrl) {
					return;
				}

				if (angular.isDefined(attrs.uiHideGroupSep)){
					thousandsDelimiter = '';
				}

				if(isNaN(decimals)) {
					decimals = 2;
				}
				var viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter),
					modelMask = NumberMasks.modelMask(decimals);

				function parse(value) {
					if(!value) {
						return value;
					}

					var valueToFormat = PreFormatters.clearDelimitersAndLeadingZeros(value) || '0';
					var formatedValue = viewMask.apply(valueToFormat);
					var actualNumber = parseFloat(modelMask.apply(valueToFormat));

					if(angular.isDefined(attrs.uiNegativeNumber)){
						var isNegative = (value[0] === '-'),
							needsToInvertSign = (value.slice(-1) === '-');

						//only apply the minus sign if it is negative or(exclusive)
						//needs to be negative and the number is different from zero
						if(needsToInvertSign ^ isNegative && !!actualNumber) {
							actualNumber *= -1;
							formatedValue = '-' + formatedValue;
						}
					}

					if (ctrl.$viewValue !== formatedValue) {
						ctrl.$setViewValue(formatedValue);
						ctrl.$render();
					}

					return actualNumber;
				}

				ctrl.$formatters.push(function(value) {
					var prefix = '';
					if(angular.isDefined(attrs.uiNegativeNumber) && value < 0){
						prefix = '-';
					}

					if(!value) {
						return value;
					}

					var valueToFormat = PreFormatters.prepareNumberToFormatter(value, decimals);
					return prefix + viewMask.apply(valueToFormat);
				});

				ctrl.$parsers.push(parse);

				if (attrs.uiNumberMask) {
					scope.$watch(attrs.uiNumberMask, function(decimals) {
						if(isNaN(decimals)) {
							decimals = 2;
						}
						viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter);
						modelMask = NumberMasks.modelMask(decimals);

						parse(ctrl.$viewValue || '');
					});
				}

				if(attrs.min){
					ctrl.$parsers.push(function(value) {
						var min = $parse(attrs.min)(scope);
						return NumberValidators.minNumber(ctrl, value, min);
					});

					scope.$watch(attrs.min, function(value) {
						NumberValidators.minNumber(ctrl, ctrl.$modelValue, value);
					});
				}

				if(attrs.max) {
					ctrl.$parsers.push(function(value) {
						var max = $parse(attrs.max)(scope);
						return NumberValidators.maxNumber(ctrl, value, max);
					});

					scope.$watch(attrs.max, function(value) {
						NumberValidators.maxNumber(ctrl, ctrl.$modelValue, value);
					});
				}
			}
		};
	}
]);

'use strict';

angular.module('ui.utils.masks.percentage', [])
.directive('uiPercentageMask',
	['$locale', '$parse', 'PreFormatters', 'NumberMasks', 'NumberValidators',
	function ($locale, $parse, PreFormatters, NumberMasks, NumberValidators) {
		function preparePercentageToFormatter (value, decimals) {
			return PreFormatters.clearDelimitersAndLeadingZeros((parseFloat(value)*100).toFixed(decimals));
		}

		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attrs, ctrl) {
				var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
					thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
					decimals = parseInt(attrs.uiPercentageMask);

				if (!ctrl) {
					return;
				}

				if (angular.isDefined(attrs.uiHideGroupSep)){
					thousandsDelimiter = '';
				}

				if(isNaN(decimals)) {
					decimals = 2;
				}
				var numberDecimals = decimals + 2;
				var viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter),
					modelMask = NumberMasks.modelMask(numberDecimals);

				ctrl.$formatters.push(function(value) {
					if(!value) {
						return value;
					}

					var valueToFormat = preparePercentageToFormatter(value, decimals);
					return viewMask.apply(valueToFormat) + ' %';
				});

				function parse(value) {
					if(!value) {
						return value;
					}

					var valueToFormat = PreFormatters.clearDelimitersAndLeadingZeros(value) || '0';
					if(value.length > 1 && value.indexOf('%') === -1) {
						valueToFormat = valueToFormat.slice(0,valueToFormat.length-1);
					}
					var formatedValue = viewMask.apply(valueToFormat) + ' %';
					var actualNumber = parseFloat(modelMask.apply(valueToFormat));

					if (ctrl.$viewValue !== formatedValue) {
						ctrl.$setViewValue(formatedValue);
						ctrl.$render();
					}

					return actualNumber;
				}

				ctrl.$parsers.push(parse);

				if (attrs.uiPercentageMask) {
					scope.$watch(attrs.uiPercentageMask, function(decimals) {
						if(isNaN(decimals)) {
							decimals = 2;
						}
						numberDecimals = decimals + 2;
						viewMask = NumberMasks.viewMask(decimals, decimalDelimiter, thousandsDelimiter);
						modelMask = NumberMasks.modelMask(numberDecimals);

						parse(ctrl.$viewValue || '');
					});
				}

				if(attrs.min){
					ctrl.$parsers.push(function(value) {
						var min = $parse(attrs.min)(scope);
						return NumberValidators.minNumber(ctrl, value, min);
					});

					scope.$watch('min', function(value) {
						NumberValidators.minNumber(ctrl, ctrl.$modelValue, value);
					});
				}

				if(attrs.max) {
					ctrl.$parsers.push(function(value) {
						var max = $parse(attrs.max)(scope);
						return NumberValidators.maxNumber(ctrl, value, max);
					});

					scope.$watch('max', function(value) {
						NumberValidators.maxNumber(ctrl, ctrl.$modelValue, value);
					});
				}
			}
		};
	}
]);

'use strict';

/* global angular: true */
/* jshint quotmark: false */
/* jshint maxlen: false */

var plans = {
    "AF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^937[05789][0-9]{6,7}$"
        ]
    },
    "AL": {
        "countryDialingCode": 355,
        "nationalDialingPrefix": 0,
        "format": [
            "^3556[7-9][0-9]{7}$"
        ]
    },
    "DZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^213[5-9][0-9]{7}$",
            "^213(55|66|77)[0-9]{7}$",
            "^213(79[0-6]|69[7-9])[0-9]{6}$"
        ]
    },
    "AR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^54[0-9]{10}$"
        ]
    },
    "AS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1684(25[248]|73[13])[0-9]{4}$"
        ]
    },
    "AD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^376[346][0-9]{5}$"
        ]
    },
    "AO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2449[12][0-9]{7}$"
        ]
    },
    "AI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1264(235|476|5(3[6-9]|8[1-4])|7(29|72))[0-9]{4}$"
        ]
    },
    "AG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1268(464|7(64|7[0-5]|8[358]))[0-9]{4}$",
            "^126872[0-9]{5}$"
        ]
    },
    "AM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^374(77|99|9[1-4])[0-9]{6}$"
        ]
    },
    "AW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^297(56|59|96)[0-9]{5}$",
            "^297(990|99[2-9])[0-9]{4}$"
        ]
    },
    "AU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^614[0-1][0-9]{7}$",
            "^614(2([1-4]|[7-9])|3([0-4]|[7-9])|4[89])[0-9]{6}$",
            "^61425([1-3]|[6-8])[0-9]{5}$"
        ]
    },
    "AT": {
        "countryDialingCode": 43,
        "nationalDialingPrefix": 0,
        "format": [
            "^436[7-9][0-9]{5,11}$",
            "^436(44|5([0-3]|[579])|6[01]|6[3-9])[0-9]{4,10}$"
        ]
    },
    "AZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^994(40|5[015]|70)[0-9]{7}$",
            "^99460540[0-9]{4}$"
        ]
    },
    "BS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1242(357|359|457|557)[0-9]{4}$"
        ]
    },
    "BH": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9733[69][0-9]{6}$",
            "^973377[0-9]{5}$",
            "^973383[0-9]{5}$"
        ]
    },
    "BD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^8801[1-9][0-9]{8}$"
        ]
    },
    "BB": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^124626[0-9]{5,8}$"
        ]
    },
    "BY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^375(29|44|33)[0-9]{7}$",
            "^375259[0-9]{6}$"
        ]
    },
    "BE": {
        "countryDialingCode": 32,
        "nationalDialingPrefix": 0,
        "format": [
            "^324[0-9]{8}$"
        ]
    },
    "BZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^501(62[01])[0-9]{4}$",
            "^501(6[67])[0-9]{5}$"
        ]
    },
    "BJ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2299[0-9]{7}$"
        ]
    },
    "BM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1441([37][0-9]{6}|5[0-3][0-9]{5}|59[09][0-9]{4})$"
        ]
    },
    "BT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^97517[0-9]{6}$"
        ]
    },
    "BO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5917(0[6-8]|1([01]|[4-9])|2([0-2]|[89])|7[0-5])[0-9]{5}$",
            "^5917(11[2-4]|24[015])[0-9]{4}$"
        ]
    },
    "BA": {
        "countryDialingCode": 387,
        "nationalDialingPrefix": 0,
        "format": [
            "^3876[12356][0-9]{6,7}$"
        ]
    },
    "BW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2677[34][0-9]{6}$"
        ]
    },
    "BR": {
        "countryDialingCode": '55',
        "mask": "(00) 00000-0000",
        "nationalDialingPrefix": null,
        "format": [
            "^55(1[1-9]|2[12478]|3[1234578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])[89][0-9]{7}$"
        ]
    },
    "VI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1284(30[0-3]|44[0-5]|4(68|96|99)|54[0-4])[0-9]{4}$"
        ]
    },
    "BN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^673[78][0-9]{6}$"
        ]
    },
    "BG": {
        "countryDialingCode": 359,
        "nationalDialingPrefix": 0,
        "format": [
            "^359(4[38]|8[789]|98)[0-9]{5,7}$"
        ]
    },
    "BF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2267[01568][0-9]{6}$"
        ]
    },
    "BI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^257(2955|795[6-9])[0-9]{4}$",
            "^2577(66|77|88|99)[0-9]{5}$"
        ]
    },
    "KH": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^855[19][0-9]{7,8}$"
        ]
    },
    "CA": {
        "countryDialingCode": 1,
        "nationalDialingPrefix": 1,
        "format": [
            "^1(403|250|289|204|306|403|289|587|780|604|778|250|204|506|709|867|906|289|519|226|705|613|807|416|647|902|418|581|450|514|438|819|306|867)[0-9]{7}$"
        ]
    },
    "CL": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^56[89][0-9]{7,8}$"
        ]
    },
    "CM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^237[79][0-9]{7}$"
        ]
    },
    "CV": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2389[0-9]{6}$"
        ]
    },
    "KY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1345(32([3-7]|9)|5(1[467]|2[5-7]|4[5-9])|9(1[679]|2[4-9]|3[089]))[0-9]{4}$"
        ]
    },
    "CF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2367[0257][0-9]{6}$"
        ]
    },
    "TD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^235(620|679|980)[0-9]{4}$"
        ]
    },
    "CN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^861[35][0-9]{9}$",
            "^86189[0-9]{8}$"
        ]
    },
    "CO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^573(00|1[012356])[0-9]{7}$"
        ]
    },
    "KM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2693[23][0-9]{5}$"
        ]
    },
    "CG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^242[4-6][0-9]{6}$"
        ]
    },
    "CD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^243(68|80|81|88|98|99)[0-9]{7}$"
        ]
    },
    "CK": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6827[0-9]{4}$"
        ]
    },
    "CR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5068[0-9]{6,7}$"
        ]
    },
    "CI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2250[0-9]{7}$",
            "^225(4[4-8]|6[067])[0-9]{6}$"
        ]
    },
    "HR": {
        "countryDialingCode": 385,
        "nationalDialingPrefix": 0,
        "format": [
            "^3859[12589][0-9]{7,10}$"
        ]
    },
    "CU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^535[0-9]{6,7}$"
        ]
    },
    "CY": {
        "countryDialingCode": 357,
        "nationalDialingPrefix": null,
        "format": [
            "^3579(6|7[67]|9[0-689])[0-9]{5,6}$",
            "^357997[14-9][0-9]{4}$"
        ]
    },
    "CZ": {
        "countryDialingCode": 420,
        "nationalDialingPrefix": null,
        "format": [
            "^42060[1-8][0-9]{6}$",
            "^4207[2379][0-9]{7}$"
        ]
    },
    "DK": {
        "countryDialingCode": 45,
        "nationalDialingPrefix": null,
        "format": [
            "^452[0-9]{7}$",
            "^45(3[01]|4[01]|5[0-2]|6[01])[0-9]{6}$"
        ]
    },
    "DJ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2536[0-9]{5}$",
            "^2538[0-5][0-9]{4}$"
        ]
    },
    "DM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1767(2(25|35|45|65|7[567])|31[567]|61[456])[0-9]{4}$"
        ]
    },
    "DO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1809[0-9]{7}$",
            "^1829[0-9]{7}$",
            "^1849[0-9]{7}$"
        ]
    },
    "TL": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6707[0-9]{6}$"
        ]
    },
    "EC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^593(8|9)[0-9]{6}$"
        ]
    },
    "EG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^201[01268][0-9]{7}$"
        ]
    },
    "SV": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5037[0-9]{7}$"
        ]
    },
    "GQ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^240[256][0-9]{5}$"
        ]
    },
    "ER": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^29117[1-3][0-9]{4}$",
            "^2917[0-9]{6}$"
        ]
    },
    "EE": {
        "countryDialingCode": 372,
        "nationalDialingPrefix": null,
        "format": [
            "^3728[1-5][0-9]{6}$",
            "^3725[0-9]{6,7}$"
        ]
    },
    "ET": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^25191[0-9]{7}$"
        ]
    },
    "FK": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^500[56][0-9]{4}$"
        ]
    },
    "FO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2982[0-9]{5}$",
            "^298(7[5-9]|9[1-5])[0-9]{4}$"
        ]
    },
    "FJ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^679(7[0-4]|9[29])[0-9]{5}$"
        ]
    },
    "FR": {
        "countryDialingCode": 33,
        "nationalDialingPrefix": 0,
        "format": [
            "^33[67][0-9]{8}$"
        ]
    },
    "GF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^594694[0-9]{6}$"
        ]
    },
    "PF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^689[27][0-9]{5}$",
            "^6893[01][0-9]{4}$",
            "^68975[48][0-9]{3}$",
            "^6894114[0-9]{2}$"
        ]
    },
    "GA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2410[567][0-9]{6}$"
        ]
    },
    "GM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^220(7[02789]|9[7-9])[0-9]{5}$",
            "^22077[05-9][0-9]{4}$"
        ]
    },
    "GE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^995(5[578]|77|93)[0-9]{6}$"
        ]
    },
    "DE": {
        "countryDialingCode": 49,
        "nationalDialingPrefix": 0,
        "format": [
            "^4915(05|1[125]|2[025]|7[03578])[0-9]{7}$",
            "^491(6[023489]|7[0-9])[0-9]{7,8}$"
        ]
    },
    "FI": {
        "countryDialingCode": 358,
        "nationalDialingPrefix": 0,
        "format": [
            "^358(4[0-9]|50)[0-9]{7}$"
        ]
    },
    "GH": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^233(2[36]|54)[0-9]{7}$"
        ]
    },
    "GI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^350(5[4678]|60)[0-9]{6}$"
        ]
    },
    "GR": {
        "countryDialingCode": 30,
        "nationalDialingPrefix": null,
        "format": [
            "^309[347][0-9]{8}$",
            "^3069[0349][0-9]{7}$"
        ]
    },
    "GL": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^299(49|5[2-9])[0-9]{4}$"
        ]
    },
    "GD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1473(53[3-8]|4(0[3-79]|1[04-9]|20|58))[0-9]{4}$"
        ]
    },
    "GP": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^590690[0-9]{6}$"
        ]
    },
    "GU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1671(48[238]|726|8[6-9]8)|9(22|69))[0-9]{4}$"
        ]
    },
    "GT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^502[45][0-9]{7}$"
        ]
    },
    "GW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^245[567][0-9]{6}$"
        ]
    },
    "GN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2246[02-7][0-9]{6}$"
        ]
    },
    "GY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5926[0-9]{6}$"
        ]
    },
    "GG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^447839[1278][0-9]{5}$",
            "^447781[0-9]{6}$"
        ]
    },
    "HT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^509(3[3-9]|40|9[04])[0-9]{5,6}$"
        ]
    },
    "HN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^504[3789][0-9]{7}$"
        ]
    },
    "HK": {
        "countryDialingCode": 852,
        "nationalDialingPrefix": null,
        "format": [
            "^852[569][0-9]{7}$"
        ]
    },
    "HU": {
        "countryDialingCode": 36,
        "nationalDialingPrefix": 6,
        "format": [
            "^36[237]0[0-9]{5,7}$"
        ]
    },
    "IE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^35308[235-9][0-9]{5,6}$"
        ]
    },
    "IS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^354(95[48]|77[0-3])[0-9]{4}$",
            "^354(6|8|38[089])[0-9]{6}$"
        ]
    },
    "IN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^919[0-9]{9}$",
            "^9110[1-4][0-9]{8}$"
        ]
    },
    "ID": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6281[16]0[0-9]{6}$",
            "^628[23][0-9]{7}$",
            "^6281(1[1-9]|[235-9])[0-9]{6,7}$",
            "^628[568][0-9]{7,8}$",
            "^6281(1[1-9]|[235-9])[0-9]{5}$"
        ]
    },
    "IR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9891[2678][0-9]{7}$"
        ]
    },
    "IQ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^96407[5789][0-9]{8}$"
        ]
    },
    "IL": {
        "countryDialingCode": 972,
        "nationalDialingPrefix": 0,
        "format": [
            "^972[0-9]{9}$"
        ]
    },
    "IM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^447924[0-4][0-9]{5}$"
        ]
    },
    "IT": {
        "countryDialingCode": 39,
        "nationalDialingPrefix": 0,
        "format": [
            "^393[0-9]{8,9}$"
        ]
    },
    "JM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1876[2-9][0-9]{6}$"
        ]
    },
    "JP": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^81[89]0[0-9]{8}$"
        ]
    },
    "JE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^447(509[0125]|5372|700[378]|797[7-9]|82(23|9[789])|9780)[0-9]{5}$",
            "^447937[0-9]{6}$"
        ]
    },
    "JO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^96274(5[4-7]|66|77)[0-9]{5}$",
            "^9627(7[569]|8[568]|9[0567])[0-9]{6}$"
        ]
    },
    "KZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^77(0[01257]|6[0-3]|77)[0-9]{7}$",
            "^77(1[2-578]9[01]|2([13-7]9[01]|758))[0-9]{5}$"
        ]
    },
    "KE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^254(7[237]|84)[0-9]{7,8}$"
        ]
    },
    "KI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^686(30|69)[0-9]{3}$"
        ]
    },
    "KP": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^85019[0-9]{5}$"
        ]
    },
    "KR": {
        "countryDialingCode": 82,
        "nationalDialingPrefix": 0,
        "format": [
            "^821[016-9][0-9]{7,8}$"
        ]
    },
    "KW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^965[569][0-9]{6,7}$"
        ]
    },
    "KG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^996(5[14-7]|77)[0-9]{7}$",
            "^996700[0-9]{6}$"
        ]
    },
    "LA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^85620[0-9]{7}$"
        ]
    },
    "LV": {
        "countryDialingCode": 371,
        "nationalDialingPrefix": null,
        "format": [
            "^3712[0-9]{6,7}$"
        ]
    },
    "LB": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^961(3|70)[0-9]{6}$"
        ]
    },
    "LS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^266[56][0-9]{7}$"
        ]
    },
    "LR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^231(4[0167]|6[4-9])[0-9]{5}$",
            "^2315[0-9]{6}$",
            "^2317[0-9]{7}$"
        ]
    },
    "LY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2189[12][0-9]{7}$"
        ]
    },
    "LI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^4236[0-9]{6,8}$"
        ]
    },
    "LT": {
        "countryDialingCode": 370,
        "nationalDialingPrefix": 0,
        "format": [
            "^3706[0-9]{7}$"
        ]
    },
    "LU": {
        "countryDialingCode": 352,
        "nationalDialingPrefix": null,
        "format": [
            "^3526[0-9]{8}$"
        ]
    },
    "MO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^85366[0-9]{6}$"
        ]
    },
    "MK": {
        "countryDialingCode": 389,
        "nationalDialingPrefix": 0,
        "format": [
            "^3897[0125-8][0-9]{6}$"
        ]
    },
    "MX": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^52[0-9]{10}$"
        ]
    },
    "MG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2613[0-3][0-9]{7}$"
        ]
    },
    "MW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^265[4589][0-9]{6}$"
        ]
    },
    "MY": {
        "countryDialingCode": 60,
        "nationalDialingPrefix": 0,
        "format": [
            "^601[0-9]{7,8}$"
        ]
    },
    "MV": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^960(7[6-9]|9[6-9])[0-9]{5}$"
        ]
    },
    "ML": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^223[67][0-9]{7}$"
        ]
    },
    "MT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^356[79][79][0-9]{6}$",
            "^356981[12][0-9]{4}$"
        ]
    },
    "MH": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^692(45|62|23)5[0-9]{4}$"
        ]
    },
    "MQ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^596696[0-9]{6}$"
        ]
    },
    "MR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2226[34][0-9]{5}$"
        ]
    },
    "MU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2307[0-9]{6}$",
            "^230(49|9[134578])[0-9]{5}$",
            "^230(42[12389]|87[1567])[0-9]{4}$"
        ]
    },
    "YT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^269639[0-9]{6}$"
        ]
    },
    "FM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6919[2357]0[0-9]{4}$"
        ]
    },
    "MD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^373(6([589]0|7[12])|7[89]0)[0-9]{5}$"
        ]
    },
    "MC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^377[46][0-9]{7,8}$"
        ]
    },
    "MN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^976(88|9[1569])[0-9]{6}$"
        ]
    },
    "ME": {
        "countryDialingCode": 382,
        "nationalDialingPrefix": 0,
        "format": [
            "^382(6[379]|70)[0-9]{3,10}$",
            "^38268[0-9]{2,10}$"
        ]
    },
    "MS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1664492[0-9]{4}$"
        ]
    },
    "MA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^212[167][0-9]{7}$",
            "^212(4[0124-8]|5[01])[0-9]{6}$"
        ]
    },
    "MZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^258[89][0-9]{8}$"
        ]
    },
    "MM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^959[0-9]{7,8}$"
        ]
    },
    "NA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^26481[0-9]{7}$"
        ]
    },
    "NR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^674555[0-9]{4}$"
        ]
    },
    "NL": {
        "countryDialingCode": 31,
        "nationalDialingPrefix": 0,
        "format": [
            "^316[0-9]{8}$"
        ]
    },
    "AN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^599([59]4|98)[0-9]{5}$",
            "^599(318|416|5(25|8[239])|71[578]|9(50|7[34]))[0-9]{4}$",
            "^5999(7(2[0-3]|6[3567]|777))[0-9]{3}$"
        ]
    },
    "NC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6879[0-9]{5}$",
            "^687(7[5-9]|8[0-79])[0-9]{4}$"
        ]
    },
    "NZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^642[01345789][0-9]{6,8}$"
        ]
    },
    "NI": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^505[68][0-9]{6}$"
        ]
    },
    "NE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2779[0-9]{7}$"
        ]
    },
    "NG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^23490[0-9]{6}$",
            "^234(703|80[2-7])[0-9]{7}$"
        ]
    },
    "NF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^67238[0-9]{4}$"
        ]
    },
    "NO": {
        "countryDialingCode": 47,
        "nationalDialingPrefix": null,
        "format": [
            "^47[49][0-9]{7,8}$"
        ]
    },
    "OM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9689[25-9][0-9]{6}$"
        ]
    },
    "PK": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^923[0-9]{9}$"
        ]
    },
    "PW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^680(6[234689]0|77[59])[0-9]{4}$"
        ]
    },
    "PS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9705[59][0-9]{7}$"
        ]
    },
    "PA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5076[0-9]{6,7}$"
        ]
    },
    "PG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^675170[0-9]{2}$",
            "^675189[0-9]$",
            "^6756[1-3][0-9]{6}$",
            "^6756[5-9][0-9]{5}$"
        ]
    },
    "PY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5959[0-9]{8}$"
        ]
    },
    "PE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^519[0-9]{9,10}$",
            "^5119[0-9]{8}$"
        ]
    },
    "PH": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^639[0-9]{8,9}$"
        ]
    },
    "PL": {
        "countryDialingCode": 48,
        "nationalDialingPrefix": 0,
        "format": [
            "^48(5[01]|6[069]|7[89]|88)[0-9]{7}$",
            "^4872[12][0-9]{6}$"
        ]
    },
    "PT": {
        "countryDialingCode": 351,
        "nationalDialingPrefix": null,
        "format": [
            "^3519[0-9]{8}$"
        ]
    },
    "PR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1(787|939)[0-9]{10}$"
        ]
    },
    "QA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^974[356][0-9]{6}$"
        ]
    },
    "RE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^26269[23][0-9]{6}$"
        ]
    },
    "RO": {
        "countryDialingCode": 40,
        "nationalDialingPrefix": 0,
        "format": [
            "^407(2[0123]|4[045]|61|62|66|88)[0-9]{6}$"
        ]
    },
    "RU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^79[0-9]{9}$"
        ]
    },
    "RW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2500[358][0-9]{6}$"
        ]
    },
    "KN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1869(5(5[678]|6[567])|66[2-57-9]|76[2-5])[0-9]{4}$"
        ]
    },
    "LC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1758(28[4-7]|384|4(6[01]|8[4-9])|5(1[89]|20|84)|72[034])[0-9]{4}$",
            "^175871[0-9]{5}$"
        ]
    },
    "PM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^50855[0-9]{4}$"
        ]
    },
    "VC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1784(4(3[0124]|5[45]|9[2-5])|5(2[6-9]|3[0-3]|93))[0-9]{4}$"
        ]
    },
    "WS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6857[2567][0-9]{5}$"
        ]
    },
    "SM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^3786[0-9]{8,12}$"
        ]
    },
    "ST": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^23960[0-9]{4}$"
        ]
    },
    "SA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9665[0-9]{8}$"
        ]
    },
    "SN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2217[67][0-9]{7}$"
        ]
    },
    "RS": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^3816[0-9]{3,11}$"
        ]
    },
    "SC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^248[579][0-9]{5}$"
        ]
    },
    "SL": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^232(25|3[03]|40|5[05]|7[678]|88)[0-9]{6}$"
        ]
    },
    "SG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^65525[0-9]{5}$",
            "^6581[0-9]{6}$"
        ]
    },
    "SK": {
        "countryDialingCode": 421,
        "nationalDialingPrefix": 0,
        "format": [
            "^4219[01][0-9]{7}$",
            "^421949[01][0-9]{6}$"
        ]
    },
    "SI": {
        "countryDialingCode": 386,
        "nationalDialingPrefix": 0,
        "format": [
            "^386(3[01]|4[01]|51|6[4-9]|7[01])[0-9]{5,6}$",
            "^386(30)[0-9]{5,6}$"
        ]
    },
    "SB": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6776[5-9][0-9]{3}$",
            "^677[89][0-9]{4}$"
        ]
    },
    "SO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2529[01][0-9]{6}$"
        ]
    },
    "ZA": {
        "countryDialingCode": 27,
        "nationalDialingPrefix": 0,
        "format": [
            "^27[78][0-9]{4,11}$"
        ]
    },
    "ES": {
        "countryDialingCode": 34,
        "nationalDialingPrefix": null,
        "format": [
            "^346[0-9]{8}$"
        ]
    },
    "LK": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^947[12578][0-9]{7}$"
        ]
    },
    "SD": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2499[12][0-9]{7}$"
        ]
    },
    "SR": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^59775[0-9]{5}$",
            "^597[89][0-9]{6}$"
        ]
    },
    "SZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2686[0-7][0-9]{4}$"
        ]
    },
    "SE": {
        "countryDialingCode": 46,
        "nationalDialingPrefix": 0,
        "format": [
            "^467[036][0-9]{5,7}$"
        ]
    },
    "CH": {
        "countryDialingCode": 41,
        "nationalDialingPrefix": 0,
        "format": [
            "^417[46-9][0-9]{7}$"
        ]
    },
    "SY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9639[0-9]{8}$"
        ]
    },
    "TW": {
        "countryDialingCode": 866,
        "nationalDialingPrefix": 0,
        "format": [
            "^8869[0-9]{7,8}$"
        ]
    },
    "TJ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9929190[0-3][0-9]{4}$",
            "^992918[68][0-9]{5}$",
            "^9929(17|27|35|51|62|73|81|98)[0-9]{6}$"
        ]
    },
    "TZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2557[1-9][0-9]{7}$"
        ]
    },
    "TH": {
        "countryDialingCode": 66,
        "nationalDialingPrefix": 0,
        "format": [
            "^668[013-9][0-9]{6,7}$"
        ]
    },
    "TG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2289(0[1-5]|4[6-9])[0-9]{4}$"
        ]
    },
    "TO": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^676(1[5-9]|4[69]|5[3-9]|6[3-9]|7[567]|8[789])[0-9]{3,5}$"
        ]
    },
    "TT": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1868(22[1-4]|4(2[01]|8[0-4])|6(20|78))[0-9]{4}$",
            "^1868(29|4[01679]|68)[0-9]{5}$",
            "^1868[37][0-9]{6}$"
        ]
    },
    "TR": {
        "countryDialingCode": 90,
        "nationalDialingPrefix": 0,
        "format": [
            "^905[0-9]{9}$"
        ]
    },
    "TM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9936[0-9]{7}$"
        ]
    },
    "TC": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1649(2(3[12]|4[1-5])|3(3[123]|4[1-5])|4(3[12]|4[12]))[0-9]{4}$"
        ]
    },
    "TV": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6889[0-9]{4}$"
        ]
    },
    "UG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2567[1578][0-9]{7}$",
            "^25670[0-4][0-9]{6}$"
        ]
    },
    "UA": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^380(39|50|6[3678]|9[1-9])[0-9]{7}$"
        ]
    },
    "US": {
        "countryDialingCode": 1,
        "nationalDialingPrefix": 1,
        "mask": "(000) 000-0000",
        "format": [
            "^1[0-9]{10}$"
        ]
    },
    "AE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9715[05][0-9]{7}$"
        ]
    },
    "GB": {
        "countryDialingCode": 44,
        "nationalDialingPrefix": 0,
        "format": [
            "^447[045789][0-9]{8}$"
        ]
    },
    "VG": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^1340(2(26|77)|3(32|44)|47[34]|677|998)[0-9]{4,7}$"
        ]
    },
    "UY": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^5989[4-9][0-9]{6,7}$"
        ]
    },
    "UZ": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9989[0-3789][0-9]{7}$"
        ]
    },
    "VU": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^678(5[45]|77)[0-9]{5}$"
        ]
    },
    "VE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^58(41|25)[24-8][0-9]{7}$"
        ]
    },
    "VN": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^841(2[1236]|6[6-9])[0-9]{7}$",
            "^84(2|4|9)[0-9]{8}$"
        ]
    },
    "WF": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^6819[0-9]{5}$"
        ]
    },
    "YE": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^9677[137][0-9]{7}$"
        ]
    },
    "ZM": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^2609[567][0-9]{6,7}$"
        ]
    },
    "ZW": {
        "countryDialingCode": null,
        "nationalDialingPrefix": null,
        "format": [
            "^263(11|23|91)[0-9]{6}$"
        ]
    }
};

angular.module('ui.utils.masks.phone-number-plans', []).constant('phoneNumberingPlans', plans);
angular.module('ui.utils.masks.phone', ['ui.utils.masks.phone-number-plans']);

angular.module('ui.utils.masks.phone').factory('PhoneValidators', [function() {

    var country, validators = {};

    function tryToValidate(msisdn, formats) {
        var i, re;
        for (i = 0; i < formats.length; i++) {
            re = new RegExp(formats[i]);
            if (re.test(msisdn)) {
              console.log('MATCHED: ', formats[i]);
                return true;
            }
        }
        return false;
    }

    function buildValidator(country, plan) {
        return function (ctrl, value) {
            var valid;
            value = value || '';
            value = value.replace(/[^0-9]/g, '');

            // TODO: remove national dialing prefix and try that also
            valid = ctrl.$isEmpty(value) || tryToValidate(value, plan.format) ||
              tryToValidate(plan.countryDialingCode + value, plan.format);

            ctrl.$setValidity(country.toLowerCase() + '-phone-number', valid);
            return value;
        };
    }

    // build a validator for every plan possible
    for (country in plans) {
        if (!plans.hasOwnProperty(country)) {
            continue;
        }
        // plan not implemented yet
        if (!plans[country].countryDialingCode) {
            continue;
        }
        validators[country.toLowerCase() + 'PhoneNumber'] = buildValidator(country, plans[country]);
    }

    return validators;
}]);

angular.module('ui.utils.masks.phone').directive('uiPhoneNumber', ['PhoneValidators', function(PhoneValidators) {

    function clearValue (value) {
        if(!value) {
            return value;
        }

        return value.replace(/[^0-9]/g, '');
    }

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ctrl) {
            /* global StringMask */
            var country, phoneMask;

            country = (attrs.uiPhoneNumber || '').toUpperCase();
            phoneMask = new StringMask(plans[country].mask);

            function applyPhoneMask (value) {
                var formattedValue;

                if(!value) {
                    return value;
                }

                formattedValue = phoneMask.apply(value);
                return formattedValue.trim().replace(/[^0-9]$/, '');
            }

            if (!ctrl) {
                return;
            }

            ctrl.$formatters.push(function(value) {
                return applyPhoneMask(PhoneValidators[country.toLowerCase() + 'PhoneNumber'](ctrl, value));
            });

            ctrl.$parsers.push(function(value) {
                var cleanValue, formattedValue;

                if (!value) {
                    return value;
                }

                cleanValue = clearValue(value);
                formattedValue = applyPhoneMask(cleanValue);

                if (ctrl.$viewValue !== formattedValue) {
                    ctrl.$setViewValue(formattedValue);
                    ctrl.$render();
                }

                return clearValue(formattedValue);
            });

            ctrl.$parsers.push(function(value) {
                return PhoneValidators[country.toLowerCase() + 'PhoneNumber'](ctrl, value);
            });
        }
    };
}]);

'use strict';

angular.module('ui.utils.masks.scientific-notation', [])
.directive('uiScientificNotationMask', ['$locale', '$parse', '$log',
	function($locale, $parse, $log) {
		var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
			defaultPrecision = 2;

		function significandMaskBuilder (decimals) {
			var mask = '0';

			if(decimals > 0) {
				mask += decimalDelimiter;
				for (var i = 0; i < decimals; i++) {
					mask += '0';
				}
			}

			return new StringMask(mask, {
				reverse: true
			});
		}

		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				var decimals = $parse(attrs.uiScientificNotationMask)(scope);

				if(isNaN(decimals)) {
					decimals = defaultPrecision;
				}

				var significandMask = significandMaskBuilder(decimals);

				function splitNumber (value) {
					var stringValue = value.toString(),
						splittedNumber = stringValue.match(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/);

					return {
						integerPartOfSignificand: splittedNumber[1],
						decimalPartOfSignificand: splittedNumber[2],
						exponent: splittedNumber[3] | 0
					};
				}

				function formatter (value) {
					$log.debug('[uiScientificNotationMask] Formatter called: ', value);

					if (angular.isUndefined(value)) {
						return value;
					}

					if (typeof value === 'string') {
						if (value.length === 0) {
							return value;
						}

						value = value.replace(decimalDelimiter, '.');
					} else if (typeof value === 'number') {
						value = value.toExponential(decimals);
					}

					var formattedValue, exponent;
					var splittedNumber = splitNumber(value);

					var integerPartOfSignificand = splittedNumber.integerPartOfSignificand | 0;
					var numberToFormat = integerPartOfSignificand.toString();
					if (angular.isDefined(splittedNumber.decimalPartOfSignificand)) {
						numberToFormat += splittedNumber.decimalPartOfSignificand;
					}

					var needsNormalization =
						(integerPartOfSignificand >= 1 || integerPartOfSignificand <= -1) &&
						(
							(angular.isDefined(splittedNumber.decimalPartOfSignificand) &&
							splittedNumber.decimalPartOfSignificand.length > decimals) ||
							(decimals === 0 && numberToFormat.length >= 2)
						);

					if (needsNormalization) {
						exponent = numberToFormat.slice(decimals + 1, numberToFormat.length);
						numberToFormat = numberToFormat.slice(0, decimals + 1);
					}

					formattedValue = significandMask.apply(numberToFormat);

					if (splittedNumber.exponent !== 0) {
						exponent = splittedNumber.exponent;
					}

					if (angular.isDefined(exponent)) {
						formattedValue += 'e' + exponent;
					}

					return formattedValue;
				}

				function parser (value) {
					$log.debug('[uiScientificNotationMask] Parser called: ', value);

					if(angular.isUndefined(value) || value.toString().length === 0) {
						return value;
					}

					var viewValue = formatter(value),
						modelValue = parseFloat(viewValue.replace(decimalDelimiter, '.'));

					if (ctrl.$viewValue !== viewValue) {
						ctrl.$setViewValue(viewValue);
						ctrl.$render();
					}

					return modelValue;
				}

				function validator (value) {
					$log.debug('[uiScientificNotationMask] Validator called: ', value);

					if(angular.isUndefined(value)) {
						return value;
					}

					var isMaxValid = value < Number.MAX_VALUE;
					ctrl.$setValidity('max', ctrl.$isEmpty(value) || isMaxValid);
					return value;
				}

				ctrl.$formatters.push(formatter);
				ctrl.$formatters.push(validator);
				ctrl.$parsers.push(parser);
				ctrl.$parsers.push(validator);
			}
		};
	}
]);

'use strict';

angular.module('ui.utils.masks.time', [])
.directive('uiTimeMask', ['$log', function($log) {
	if(typeof StringMask === 'undefined') {
		throw new Error('StringMask not found. Check if it is available.');
	}

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attrs, ctrl) {
			var unformattedValueLength = 6,
				formattedValueLength = 8,
				timeFormat = '00:00:00';

			if (angular.isDefined(attrs.uiTimeMask) && attrs.uiTimeMask === 'short') {
				unformattedValueLength = 4;
				formattedValueLength = 5;
				timeFormat = '00:00';
			}

			var timeMask = new StringMask(timeFormat);

			function clearValue (value) {
				if(angular.isUndefined(value) || value.length === 0) {
					return value;
				}

				return value.replace(/[^0-9]/g, '').slice(0, unformattedValueLength);
			}

			function formatter (value) {
				$log.debug('[uiTimeMask] Formatter called: ', value);
				if(angular.isUndefined(value) || value.length === 0) {
					return value;
				}

				var formattedValue = timeMask.process(clearValue(value)).result;
				return formattedValue.replace(/[^0-9]$/, '');
			}

			function parser (value) {
				$log.debug('[uiTimeMask] Parser called: ', value);

				var modelValue = formatter(value);
				var viewValue = modelValue;

				if(ctrl.$viewValue !== viewValue) {
					ctrl.$setViewValue(viewValue);
					ctrl.$render();
				}

				return modelValue;
			}

			function validator (value) {
				$log.debug('[uiTimeMask] Validator called: ', value);

				if(angular.isUndefined(value)) {
					return value;
				}

				var splittedValue = value.toString().split(/:/).filter(function(v) {
					return !!v;
				});

				var hours = parseInt(splittedValue[0]),
					minutes = parseInt(splittedValue[1]),
					seconds = parseInt(splittedValue[2] || 0);

				var isValid = value.toString().length === formattedValueLength &&
					hours < 24 && minutes < 60 && seconds < 60;

				ctrl.$setValidity('time', ctrl.$isEmpty(value) || isValid);
				return value;
			}

			ctrl.$formatters.push(formatter);
			ctrl.$formatters.push(validator);
			ctrl.$parsers.push(parser);
			ctrl.$parsers.push(validator);
		}
	};
}]);

})(angular);
