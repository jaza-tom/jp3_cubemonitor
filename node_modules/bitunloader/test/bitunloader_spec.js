const should = require('should');
const bitunloader = require('../src/bitunloader');

describe('bitunloader() function', function() {

	it('should output a binary string', function() {
		let test = bitunloader(5);
		test.should.be.a.String();
		test.should.be.exactly('101');
	});

	it('should output an array of bits', function() {
		let test = bitunloader(5, {mode:'array',type:'bit'});
		test.should.be.an.Array();
		test.should.have.length(3);
		test[0].should.be.exactly(1);
		test[1].should.be.exactly(0);
		test[2].should.be.exactly(1);
	});

	it('should output an array of bools', function() {
		let test = bitunloader(5, {mode: 'array', type:'bool'});
		test.should.be.an.Array();
		test.should.have.length(3);
		test[0].should.be.true;
		test[1].should.be.false;
		test[2].should.be.true;
	});

	it('should output an object of bits', function() {
		let test = bitunloader(5, {mode: 'object', type:'bit'});
		test.should.be.an.Object();
		test.should.have.ownProperty('b0', 1);
		test.should.have.ownProperty('b1', 0);
		test.should.have.ownProperty('b2', 1);
	});

	it('should output an object of bools', function() {
		let test = bitunloader(5, {mode: 'object', type:'bool'});
		test.should.be.an.Object();
		test.should.have.ownProperty('b0', true);
		test.should.have.ownProperty('b1', false);
		test.should.have.ownProperty('b2', true);
	});

	it('should output the correct result length according to the optional padding parameter', function() {
		let test = bitunloader(5, {mode:'string', padding: 8});
		test.should.be.a.String();
		test.should.have.length(8);
		test = bitunloader(5, {mode: 'array', type:'bit', padding: '8'});
		test.should.be.an.Array();
		test.should.have.length(8);
		test = bitunloader(5, {mode: 'object', type:'bool', padding: '16'});
		test.should.be.an.Object();
		Object.keys(test).should.have.length(16);
	});

	it('should handle negative numbers', function() {
		let test = bitunloader(-5);
		test.should.be.a.String();
		test.should.be.exactly('101');
		test = bitunloader(-5, {signed:true, padding: 100});
		test.should.be.a.String();
		test.should.be.exactly('1000000000000101');
		should(function() {bitunloader(65000, {signed:true});}).throw('For signed mode, input must be between -32767 and 32767');
	});

	it('should process only whole numbers', function() {
		let test = bitunloader(5.5);
		test.should.be.a.String();
		test.should.be.exactly('101');
	});

	it('should throw an error when called with no arguments', function() {
		should(function() {bitunloader();}).throw('Function expects at least one argument');
	});

	it('should throw an error when input is not a parsable number', function() {
		let test = 'foo';
		should(function () {bitunloader(test);}).throw(`Argument is not a number or parsable string: ${test}`);
		test = [5,1000];
		should(function () {bitunloader(test);}).throw(`Argument is not a number or parsable string: ${test}`);
		test = [[[100]]];
		should(function () {bitunloader(test);}).not.throw();
	});

	it('should throw an error when called with invalid output mode argument', function() {
		should(function () {bitunloader(5, 'this should be an object');}).throw('Options argument invalid: \'this should be an object\' is not a valid object. Options argument must be an Object');
	});

	it('should throw an error when called with output mode argument with invalid values', function() {
		should(function () {bitunloader(5, {mode:'array', type:'bot'});}).throw(`Options argument invalid: Type: '${'bot'}' is not valid, must be 'bit' or 'bool' for Array output mode.`);
		should(function () {bitunloader(5, {mode:'object', type:'boll'});}).throw(`Options argument invalid: Type: '${'boll'}' is not valid, must be 'bit' or 'bool' for Object output mode.`);
	});

	it('should throw an error when optional \'padding\' argument is not a parsable number', function() {
		should(function () {bitunloader(5, {mode: 'string', padding: 'NaN'});}).throw(`Argument is not a number or parsable string: ${'NaN'}`);
		should(function () {bitunloader(5, {mode: 'string', padding: '8'});}).not.throw();
	});

});
