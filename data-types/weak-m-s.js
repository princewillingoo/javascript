// WeakMap and WeakSet

// As we know from the chapter Garbage collection, JavaScript engine keeps a value in memory
// while it is â€œreachableâ€ and can potentially be used.

// For instance:

let john = {name: "John"};

// the object can be accessed, john is the reference to it

// overwrite the reference
john = null;

// the object will be removed from memory

// Usually, properties of an object or elements of an array or another data structure are 
// considered reachable and kept in memory while that data structure is in memory.

let johnx = { name: "John" };

let array = [ johnx ];

johnx = null; // overwrite the reference

// the object previously referenced by john is stored inside the array
// therefore it won't be garbage-collected
// we can get it as array[0]

// Similar to that, if we use an object as the key in a regular Map, then while the Map exists, 
// that object exists as well.

let johndoe = { name: "John Doe" };

let map = new Map();
map.set(johndoe, "...");

johndoe = null; // overwrite the reference

// john is stored inside the map,
// we can get it by using map.keys()

// WeakMap is fundamentally different in this aspect. It doesn’t prevent garbage-collection of key objects.

// Let’s see what it means on examples.

// WeakMap

// The first difference between Map and WeakMap is that keys must be objects, not primitive values:

let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // works fine (object key)

// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object

// Now, if we use an object as the key in it, and there are no other references to that 
// object – it will be removed from memory (and from the map) automatically.

let james = {name: "John"};
weakMap.set(james, "...");

john = null; // overwrite the reference

// john is removed from memory!

// WeakMap does not support iteration and methods keys(), values(), entries(), so there’s no way to get all keys or values from it.

// WeakMap has only the following methods:

//     weakMap.set(key, value)
//     weakMap.get(key)
//     weakMap.delete(key)
//     weakMap.has(key)

// Why such a limitation?

// The engine may have cleaned it up or not, or did it partially. For that reason, 
// methods that access all keys/values are not supported.

// Use case: additional data

weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically

// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// increase the visits count
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}

// Now we don’t have to clean visitsCountMap. After john object becomes unreachable, by all 
// means except as a key of WeakMap, it gets removed from memory, along with the information 
// by that key from WeakMap.

// Use case: caching

// 📁 cache.js
let cache = new WeakMap();

// calculate and remember the result
function process(obj) {
    if(!cache.has(obj)) {
        let result = /* calculate the result for */ obj;

        cache.set(obj, result);
        return result;
    }

    return cache.get(obj);
}

// 📁 main.js
let objx = {/* some object */};

let result1 = process(objx);
let result2 = process(objx);

// ...later, when the object is not needed any more:
objx = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well

// WeakSet

// WeakSet behaves similarly:

//     It is analogous to Set, but we may only add objects to WeakSet (not primitives).
//     An object exists in the set while it is reachable from somewhere else.
//     Like Set, it supports add, has and delete, but not size, keys() and no iterations.

// Being “weak”, it also serves as additional storage. But not for arbitrary data, rather 
// for “yes/no” facts. A membership in WeakSet may mean something about the object.

let visitedSet = new WeakSet();

let jay = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(jay); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(jay); // John again

// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(jay)); // true

// check if Mary visited?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet will be cleaned automatically