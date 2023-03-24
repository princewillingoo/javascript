// // no error
// let message = "hello";
// message = 123456;

// // Number
// let n = 123;
// n = 12.345;

// console.log( 1 / 0 ); // Infinity

// console.log( Infinity ); // Infinity

// console.log( "not a number" / 2 ); // NaN, such division is erroneous

// console.log( NaN + 1 ); // NaN
// console.log( 3 * NaN ); // NaN
// console.log( "not a number" / 2 - 1 ); // NaN

// // BigInt

// // the "n" at the end means it's a BigInt
// const bigInt = 1234567890123456789012345678901234567890n;

// String

// A string in JavaScript must be surrounded by quotes.

// let str = "Hello";
// let str2 = 'Single quotes are ok too';
// let phrase = `can embed another ${str}`;


// let surname = "John";

// // embed a variable
// console.log( `Hello, ${surname}!` ); // Hello, John!

// // embed an expression
// console.log( `the result is ${1 + 2}` ); // the result is 3

// Boolean (logical type)
// let nameFieldChecked = true; // yes, name field is checked
// let ageFieldChecked = false; // no, age field is not checked

// let isGreater = 4 > 1;

// console.log( isGreater ); // true (the comparison result is "yes")

// // The “null” value
// let age = null;

// // The “undefined” value

// let age;

// console.log(age); // shows "undefined"

// Technically, it is possible to explicitly assign undefined to a variable:

// let age = 100;

// // change the value to undefined
// age = undefined;

// console.log(age); // "undefined"

// Object and Symbol

// The typeof operator

typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

typeof Math // "object"  (1)

typeof null // "object"  (2)

typeof alert // "function"  (3)
