// Prototype methods, objects without __proto__

// The modern methods to get/set a prototype are:

//     Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj.
//     Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto.

let animal = {
    eats: true
};

// create a new object with animal as a prototype
let rabbit = Object.create(animal); // same as {__proto__: animal}

console.log(rabbit.eats); // true

console.log(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // [object Object], not "some value"!

// The Object.create method is a bit more powerful, as it has an optional 
// second argument: property descriptors.

animal = {
    eats: true
};
  
rabbit = Object.create(animal, {
    jumps: {
        value: true
    }
});

console.log(rabbit.jumps); // true

// We can use Object.create to perform an object cloning more powerful than 
// copying properties in for..in:

let clone = Object.create(
    Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);

// This call makes a truly exact copy of obj,

// "Very plain" objects

// objects can be used as associative arrays to store key/value pairs.

// …But if we try to store user-provided keys in it (for instance, a user-entered 
// dictionary), we can see an interesting glitch: all keys work fine except "__proto__".

// How can we avoid this problem?

// First, we can just switch to using Map for storage instead of plain objects, 
// then everything’s fine:

let map = new Map();

let key = prompt("What's the key?", "__proto__");
map.set(key, "some value");

console.log(map.get(key)); // "some value" (as intended)

// Now, if we intend to use an object as an associative array and be free of such 
// problems, we can do it with a little trick:

let obj = Object.create(null);
// or: obj = { __proto__: null }

key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"

// Object.create(null) creates an empty object without a prototype ([[Prototype]] is null):

// We can call such objects “very plain” or “pure dictionary” objects, because they are even 
// simpler than the regular plain object {...}.

// A downside is that such objects lack any built-in object methods, e.g. toString: