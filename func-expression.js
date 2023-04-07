// Function expressions

// In JavaScript, a function is not a “magical language structure”, but a special kind of value.

// Function Declaration:

function sayHi() {
  alert( "Hello" );
}

// Function Expression.

// It allows us to create a new function in the middle of any expression.

let sayHi = function() {
  alert( "Hello" );
};

// Please note, there’s no name after the function keyword. Omitting a name is allowed for Function Expressions.

// In more advanced situations, that we’ll come across later, a function may be created and immediately 
// called or scheduled for a later execution, not stored anywhere, thus remaining anonymous.

// Function is a value

// Let’s reiterate: no matter how the function is created, a function is a value. 
// Both examples above store a function in the sayHi variable.

// We can copy a function to another variable:

function sayHi() {   // (1) create
  alert( "Hello" );
}

let func = sayHi;    // (2) copy

func(); // Hello     // (3) run the copy (it works)!
sayHi(); // Hello    //     this still works too (why wouldn't it)


let sayHi = function() { // (1) create
    alert( "Hello" );
  };
  
let fun = sayHi;
// ...

// Callback functions

function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}
  
function showOk() {
    alert( "You agreed." );
}

function showCancel() {
    alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);

// The arguments showOk and showCancel of ask are called callback functions or just callbacks.

// We can use Function Expressions to write an equivalent, shorter function:

function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);

// Here, functions are declared right inside the ask(...) call. They have no name, and so are called anonymous. 
// Such functions are not accessible outside of ask (because they are not assigned to variables), but that’s 
// just what we want here.

// The more subtle difference is when a function is created by the JavaScript engine.

// A Function Expression is created when the execution reaches it and is usable only from that moment.

// Once the execution flow passes to the right side of the assignment let sum = function… – here we go, 
// the function is created and can be used (assigned, called, etc. ) from now on.

// Function Declarations are different.

// A Function Declaration can be called earlier than it is defined.

// For example, a global Function Declaration is visible in the whole script, no matter where it is.

// That’s due to internal algorithms. When JavaScript prepares to run the script, it first looks for 
// global Function Declarations in it and creates the functions. We can think of it as an “initialization stage”.

// And after all Function Declarations are processed, the code is executed. So it has access to these functions.

// Another special feature of Function Declarations is their block scope.

// In strict mode, when a Function Declaration is within a code block, it’s visible everywhere inside that block. 
// But not outside of it.

// If we use Function Declaration, it won’t work as intended:

let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
welcome(); // Error: welcome is not defined

// That’s because a Function Declaration is only visible inside the code block in which it resides.

// Here’s another example:

let age = 16; // take 16 as an example

if (age < 18) {
  welcome();               // \   (runs)
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
  welcome();               // /   (runs)

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

welcome(); // Error: welcome is not defined

// What can we do to make welcome visible outside of if?

// The correct approach would be to use a Function Expression and assign welcome to the variable that is declared outside of if and has the proper visibility.

// This code works as intended:

let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

welcome(); // ok now

// Or we could simplify it even further using a question mark operator ?:

let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

welcome(); // ok now


// When to choose Function Declaration versus Function Expression?

// As a rule of thumb, when we need to declare a function, the first thing to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

// That’s also better for readability, as it’s easier to look up function f(…) {…} in the code than let f = function(…) {…};. Function Declarations are more “eye-catching”.

// …But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we’ve just seen an example), then Function Expression should be used.
