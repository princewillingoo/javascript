// Object references and copying

// One of the fundamental differences of objects versus primitives is that objects are stored and copied 
// â€œby referenceâ€, whereas primitive values: strings, numbers, booleans, etc â€“ are always copied â€œas a whole 
// valueâ€.

let message = "Hello!";
let phrase = message;

// As a result we have two independent variables, each one storing the string "Hello!".

// Objects are not like that.

// A variable assigned to an object stores not the object itself, but its â€œaddress in memoryâ€ â€“ in other words â€œa referenceâ€ to it.

let user = {
    name: "John"
};

/* The object is stored somewhere in memory (at the right of the picture), while the user variable (at the 
left) has a “reference” to it. */

/* When an object variable is copied, the reference is copied, but the object itself is not duplicated. */

// let user = { name: "John" };

let admin = user; // copy the reference

/* We can use either variable to access the object and modify its contents: */

// let user = { name: 'John' };

// let admin = user;

admin.name = 'Pete'; // changed by the "admin" reference

console.log(user.name); // 'Pete', changes are seen from the "user" reference

// Comparison by reference

// Two objects are equal only if they are the same object.

// For instance, here a and b reference the same object, thus they are equal:

let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true

// And here two independent objects are not equal, even though they look alike (both are empty):

let y = {};
let x = {}; // two independent objects

alert( y == z ); // false

// Const objects can be modified

const pple = {
    name: "John"
};
  
user.name = "Pete"; // (*)
  
console.log(user.name); // Pete

pple = "me"

// It might seem that the line (*) would cause an error, but it does not. The value of user is constant, 
// it must always reference the same object, but properties of that object are free to change.

// Cloning and merging, Object.assign

// But what if we need to duplicate an object?

// 1. by iterating over its properties and copying them on the primitive level.

let user = {
    name: "John",
    age: 30
};
  
let clone = {}; // the new empty object
  
// let's copy all user properties into it
for (let key in user) {
    clone[key] = user[key];
    console.log(clone[key])
    console.log(user[key])

}
  
// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object

// 1. We can also use the method Object.assign

Object.assign(dest, ...sources)

// It copies the properties of all source objects into the target dest, and then returns it as the result.

// For example, we have user object, let’s add a couple of permissions to it:

let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true

// If the copied property name already exists, it gets overwritten:

let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }

// We also can use Object.assign to perform a simple object cloning:

let user = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user);

alert(clone.name); // John
alert(clone.age); // 30

// Here it copies all properties of user into the empty object and returns it.

// There are also other methods of cloning an object, e.g. using the spread syntax clone = {...user}, covered later in the tutorial.

// Nested cloning

// But properties can be references to other objects.

let user = {
    name: "John",
    sizes: {
        height: 182,
        with: 50
    }
};

console.log(user.sizes.height ); //182

// Now it’s not enough to copy clone.sizes = user.sizes, because user.sizes is an object, and 
// will be copied by reference, so clone and user will share the same sizes:

let clone = Object.assign({}, user)

console.log(user.sizes === clone.sizes); // true, same object

// user and clone share sizes
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 60, get the result from the other one

// To fix that and make user and clone truly separate objects, we should use a cloning loop that 
// examines each value of user[key] and, if it’s an object, then replicate its structure as well. That is 
// called a “deep cloning” or “structured cloning”. There’s structuredClone method that implements deep cloning.

// structuredClone

// The call structuredClone(object) clones the object with all nested properties.

// Here’s how we can use it in our example:

let clone = structuredClone(user);

alert( user.sizes === clone.sizes ); // false, different objects

// user and clone are totally unrelated now
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 50, not related

// The structuredClone method can clone most data types, such as objects, arrays, primitive values.

// It also supports circular references, when an object property references the object itself (directly or via a chain or references).

// For instance:

let user = {};
// let's create a circular reference:
// user.me references the user itself
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // true

// As you can see, clone.me references the clone, not the user! So the circular reference was cloned correctly as well.

// Although, there are cases when structuredClone fails.

// For instance, when an object has a function property:

// error
structuredClone({
  f: function() {}
});

// Function properties aren’t supported.

