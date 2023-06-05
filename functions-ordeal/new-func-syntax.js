// The "new Function" syntax

// There’s one more way to create a function. It’s rarely used, but sometimes there’s no alternative.

let func = new Function ([arg1, arg2, argN], functionBody);

let sum = new Function('a', 'b', 'return a + b')

console.log( sum(1, 2) ); // 3

let sayHi = new Function('alert("Hello")');

sayHi(); // Hello

// The major difference from other ways we’ve seen is that the function is created literally from a string, that is passed at run time.

// Closure

// But when a function is created using new Function, its [[Environment]] is set to reference not 
// the current Lexical Environment, but the global one.

function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}
  
getFunc()(); // error: value is not defined

// To pass something to a function, created as new Function, we should use its arguments.