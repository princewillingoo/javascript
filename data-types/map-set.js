// Map

// Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.

// Methods and properties are:

//     new Map() – creates the map.
//     map.set(key, value) – stores the value by the key.
//     map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
//     map.has(key) – returns true if the key exists, false otherwise.
//     map.delete(key) – removes the element (the key/value pair) by the key.
//     map.clear() – removes everything from the map.
//     map.size – returns the current element count.

let map = new Map()

map.set('1', 'str1'); // a string key
map.set(1, 'num1'); // a numeric key
map.set(true, 'bool'); // a boolean key

// map[key] isn’t the right way to use a Map

// Map can also use objects as keys.

let john = { name: "John" };

// for every user, let's store their visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

console.log( visitsCountMap.get(john) ); // 123

// Using objects as keys is one of the most notable and important Map features. The same does not count for 
// Object. String as a key in Object is fine, but we can’t use another Object as a key in Object.

let johnx = { name: "Johnx" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // try to use an object

visitsCountObj[ben] = 234; // try to use ben object as the key
visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced

// That's what got written!
console.log( visitsCountObj["[object Object]"] ); // 123

// Chaining

// Every map.set call returns the map itself, so we can “chain” the calls:

map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');

// Iteration over Map

// For looping over a map, there are 3 methods:

//     map.keys() – returns an iterable for keys,
//     map.values() – returns an iterable for values,
//     map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.
  
let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
    console.log(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
    console.log(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap){ // the same as of recipeMap.entries()
    console.log(entry); // cucumber,500 (and so on)
}

// The insertion order is used

// The iteration goes in the same order as the values were inserted. Map preserves this order, unlike a regular Object.

// Besides that, Map has a built-in forEach method, similar to Array:

// runs the function for each (key, value) pair
recipeMap.forEach( (value, key, map) => {
    console.log(`${key}: ${value}`); // cucumber: 500 etc
});


// Object.entries: Map from Object

// If we have a plain object, and we’d like to create a Map from it, then we can use built-in method 
// Object.entries(obj) that returns an array of key/value pairs for an object exactly in that format.

let obj = {
    name: "John",
    age: 30
};

let mapx = new Map(Object.entries(obj));
console.log( map.get('name') ); // John

// Here, Object.entries returns the array of key/value pairs: [ ["name","John"], ["age", 30] ]. 
// That’s what Map needs.

// Object.fromEntries: Object from Map

// There’s Object.fromEntries method that does the reverse: given an array of [key, value] pairs,
// it creates an object from them:

// E.g. we store the data in a Map, but we need to pass it to a 3rd-party code that expects a plain object.

// Here we go:

let mapz = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let objz = Object.fromEntries(mapz.entries()); // make a plain object (*)

// done!
// obj = { banana: 1, orange: 2, meat: 4 }

console.log(objz.orange); // 2

// Set

// A Set is a special type collection – “set of values” (without keys), where each value may occur only once.

// Its main methods are:

//     new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
//     set.add(value) – adds a value, returns the set itself.
//     set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
//     set.has(value) – returns true if the value exists in the set, otherwise false.
//     set.clear() – removes everything from the set.
//     set.size – is the elements count.

// The main feature is that repeated calls of set.add(value) with the same value don’t do anything. 
// That’s the reason why each value appears in a Set only once.

let set = new Set()

let james = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(james);
set.add(pete);
set.add(mary);
set.add(james);
set.add(mary);

// set keeps only unique values
console.log( set.size ); // 3

for (let user of set) {
  console.log(user.name); // John (then Pete and Mary)
}

// The alternative to Set could be an array of users, and the code to check for duplicates 
// on every insertion using arr.find. But the performance would be much worse, because this 
// method walks through the whole array checking every element. Set is much better optimized internally for uniqueness checks.

// Iteration over Set

// We can loop over a set either with for..of or using forEach:

let setx = new Set(["oranges", "apples", "bananas"]);

for (let value of setx) console.log(value);

// the same with forEach:
setx.forEach((value, valueAgain, set) => {
  console.log(value);
});

// The same methods Map has for iterators are also supported:

//     set.keys() – returns an iterable object for values,
//     set.values() – same as set.keys(), for compatibility with Map,
//     set.entries() – returns an iterable object for entries [value, value], exists for compatibility with Map.


// Task

function unique(arr) {
    set = new Set()

    arr.forEach(
        item => set.add(item)
    )

    return set
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
"Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(values) ); // Hare, Krishna, :-O


let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

function sortAlphabet(str) {
    return [...str].sort((a, b) => a.localeCompare(b)).join("");
  }



console.log( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"