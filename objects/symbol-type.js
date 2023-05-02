// Symbol type

// By specification, only two primitive types may serve as object property keys:

//     string type, or
//     symbol type.

// Symbols

// A “symbol” represents a unique identifier.

// let id = Symbol();

// id is a symbol with the description "id"
let id = Symbol("id")

// Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, 
// they are different values. The description is just a label that doesn’t affect anything.

let id1 = Symbol("id");
let id2 = Symbol("id")

console.log(id1 == id2); // false

// So, to summarize, a symbol is a “primitive unique value” with an optional description. Let’s see where we 
// can use them.

// Symbols don’t auto-convert to a string

// Most values in JavaScript support implicit conversion to a string. For instance, we can console.log almost 
// any value, and it will work. Symbols are special. They don’t auto-convert.

console.log(id); // TypeError: Cannot convert a Symbol value to a string

// If we really want to show a symbol, we need to explicitly call .toString() on it, like here:
console.log(id.toString()); // Symbol(id), now it works

// Symbol(id), now it works
console.log(id.description); // id()

// “Hidden” properties

// Symbols allow us to create “hidden” properties of an object, that no other part of code can accidentally 
// access or overwrite.

// For instance, if we’re working with user objects, that belong to a third-party code. We’d like to add
// identifiers to them.

let user = { // belongs to another code
    name: "John"
};

let ids = Symbol("id");

user[ids] = 1;

console( user[id] ); // we can access the data using the symbol as the key

// Also, imagine that another script wants to have its own identifier inside user, for its own purposes.

// Then that script can create its own Symbol("id"), like this:

let id4 = Symbol("id")

user[id] = "Thier id value"

// …But if we used a string "id" instead of a symbol for the same purpose, then there would be a conflict:

let user = { name: "John" };

// Our script uses "id" property
user.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user.id = "Their id value"
// Boom! overwritten by another script!

// If we want to use a symbol in an object literal {...}, we need square brackets around it.

// Like this:

let id5 = Symbol("id");

let user = {
  name: "John",
  [id5]: 123 // not "id": 123
};

// That’s because we need the value from the variable id as the key, not the string “id”.

// Symbols are skipped by for…in

// Symbolic properties do not participate in for..in loop.

let id3 = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id3]: 123
};

for (let key in user) console.log(key); // name, age (no symbols)

// the direct access by the symbol works
console.log( "Direct: " + user[id] ); // Direct: 123

Object.keys(user) // also ignores them. That’s a part of the general “hiding symbolic properties” principle. If another script or a library loops over our object, it won’t unexpectedly access a symbolic property.

// In contrast, Object.assign copies both string and symbol properties:

let id6 = Symbol("id");
let user = {
  [id6]: 123
};

let clone = Object.assign({}, user);

console.log( clone[id6] ); // 123

// There’s no paradox here. That’s by design. The idea is that when we clone an object or merge objects, we usually want all properties to be copied (including symbols like id).

// Global symbols

// As we’ve seen, usually all symbols are different, even if they have the same name. 
// But sometimes we want same-named symbols to be same entities. For instance, different 
// parts of our application want to access symbol "id" meaning exactly the same property.

// read from the global registry
let id7 = Symbol.for("id7"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id7");

// the same symbol
console.log( id7 === idAgain ); // true

// Symbols inside the registry are called global symbols. If we want an application-wide symbol, accessible everywhere in the code – that’s what they are for.

// Symbol.keyFor

// We have seen that for global symbols, Symbol.for(key) returns a symbol by name. To do the opposite – return a name by global symbol – we can use: Symbol.keyFor(sym):

// For instance:

// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
console.log( Symbol.keyFor(sym) ); // name
console.log( Symbol.keyFor(sym2) ); // id

// The Symbol.keyFor internally uses the global symbol registry to look up the key for the symbol. So it doesn’t work for non-global symbols. If the symbol is not global, it won’t be able to find it and returns undefined.

// That said, all symbols have the description property.

// For instance:

let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

console.log( Symbol.keyFor(globalSymbol) ); // name, global symbol
console.log( Symbol.keyFor(localSymbol) ); // undefined, not global

console.log( localSymbol.description ); // name

// Technically, symbols are not 100% hidden. There is a built-in method Object.getOwnPropertySymbols(obj) 
// that allows us to get all symbols. Also there is a method named Reflect.ownKeys(obj) that returns all keys 
// of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don’t use 
// these methods.

let idSym = Symbol("Id");
let idSym2 = Symbol("id");

(idSym === idSym); // false

Symbol.for("Id"); // makes every symbol with description â€œidâ€ global

(idSym === idSym); // true