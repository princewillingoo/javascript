// String
let value = true;
console.log(typeof value); // boolean

value = String(value); // now value is a string "true"
console.log(typeof value); // string


console.log( "6" / "2" ); // 3, strings are converted to numbers

// Number
console.log( Number("   123   ") ); // 123
console.log( Number("123z") );      // NaN (error reading a number at "z")
console.log( Number("  ") );
console.log( Number(true) );        // 1
console.log( Number(false) );       // 0

// Boolean
console.log( Boolean(1) ); // true
console.log( Boolean(0) ); // false

console.log( Boolean("hello") ); // true
console.log( Boolean("") ); // false