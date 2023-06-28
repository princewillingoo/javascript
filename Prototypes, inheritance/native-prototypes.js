// Native prototypes

// The "prototype" property is widely used by the core of JavaScript itself. All built-in constructor functions use it.

let obj = {};
console.log( obj ); // "[object Object]" ?

// …But the short notation obj = {} is the same as obj = new Object()
// When new Object() is called (or a literal object {...} is created), 
// the [[Prototype]] of it is set to Object.prototype according to the 
// rule that we discussed in the previous

obj = {};

console.log(obj.__proto__ === Object.prototype); // true

console.log(obj.toString === obj.__proto__.toString); //true
console.log(obj.toString === Object.prototype.toString); //true

// Other built-in prototypes

// Other built-in objects such as Array, Date, Function and others 
// also keep methods in prototypes.

// By specification, all of the built-in prototypes have Object.prototype 
//on the top. That’s why some people say that “everything inherits from objects”.

let arr = [1, 2, 3];

// it inherits from Array.prototype?
console.log( arr.__proto__ === Array.prototype ); // true

// then from Object.prototype?
console.log( arr.__proto__.__proto__ === Object.prototype ); // true

// and null on the top.
console.log( arr.__proto__.__proto__.__proto__ ); // null

// Primitives

// The most intricate thing happens with strings, numbers and booleans.

// Values null and undefined have no object wrappers

// Changing native prototypes

String.prototype.show = function() {
    console.log(this);
};

"BOOM!".show(); // BOOM!

// So, generally, modifying a native prototype is considered a bad idea.

// In modern programming, there is only one case where modifying native 
// prototypes is approved. That’s polyfilling.

if (!String.prototype.repeat) { // if there's no such method
    // add it to the prototype
  
    String.prototype.repeat = function(n) {
      // repeat the string n times
  
      // actually, the code should be a little bit more complex than that
      // (the full algorithm is in the specification)
      // but even an imperfect polyfill is often considered good enough
      return new Array(n + 1).join(this);
    };
}
  
console.log( "La".repeat(3) ); // LaLaLa

// Borrowing from prototypes

// In the chapter Decorators and forwarding, call/apply 
// we talked about method borrowing.

// That’s when we take a method from one object and copy 
// it into another.

obj = {
    0: "Hello",
    1: "world!",
    length: 2,
};

obj.join = Array.prototype.join;

console.log( obj.join(',') ); // Hello, world!