// Global object

// The global object provides variables and functions that are available anywhere. 
// By default, those that are built into the language or the environment.

// Recently, globalThis was added to the language

alert("Hello");
// is the same as
window.alert("Hello");

// In a browser, global functions and variables declared with var (not let/const!) become the property of the global object:

var gVar = 5;

alert(window.gVar); // 5 (became a property of the global object)

// Function declarations have the same effect (statements with function keyword in the main code flow, 
//     not function expressions).

// If we used let instead, such thing wouldn’t happen:

let gLet = 5;

alert(window.gLet); // undefined (doesn't become a property of the global object)

// If a value is so important that you’d like to make it available globally, write it directly as a property:

// make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};

// That said, using global variables is generally discouraged.

// Using for polyfills

// We use the global object to test for support of modern language features.

// For instance, test if a built-in Promise object exists (it doesn’t in really old browsers):

if (!window.Promise) {
    alert("Your browser is really old!")
}

if (!window.Promise) {
    window.Promise = ... // custom implementation of the modern language feature
}