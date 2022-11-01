# bitunloader
`v1.2.1`

Unload a number to a binary string array of bits, array of bools, object of bits, object of bools.
Very usefull when working with modbus devices which use word data types. Often, modbus device manufactures use a single 16 bit word to represent up to 16 different boolean values according to the individual bits in the word. Accessing those individual bits is made easier by transforming the word into individual bits in a way what matches your coding style.

## New:
* Added a mode to handle signed 16 bit numbers. Does not change previous behaviour [*See examples*](#examples).

[![alt text](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png "Buy me a coffee!")](https://www.buymeacoffee.com/NxcwUpD)

## Installation:
`npm install bitunloader`
## Use:
bitunloader accepts two arguments:
### 1) Input to be converted.  *(required)*
* Must be a whole integer or string which can be parsed into an integer using parseInt().
* Can only handle positive numbers, negative numbers will be made positive.
### 2) Object to specify the format your input number will be converted to. *(optional)*
* Must be an object
* Object must contain property `mode` which must be `string`, `array` or `object`.
* If using Array or Object mode, an additional property `type` is required which must be `bit` or `bool`.
* `padding` property sets the length of the result output to *at least* this length.
	* Must be a whole integer or string which can be parsed into an integer using parseInt().
	* Can only handle positive numbers, negative numbers will be made positive.
	* A result output that has a bit length that is longer than the padding option size will not be altered by the padding option. [*see examples*](#examples)
* `signed` property invokes 'signed integer mode', which automatically pads the result to 16 bits. The least significant bit becomes the sign bit, which allows a value range between -32,767 (sign bit = 1) and +32,767 (sign bit = 0). Inputting values larger than this range will result in an error.
	* Must be `true` or `false`.
	* Default is `false`.
## Examples
##### Example inputs:
	5000 //is used as-is.
	9987.3445 //decimal is dropped to result in `9987`.
	'814' //string is parsed to `814`
	-6000 //must be used with option argument set to {signed: true} or it will be made positive by default.
##### Example Modes:
String mode:

`bitunloader(5, {mode: 'string'}); //result will be '101'`

Or simply:

	bitunloader(100); //result will be '1100100'

Array mode:

	bitunloader(3, {mode: 'array', type: 'bit'})
	//result will be [1,1]

Object mode:

	bitunloader(2, {mode: 'object', type: 'bool'})
	//result will be {b0: false, b1: true}

Signed mode: *(can be used with any other mode)*

	bitunloader(-5, {signed: true});
	//result will be '1000000000000101'

### Example optional padding:
Pad to 16 bits:

	bitunloader(1277, {mode: 'string', padding: 16})
	//result will be ''0000010011111101'

Pad to 8 bits on a 17 bit number:

	bitunloader(69420, {padding: 8})
	//result will be '10000111100101100' (still 17 bits long)
