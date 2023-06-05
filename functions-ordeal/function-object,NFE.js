// Function object, NFE

// As we already know, a function in JavaScript is a value(type object).

// A good way to imagine functions is as callable “action objects”. 
// We can not only call them, but also treat them as objects: add/remove 
// properties, pass by reference etc.

// The “name” property

function sayHi() {
    alert("Hi");
}

alert(sayHi.name); // sayHi

let sayHello = function() {
    alert("Hello")
};

alert(sayHello.name); // sayHi (there's a name!)

// It also works if the assignment is done via a default value:

function f(sayHi = function() {}) {
    alert(sayHi.name); // sayHi (works!)
}
  
f();

// In the specification, this feature is called a “contextual name”

// Object methods have names too:

let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye

// There are cases when there’s no way to figure out the right name.

// function created inside array
let arr = [function() {}];

alert( arr[0].name ); // <empty string>
// the engine has no way to set up the right name, so there is none

// The “length” property

// There is another built-in property “length” that returns the number of function parameters,

function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2

// Here we can see that rest parameters are not counted.

// Custom properties

// We can also add properties of our own.

function sayHi() {
    alert("Hi");

    // let's count how many times we run
    sayHi.counter++;
}
sayHi.counter = 0; 

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // Called 2 time

// A property is not a variable

// Function properties can replace closures sometimes.

function makeCounter() {
   // instead of:
   // let count = 0
  
   function counter() {
     return counter.count++;
   };
  
   counter.count = 0;
 
   return counter;
}
  
let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1

// Named Function Expression

let saySup = function func(who) {
    alert(`Hello, ${who}`);
};

// There are two special things about the name func, that are the reasons for it:

//     It allows the function to reference itself internally.
//     It is not visible outside of the function.

// Why do we use func? Maybe just use sayHi for the nested call?

// The problem with that code is that sayHi may change in the outer code. 
// If the function gets assigned to another variable instead, the code will 
// start to give errors:

let sayHey = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHey("Guest"); // Error: sayHi is not a function
  }
};

let welcome = sayHey;
sayHey = null;

welcome(); // Error, the nested sayHi call doesn't work any more!

// That happens because the function takes sayHi from its outer lexical environment. 
// There’s no local sayHi, so the outer variable is used. And at the moment of the call 
// that outer sayHi is null.