alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false

let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // it is the weekend
}

// result = value1 || value2 || value3;

// The OR || operator does the following:

//     Evaluates operands from left to right.
//     For each operand, converts it to boolean. If the result is true, stops and returns the original value of that operand.
//     If all operands have been evaluated (i.e. all were false), returns the last operand.

// A value is returned in its original form, without the conversion.

alert( 1 || 0 ); // 1 (1 is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)

alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)


// Getting the first truthy value from a list of variables or expressions.

let firstName = "";
let lastName = "";
let nickName = "SuperCoder";

alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder

// Short-circuit evaluation.

true || alert("not printed");
false || alert("printed");

// AND
 
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false

// let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}


if (1 && 0) { // evaluated as true && false
  alert( "won't work, because the result is falsy" );
}

result = value1 && value2 && value3;

// The AND && operator does the following:

//     Evaluates operands from left to right.
//     For each operand, converts it to a boolean. If the result is false, stops and returns the original value of that operand.
//     If all operands have been evaluated (i.e. all were truthy), returns the last operand.


// Precedence of AND && is higher than OR ||

// The precedence of AND && operator is higher than OR ||.

// So the code a && b || c && d is essentially the same as if the && expressions were in parentheses: (a && b) || (c && d).

// NOT ops
result = !value;

// The operator accepts a single argument and does the following:

//     Converts the operand to boolean type: true/false.
//     Returns the inverse value.

// A double NOT !! is sometimes used for converting a value to boolean type:

alert( !!"non-empty string" ); // true
alert( !!null ); // false

// That is, the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

// There’s a little more verbose way to do the same thing – a built-in Boolean function:

alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
