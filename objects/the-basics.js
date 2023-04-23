// let user = new Object(); // "object constructor" syntax
// let user = {}

// We can immediately put some properties into {...} as “key: value” pairs:

let user = {     // an object
  name: "John",  // by key "name" store value "John"
  age: 30        // by key "age" store value 30
};

// get property values of the object:
console.log( user.name ); // John
console.log( user.age ); // 30

// The value can be of any type. Let’s add a boolean one:

user.isAdmin = true;

// To remove a property, we can use the delete operator:

delete user.age;

let multi = {"likes birds": 0, "likes birds": 1}  // 1 // multiword property name must be quoted

// set
user["likes birds"] = true;

// get
console.log(multi["likes birds"]); // true

// get
console.log(user["likes birds"]); // true

// delete
delete user["likes birds"];

// Square brackets also provide a way to obtain the property name as the result of any expression - 
// as opposed to a literal string - like from a variable as follows:

let key = "likes birds";

// same as user["likes birds"] = true;
user[key] = true;

// The dot notation cannot be used in a similar way:

// Computed properties

// We can use square brackets in an object literal, when creating an object. That’s called computed properties.

// For instance:

let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
};

alert( bag.apple ); // 5 if fruit="apple"

// let fruit = prompt("Which fruit to buy?", "apple");
// let bag = {};

// // take property name from the fruit variable
// bag[fruit] = 5;

// We can use more complex expressions inside square brackets:

let vegies = 'apple';

let sack = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};

// Property value shorthand

// The use-case of making a property from a variable is so common, that thereâ€™s a special property value shorthand to make it shorter.

// Instead of name:name we can just write name, like this:

function makeUser(name, age) {
  return {
    name, // same as name: name
    age,  // same as age: age
    // ...
  };
}

// We can use both normal properties and shorthands in the same object:

let user = {
  name,  // same as name:name
  age: 30
};

// Property names limitations

// As we already know, a variable cannot have a name equal to one of the language-reserved words like “for”, “let”, “return” etc.
// But for an object property, there’s no such restriction:

let obj1 = {
    0: "test" // same as "0": "test"
  };
  
  // both alerts access the same property (the number 0 is converted to string "0")
  alert( obj["0"] ); // test
  alert( obj[0] ); // test (same property)
  
//   There’s a minor gotcha with a special property named __proto__. We can’t set it to a non-object value:
  
  let obj = {};
  obj.__proto__ = 5; // assign a number
  alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
  
// Property existence test, “in” operator

// A notable feature of objects in JavaScript, compared to many other languages, is that it’s possible to 
// access any property. There will be no error if the property doesn’t exist!

// Reading a non-existing property just returns undefined. So we can easily test whether the property exists:

let user = {};

alert( user.noSuchProperty === undefined ); // true means "no such property"

// There’s also a special operator "in" for that.

// The syntax is:

// "key" in object

// For instance:

let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist

// when an object property exists, but stores undefined:

let obj = {
  test: undefined
};

alert( obj.test ); // it's undefined, so - no such property?

alert( "test" in obj ); // true, the property does exist!

// The "for..in" loop

// To walk over all keys of an object, there exists a special form of the loop: for..in. This is a completely different thing from the for(;;) construct that we studied before.
// The syntax:
for (key in object) {
  // executes the body for each key among object properties
}

for (let key in user) {
    // keys
    alert( key );  // name, age, isAdmin
    // values for the keys
    alert( user[key] ); // John, 30, true
  }

// Ordered like an object

// Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?
// The short answer is: “ordered in a special fashion”: integer properties are sorted, others appear in creation order. The details follow.

// So, to fix the issue with the phone codes, we can “cheat” by making the codes non-integer. Adding a plus "+" sign before each code is enough.

// Like this:

let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}