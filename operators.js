let x = 1;

x = -x;
console.log( x ); // -1, unary negation was applied

let z = 1, y = 3;
console.log( y - z ); // 2, binary minus subtracts values

console.log( 5 % 2 ); // 1, the remainder of 5 divided by 2
console.log( 8 % 3 ); // 2, the remainder of 8 divided by 3
console.log( 8 % 4 ); // 0, the remainder of 8 divided by 4

console.log( 2 ** 2 ); // 2² = 4
console.log( 2 ** 3 ); // 2³ = 8
console.log( 2 ** 4 ); // 2⁴ = 16

console.log( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
console.log( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)

let s = "my" + "string";
console.log(s); // mystring

// Note that if any of the operands is a string, then the other one is converted to a string too.

console.log( '1' + 2 ); // "12"
console.log( 2 + '1' ); // "21

console.log(2 + 2 + '1' ); // "41" and not "221"

//Here, operators work one after another. The first + sums two numbers, so it returns 4, then the next + adds the string 1 to it, so it’s like 4 + '1' = '41'.

console.log('1' + 2 + 2); // "122" and not "14"

// Here, the first operand is a string, the compiler treats the other two operands as strings too. The 2 gets concatenated to '1', so it’s like '1' + 2 = "12" and "12" + 2 = "122".


// The binary + is the only operator that supports strings in such a way. 
// Other arithmetic operators work only with numbers and always convert their operands to numbers.
console.log( 6 - '2' ); // 4, converts '2' to a number
console.log( '6' / '2' ); // 3, converts both operands to numbers

// No effect on numbers
let b = 1;
console.log( +b ); // 1

let c = -2;
console.log( +c ); // -2

// Converts non-numbers
console.log( +true ); // 1
console.log( +"" );   // 0

let apple = "2";
let orange = "3";

console.log( apple + orange ); // "23", the binary plus concatenates strings

//If we want to treat them as numbers, we need to convert and then sum them:

let apples = "2";
let oranges = "3";

// both values converted to numbers before the binary plus
console.log( +apples + +oranges ); // 5

// the longer variant
// console.log( Number(apples) + Number(oranges) ); // 5

// unary pluses are applied first, they convert strings to numbers, and then the binary plus sums them up.

let t = 2 * 2 + 1;

console.log( t ); // 5

// The fact of = being an operator, not a “magical” language construct has an interesting implication.
let i = 1;
let o = 2;

let r = 3 - (i = o + 1);

console.log( i ); // 3
console.log( o ); // 0

// Another interesting feature is the ability to chain assignments:

// let a, b, c;

// a = b = c = 2 + 2;

// console.log( a ); // 4
// console.log( b ); // 4
// console.log( c ); // 4

//Modify-in-place

//We often need to apply an operator to a variable and store the new result in that same variable.

// let n = 2;
// n = n + 5;
// n = n * 2;

//This notation can be shortened using the operators += and *=:

let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

console.log( n ); // 14

//Increment ++ increases a variable by 1:

let counters = 2;
counters++;        // works the same as counter = counter + 1, but is shorter
console.log( counters ); // 3

// Decrement -- decreases a variable by 1:

let counter = 2;
counter--;        // works the same as counter = counter - 1, but is shorter
console.log( counter ); // 1

//Increment/decrement can only be applied to variables. 
//Trying to use it on a value like 5++ will give an error.

// three operations in one line
// for (a = 1, b = 3, c = a * b; a < 10; a++) {
//     ...
//    }