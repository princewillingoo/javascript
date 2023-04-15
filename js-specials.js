// Statements are delimited with a semicolon:

alert('Hello'); alert('World');

// Usually, a line-break is also treated as a delimiter, so that would also work:

alert('Hello')
alert('World')

// That’s called “automatic semicolon insertion”. Sometimes it doesn’t work, for instance:

alert("There will be an error after this message")

[1, 2].forEach(alert)

// Most codestyle guides agree that we should put a semicolon after each statement.

// Semicolons are not required after code blocks {...} and syntax constructs with them like loops:

function f() {
  // no semicolon needed after function declaration
}

for(;;) {
  // no semicolon needed after the loop
}

// …But even if we can put an “extra” semicolon somewhere, that’s not an error. It will be ignored.

// Variables are dynamically typed. They can store any value:

let x = 5;
x = "John";

// The typeof operator returns the type for a value, with two exceptions:

typeof null == "object" // error in the language
typeof function(){} == "function" // functions are treated specially

// Interaction

prompt(question, "[default]")

confirm(question)

alert(message)

// All these functions are modal, they pause the code execution and prevent the visitor from interacting 
// with the page until they answer.

// The strict equality operator === doesn’t do the conversion: different types always mean different values for it.

// Values null and undefined are special: they equal == each other and don’t equal anything else.

// Greater/less comparisons compare strings character-by-character, other types are converted to a number.

// Loops

// 1
while (condition) {
//   ...
}

// 2
do {
//   ...
} while (condition);

// 3
for(let i = 0; i < 10; i++) {
//   ...
}

// Directives break/continue allow to exit the whole loop/current iteration. Use labels to break nested loops.

// The “switch” construct

// The “switch” construct can replace multiple if checks. It uses === (strict equality) for comparisons.

let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number
    break;

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}

// Functions

// We covered three ways to create a function in JavaScript:

//     Function Declaration: the function in the main code flow

function sum(a, b) {
  let result = a + b;

  return result;
}

// Function Expression: the function in the context of an expression

let sum = function(a, b) {
  let result = a + b;

  return result;
};

// Arrow functions:

    // expression on the right side
    let sum = (a, b) => a + b;

    // or multi-line syntax with { ... }, need return here:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // without arguments
    let sayHi = () => alert("Hello");

    // with a single argument
    let double = n => n * 2;

    // Functions may have local variables: those declared inside its body or its parameter list. Such variables are only visible inside the function.
    // Parameters can have default values: function sum(a = 1, b = 2) {...}.
    // Functions always return something. If there’s no return statement, then the result is undefined.
