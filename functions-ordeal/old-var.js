// But internally var is a very different beast, that originates from very old times. It’s generally 
// not used in modern scripts, but still lurks in the old ones.

var message = "Hi"

// “var” has no block scope

// Variables, declared with var, are either function-scoped or global-scoped.

// “var” tolerates redeclarations

// “var” variables can be declared below their use

function sayHi() {
    phrase = "Hello";

    console.log(phrase);

    var phrase;
}
sayHi()

// People also call such behavior “hoisting” (raising), because all var are “hoisted” (raised) to the 
// top of the function.

// Declarations are hoisted, but assignments are not.

function sayHi() {
    console.log(phrase)

    var phrase = "Hello";
}

sayHi();

// The declaration is processed at the start of function execution (“hoisted”), but the assignment 
// always works at the place where it appears. So the code works essentially like this:

function sayHi() {
    var phrase; // declaration works at the start...

    console.log(phrase); // undefined

    phrase = "Hello"; // ...assignment - when the execution reaches it.
}

sayHi()

// IIFE

// In the past, as there was only var, and it has no block-level visibility, programmers 
// invented a way to emulate it. What they did was called “immediately-invoked function 
// expressions” (abbreviated as IIFE).