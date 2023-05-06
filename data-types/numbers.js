// Numbers

// In modern JavaScript, there are two types of numbers:

// 1. Regular numbers

// 2. BigInt numbers 

// So here we"ll talk about regular numbers. Let's expand our knowledge of them.

// More ways to write a number

let billion = 1000000000;

let billion_ = 1_000_000_000;

// Here the underscore _ plays the role of the “syntactic sugar”, it makes the number more readable. 
// The JavaScript engine simply ignores _ between digits, so it’s exactly the same one billion as above.

// In JavaScript, we can shorten a number by appending the letter "e" to it and specifying the zeroes count:

let billione = 1e9 ;  // 1 billion, literally: 1 and 9 zeroes

console.log( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)

// In other words, e multiplies the number by 1 with the given zeroes count.

1e3 === 1 * 1000; // e3 means *1000
1.23e6 === 1.23 * 1000000; // e6 means *1000000

// Now let’s write something very small. Say, 1 microsecond (one millionth of a second):

let mcs = 0.000001;

// Just like before, using "e" can help. If we’d like to avoid writing the zeroes explicitly, we could write the same as:

let mcse = 1e-6;  // five zeroes to the left from 1

// If we count the zeroes in 0.000001, there are 6 of them. So naturally it’s 1e-6.

// In other words, a negative number after "e" means a division by 1 with the given number of zeroes:

// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times

// Hex, binary and octal numbers

// Hexadecimal numbers are widely used in JavaScript to represent colors, encode characters, and for many 
// other things. So naturally, there exists a shorter way to write them: 0x and then the number.

console.log(0xff); // 255
console.log(0xFF); // 255 (the same, case doesn't matter)

// Binary and octal numeral systems are rarely used, but also supported using the 0b and 0o prefixes:

let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255

console.log( a == b ) // true, the same number 255 at both sides


// toString(base)

// The method num.toString(base) returns a string representation of num in the numeral system with 
// the given base.

let num = 255;

console.log( num.toString(16) ); // ff
console.log( num.toString(2) ); // 11111111

toString(base)

// The method num.toString(base) returns a string representation of num in the numeral system with the given base.

console.log( 123456..toString(36) ); // 2n9c
console.log((123456).toString(36)) // OR

// Rounding

// One of the most used operations when working with numbers is rounding.
// There are several built-in functions for rounding:

// Math.floor
//     Rounds down: 3.1 becomes 3, and -1.1 becomes -2.
// Math.ceil
//     Rounds up: 3.1 becomes 4, and -1.1 becomes -1.
// Math.round
//     Rounds to the nearest integer: 3.1 becomes 3, 3.6 becomes 4, the middle case: 3.5 rounds up to 4 too.
// Math.trunc (not supported by Internet Explorer)
//     Removes anything after the decimal point without rounding: 3.1 becomes 3, -1.1 becomes -1. 

// But what if we’d like to round the number to n-th digit after the decimal?

// For instance, we have 1.2345 and want to round it to 2 digits, getting only 1.23.

// Multiply-and-divide.

// For example, to round the number to the 2nd digit after the decimal, we can multiply the number by 100, call the rounding function and then divide it back.

let num1 = 1.23456;

console.log( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23

// The method toFixed(n) rounds the number to n digits after the point and returns a string representation of the result.

let num2 = 12.34;
console.log( num.toFixed(1) ); // "12.3"

// This rounds up or down to the nearest value, similar to Math.round:

let num3 = 12.36;
console.log( num.toFixed(1) ); // "12.4"

// Please note that the result of toFixed is a string. If the decimal part is shorter than required, zeroes are appended to the end:

let num4 = 12.34;
console.log( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits

// We can convert it to a number using the unary plus or a Number() call, e.g write +num.toFixed(5).


// Imprecise calculations

// Internally, a number is represented in 64-bit format IEEE-754, so there are exactly 64 bits to store a 
// number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit 
// is for the sign.

// Tests: isFinite and isNaN

// Remember these two special numeric values?

//     Infinity (and -Infinity) is a special numeric value that is greater (less) than anything.
//     NaN represents an error.

// They belong to the type number, but are not “normal” numbers, so there are special functions to check for them:

// isNaN(value) converts its argument to a number and then tests it for being NaN:

console.log( isNaN(NaN) ); // true
console.log( isNaN("str") ); // true

console.log( NaN === NaN ); // false

// isFinite(value) converts its argument to a number and returns true if it’s a regular number, not NaN/Infinity/-Infinity:

console.log( isFinite("15") ); // true
console.log( isFinite("str") ); // false, because a special value: NaN
console.log( isFinite(Infinity) ); // false, because a special value: Infinity

// Sometimes isFinite is used to validate whether a string value is a regular number:

let num6 = +prompt("Enter a number", '');

// will be true unless you enter Infinity, -Infinity or not a number
console.log( isFinite(num) );

// Please note that an empty or a space-only string is treated as 0 in all numeric functions including isFinite.

// Number.isNaN and Number.isFinite

// Number.isNaN and Number.isFinite methods are the more “strict” versions of isNaN and 
// isFinite functions. They do not autoconvert their argument into a number, but check if it belongs 
// to the number type instead.

// Comparison with Object.is

// There is a special built-in method Object.is that compares values like ===, but is more reliable for two edge cases:
// In all other cases, Object.is(a, b) is the same as a === b.

// parseInt and parseFloat

// But in real life we often have values in units, like "100px" or "12pt" in CSS. Also in many countries 
// the currency symbol goes after the amount, so we have "19€" and would like to extract a numeric value 
// out of that.

// That’s what parseInt and parseFloat are for.

console.log( parseInt('100px') ); // 100
console.log( parseFloat('12.5em') ); // 12.5

console.log( parseInt('12.3') ); // 12, only the integer part is returned
console.log( parseFloat('12.3.4') ); // 12.3, the second point stops the reading

// There are situations when parseInt/parseFloat will return NaN. It happens when no digits could be read:

console.log( parseInt('a123') ); // NaN, the first symbol stops the process

// The second argument of parseInt(str, radix)

console.log( parseInt('0xff', 16) ); // 255
console.log( parseInt('ff', 16) ); // 255, without 0x also works

console.log( parseInt('2n9c', 36) ); // 123456


// Other math functions

// JavaScript has a built-in Math object which contains a small library of mathematical 
// functions and constants.

console.log( Math.random() ); // ... (any random numbers)

console.log( Math.max(3, 5, -10, 0, 1) ); // 5

console.log( Math.pow(2, 10) ); // 2 in power 10 = 1024

// Task

// Create a script that prompts the visitor to enter two numbers and then shows their sum.

let x = +prompt("Enter first number", "")

let y = +prompt("Enter second number", "")

alert(x + y)

//////////////////////////////

function readNumber(){
    let num;

    do{
        num = prompt("Enter a value", "")
    }while(!isFinite(num))

}