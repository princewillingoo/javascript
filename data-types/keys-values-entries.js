// Object.keys, values, entries

// In the previous chapter we saw methods map.keys(), map.values(), map.entries().

// These methods are generic, there is a common agreement to use them for data structures. 

// Object.keys, values, entries

// For plain objects, the following methods are available:

//     Object.keys(obj) – returns an array of keys.
//     Object.values(obj) – returns an array of values.
//     Object.entries(obj) – returns an array of [key, value] pairs.

let user = {
    name: "John",
    age: 30
};
  
    //   Object.keys(user) = ["name", "age"]
    //   Object.values(user) = ["John", 30]
    //   Object.entries(user) = [ ["name","John"], ["age",30] ]


// Transforming objects

// Objects lack many methods that exist for arrays, e.g. map, filter and others.
// If we’d like to apply them, then we can use Object.entries followed by Object.fromEntries:

let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};
  
let doublePrices = Object.fromEntries(
    // convert prices to array, map each key/value pair into another pair
    // and then fromEntries gives back the object
    Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);
  
alert(doublePrices.meat); // 8



let salaries = {
"John": 100,
"Pete": 300,
"Mary": 250
};

alert( sumSalaries(salaries) ); // 650


function sumSalaries(salaries) {

    let sum = 0;
    for (let salary of Object.values(salaries)) {
      sum += salary;
    }
  
    return sum; // 650
}
  

alert( sumSalaries(salaries) ); // 650
  
//   Or, optionally, we could also get the sum using Object.values and reduce:
  
  // reduce loops over array of salaries,
  // adding them up
  // and returns the result
function sumSalaries(salaries) {
    return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}