// Optional chaining '?.'

// The optional chaining ?. is a safe way to access nested object properties, even if an intermediate 
// property doesn’t exist.

// The “non-existing property” problem

// If you’ve just started to read the tutorial and learn JavaScript, maybe the problem hasn’t touched you yet, but it’s quite common.
// As an example, let’s say we have user objects that hold the information about our users.
// Most of our users have addresses in user.address property, with the street user.address.street, but some did not provide them.
// In such case, when we attempt to get user.address.street, and the user happens to be without an address, we get an error:

let user = {}; // a user without "address" property
console.log(user.address.street); // Error!

// That’s the expected result. JavaScript works like this. As user.address is undefined, an attempt to get user.address.street fails with an error.
// In many practical cases we’d prefer to get undefined instead of an error here (meaning “no street”).

// Optional chaining

// The optional chaining ?. stops the evaluation if the value before ?. is undefined or null and returns undefined.

// Here’s the safe way to access user.address.street using ?.:

let enduser = {}; // user has no address

console.log(enduser?.address?.street ); // undefined (no error)

// Please note: the ?. syntax makes optional the value before it, but not any further.

// Don’t overuse the optional chaining

// We should use ?. only where it’s ok that something doesn’t exist.

// The variable before ?. must be declared

// If there’s no variable user at all, then user?.anything triggers an error:

// Short-circuiting

// As it was said before, the ?. immediately stops (“short-circuits”) the evaluation if the left part doesn’t exist

// Other variants: ?.(), ?.[]

// The optional chaining ?. is not an operator, but a special syntax construct, that also works with functions and square brackets.

// For example, ?.() is used to call a function that may not exist.

let userAdmin = {
    admin() {
        alert("I am admin");
    }
};

let userGuest = {}

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // nothing happens (no such method)

// The ?.[] syntax also works, if we’d like to use brackets [] to access properties instead of dot .. 
// Similar to previous cases, it allows to safely read a property from an object that may not exist.

let key = "firstName";

let user1 = {
    firstName: "John"
};

console.log( user1?.[key] ); // John
console.log( user2?.[key] ); // undefined

//Also we can use ?. with delete:

delete user?.name; // delete user.name if user exists

// We can use ?. for safe reading and deleting, but not writing

let anon_user = null;

user?.name = "John"; // Error, doesn't work
// because it evaluates to: undefined = "John"

// Still, we should apply ?. carefully, only where it’s acceptable, according to our code logic, that the left part 
// doesn’t exist. So that it won’t hide programming errors from us, if they occur.