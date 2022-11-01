module.exports = function bitunloader(input, options = {mode: 'string', padding: 0}) {
	var process = {
		checkInput: function (input) {
			if (isNaN(input)) {
				throw new Error(`Argument is not a number or parsable string: ${input}`);
			} else {
				let result = parseInt(input);
				return result;
			}
		},
		toArray: function(input) {
			return this.string(input).split('').reverse();
		},
		string: function(input) {
			if (options.signed) {
				if (input < 0) {
					let temp = input.toString(2);
					return '1' + temp.slice(1, temp.length).padStart(15, '0');
				}
				return input.toString(2).padStart(16, '0');
			}
			return input.toString(2).padStart(options.padding, '0');
		},
		array: function(input) {
			let type = {
				bit: function(input) {
					let result = process.toArray(input);
					result.forEach((value, index) => {
						result[index] = Number(value);
					});
					return result;
				},
				bool: function(input) {
					let result = process.toArray(input);
					result.forEach((value, index) => {
						result[index] = value == true;
					});
					return result;
				}
			};
			if (!type.hasOwnProperty(options.type)) {
				throw new Error(`Options argument invalid: Type: '${options.type}' is not valid, must be 'bit' or 'bool' for Array output mode.`);
			} else {
				return type[options.type](input);
			}
		},
		object: function(input) {
			let type = {
				bit: function(input) {
					input = process.toArray(input);
					let result = {};
					input.forEach((value, index) => {
						result[`b${index}`] = Number(value);
					});
					return result;
				},
				bool: function(input) {
					input = process.toArray(input);
					let result = {};
					input.forEach((value, index) => {
						result[`b${index}`] = value == true;
					});
					return result;
				}
			};
			if (!type.hasOwnProperty(options.type)) {
				throw new Error(`Options argument invalid: Type: '${options.type}' is not valid, must be 'bit' or 'bool' for Object output mode.`);
			} else {
				return type[options.type](input);
			}
		}
	};

	if (input == undefined){
		throw new Error('Function expects at least one argument');
	}

	input = process.checkInput(input);

	if (options.signed) {
		if (input > 32767 || input < -32767) {
			throw new Error('For signed mode, input must be between -32767 and 32767');
		}
	} else {
		input = Math.abs(input);
	}

	if (typeof options != 'object') {
		throw new Error(`Options argument invalid: '${options}' is not a valid object. Options argument must be an Object`);
	}

	options.mode = options.mode || 'string';

	if (options.padding) {
		process.checkInput(options.padding);
	} else {
		options.padding = 0;
	}

	if (!process.hasOwnProperty(options.mode)) {
		throw new Error(`Options argument invalid: '${options.mode}' is not a valid mode property.`);
	}

	return process[options.mode](input);
};
