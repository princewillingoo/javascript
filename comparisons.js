alert( 2 > 1 );  // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)

let result = 5 > 4; // assign the result of the comparison
alert( result ); // true

// To see whether a string is greater than another, JavaScript uses the so-called “dictionary” or “lexicographical” order.

alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true

// When comparing values of different types, JavaScript converts the values to numbers.
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1

let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!

// From JavaScript’s standpoint, this result is quite normal. 
// An equality check converts values using the numeric conversion (hence "0" becomes 0), 
// while the explicit Boolean conversion uses another set of rules.

// A regular equality check == has a problem. It cannot differentiate 0 from false:

alert( 0 == false ); // true

// The same thing happens with an empty string:

alert( '' == false ); // true

// This happens because operands of different types are converted to numbers by the equality operator ==. 
// An empty string, just like false, becomes a zero.

alert( 0 === false ); // false, because the types are different


alert( null === undefined ); // false
alert( null == undefined ); // true

alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true

// The reason is that an equality check == and comparisons > < >= <= work differently. 
// Comparisons convert null to a number, treating it as 0. That’s why (3) null >= 0 is true and (1) null > 0 is false.

// On the other hand, the equality check == for undefined and null is defined such that, 
// without any conversions, they equal each other and don’t equal anything else. 
// That’s why (2) null == 0 is false.

// The value undefined shouldn’t be compared to other values

alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)


// Treat any comparison with undefined/null except the strict equality === with exceptional care.
// Don’t use comparisons >= > < <= with a variable which may be null/undefined, unless you’re really sure of what you’re doing. If a variable can have these values, check for them separately.

// Summary

//     Comparison operators return a boolean value.
//     Strings are compared letter-by-letter in the “dictionary” order.
//     When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
//     The values null and undefined equal == each other and do not equal any other value.
//     Be careful when using comparisons like > or < with variables that can occasionally be null/undefined. Checking for null/undefined separately is a good idea.
