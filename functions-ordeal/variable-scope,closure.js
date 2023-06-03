// Variable scope, closure

// JavaScript is a very function-oriented language. It gives us a lot of freedom. 
// A function can be created at any moment, passed as an argument to another function, 
// and then called from a totally different place of code later.

// Code blocks

// If a variable is declared inside a code block {...}, it’s only visible inside that block.

{
    // do some job with local variables that should not be seen outside
    let message = "Hello"; // only visible in this block

    console.log(message); // Hello
    
}

console.log(message); // Error: message is not defined

// Nested functions

function sayHiBye(firstName, lastName) {
    
    // helper nested function to use below
    function getFullName() {
        return firstName + " " + lastName;
    }

    console.log( "Hello, " + getFullName() )
    console.log( "Bye, " + getFullName() )
}

// What’s much more interesting, a nested function can be returned: either as a property of a new 
// object or as a result by itself. It can then be used somewhere else. No matter where, it still 
// has access to the same outer variables.

// Below, makeCounter creates the “counter” function that returns the next number on each invocation:

function makeCounter() {
    let count = 0;

    return function() {
        return count++
    };
}

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2