// Methods of primitives

// JavaScript allows us to work with primitives (strings, numbers, etc.) as if they were objects. 
// They also provide methods to call as such. We will study those soon, but first we"ll see how it works because, 
// of course, primitives are not objects (and here we will make it even clearer).

// One of the best things about objects is that we can store a function as one of its properties.

let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!

// So here we’ve made an object john with the method sayHi.

// But, these features come with a cost!

// Objects are “heavier” than primitives. They require additional resources to support the internal machinery.

// A primitive as an object

// The solution looks a little bit awkward, but here it is:

//     Primitives are still primitive. A single value, as desired.
//     The language allows access to methods and properties of strings, numbers, booleans and symbols.
//     In order for that to work, a special “object wrapper” that provides the extra functionality is created, and then is destroyed.

// The “object wrappers” are different for each primitive type and are called: String, Number, Boolean, 
// Symbol and BigInt. Thus, they provide different sets of methods.

// For instance, there exists a string method str.toUpperCase() that returns a capitalized str.

// Here’s how it works:

let str = "Hello";

console.log(str.toUpperCase());

// Simple, right? Here’s what actually happens in str.toUpperCase():

//     The string str is a primitive. So in the moment of accessing its property, a special object is created that knows the value of the string, and has useful methods, like toUpperCase().
//     That method runs and returns a new string (shown by alert).
//     The special object is destroyed, leaving the primitive str alone.

// A number has methods of its own, for instance, toFixed(n) rounds the number to the given precision:

let n = 1.23456;

console.log( n.toFixed(2) ); // 1.23

// Constructors String/Number/Boolean are for internal use only

// Constructors String/Number/Boolean are for internal use only

// Some languages like Java allow us to explicitly create “wrapper objects” for primitives using a syntax like new Number(1) or new Boolean(false).

// In JavaScript, that’s also possible for historical reasons, but highly unrecommended. Things will go crazy in several places.

// For instance:

alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!

// Objects are always truthy in if, so here the alert will show up:

let zero = new Number(0);

if (zero) { // zero is true, because it's an object
  alert( "zero is truthy!?!" );
}

// On the other hand, using the same functions String/Number/Boolean without new is totally fine and useful thing. They convert a value to the corresponding type: to a string, a number, or a boolean (primitive).

// For example, this is entirely valid:

let num = Number("123"); // convert a string to number

// null/undefined have no methods

// The special primitives null and undefined are exceptions. They have no corresponding “wrapper objects” and provide no methods. In a sense, they are “the most primitive”.

// An attempt to access a property of such value would give the error:

alert(null.test); // error