"use strict"

// Property flags and descriptors

// The method Object.getOwnPropertyDescriptor allows to query the full 
// information about a property.

/* let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName)*/

let user = {
    name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log( JSON.stringify(descriptor, null, 2 ));
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

// To change the flags, we can use Object.defineProperty.

/* Object.defineProperty(obj, propertName, descriptor)*/

// If the property exists, defineProperty updates its flags. Otherwise, 
// it creates the property with the given value and flags; in that case, 
// if a flag is not supplied, it is assumed false.

user = {}

Object.defineProperty(user, "name", {
    value: "John"
});

descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log( JSON.stringify(descriptor, null, 2) );
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

// Non-writable

// Let’s make user.name non-writable (can’t be reassigned) by changing writable flag:

user = {
    name: "John"
};

Object.defineProperty(user, "name", {
    writable: false
});

// user.name = "Pete"; // Error: Cannot assign to read only property 'name'

// Now no one can change the name of our user, unless they apply their own 
// defineProperty to override ours.

user = {};

Object.defineProperty(user, "name", {
    value: "John",
    // for new properties we need to explicitly list what's true
    enumerable: true,
    configurable: true
});

console.log(user.name); // John
// user.name = "Pete"; // Error

// Non-enumerable

// Now let’s add a custom toString to user.

user = {
    name: "John",
    toString() {
        return this.name;
    }
};

// By default, both our properties are listed:
for (let key in user) console.log(key); // name, toString

user = {
    name: "John",
    toString() {
      return this.name;
    }
};
  
Object.defineProperty(user, "toString", {
    enumerable: false
});
  
// Now our toString disappears:
for (let key in user) console.log(key); // name

// Non-enumerable properties are also excluded from Object.keys:

console.log(Object.keys(user)); // name

// Non-configurable

// The non-configurable flag (configurable:false) is sometimes preset 
// for built-in objects and properties.

descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

console.log( JSON.stringify(descriptor, null, 2 ) )

// Making a property non-configurable is a one-way road. We 
// cannot change it back with defineProperty.

// Please note: configurable: false prevents changes of property 
// flags and its deletion, while allowing to change its value.

user = {
    name: "John"
};
  
Object.defineProperty(user, "name", {
    configurable: false
});
  
user.name = "Pete"; // works fine
delete user.name; // Error

// And here we make user.name a “forever sealed” constant, just like the built-in Math.PI:

user = {
    name: "John"
};
  
Object.defineProperty(user, "name", {
    writable: false,
    configurable: false
});
  
// won't be able to change user.name or its flags
// all this won't work:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });

// We can change writable: true to false for a non-configurable property, 
// thus preventing its value modification (to add another layer of protection).

// Object.defineProperties

Object.defineProperties(user, {
    name: { value: "John", writable: false },
    surname: { value: "Smith", writable: false },
    // ...
});

// Object.getOwnPropertyDescriptors

// Together with Object.defineProperties it can be used as a “flags-aware” 
// way of cloning an object:

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

// Sealing an object globally

// Property descriptors work at the level of individual properties.

// There are also methods that limit access to the whole object