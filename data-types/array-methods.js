// Array methods

// Arrays provide a lot of methods. To make things easier, in this chapter they are split into groups.

// Add/remove items

// splice

// for arrays we usually want the rest of elements to shift and occupy the freed place. We expect to have a shorter array now.

// The arr.splice method is a swiss army knife for arrays. It can do everything: insert, remove and replace elements.

// The syntax is:

// arr.splice(start[, deleteCount, elem1, '..., elemN])

// It modifies arr starting from the index start: removes deleteCount elements and 
// then inserts elem1, ..., elemN at their place. Returns the array of removed elements.

// The splice method is also able to insert the elements without any removals. For that we need to set 
// deleteCount to 0:

let arr = ["I", "study", "Javascript"];

// from index 2
// delete 0
// then insert "complex" and language"
arr.splice(2, 0, "complex", "language");

console.log(arr); // "I", "study", "complex", "language", "JavaScript"

// Negative indexes allowed

// Here and in other array methods, negative indexes are allowed. They specify the position from the end of the array, like here:

let arrx = [1, 2, 5];

// from index -1 (one step from the end)
// delete 0 elements,
// then insert 3 and 4
arrx.splice(-1, 0, 3, 4);

console.log( arrx ); // 1,2,3,4,5

// slice

// The method arr.slice is much simpler than similar-looking arr.splice.

// The syntax is:

arr.slice([start], [end]) // not inclusing end

// It’s similar to a string method str.slice, but instead of substrings it makes subarrays.

let arrs = ["t", "e", "s", "t"];

console.log(arrs.slice(1, 3)); // e,s (copy from 1 to 3)

console.log(arrs.slice(-2)); // s,t (copy from -2 till the end)

// We can also call it without arguments: arr.slice() creates a copy of arr. 
// That’s often used to obtain a copy for further transformations that should not affect the original array.

// concat

// The method arr.concat creates a new array that includes values from other arrays and additional items.

// The syntax is:

// arr.concat(arg1, arg2...)

// It accepts any number of arguments – either arrays or values.

// The result is a new array containing items from arr, then arg1, arg2 etc.

// If an argument argN is an array, then all its elements are copied. Otherwise, the argument itself is copied.

let arrc = [1, 2]

// create an array from: arr and [3,4], then add values 5 and 6
console.log( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6

let arro = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

console.log( arro.concat(arrayLike) ); // 1,2,[object Object]

let arrr = [1, 2];

let arrayLike2 = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2
};

console.log( arrr.concat(arrayLike2) ); // 1,2,something,else

// Iterate: forEach

// The arr.forEach method allows to run a function for every element of the array.

// The syntax:

arr.forEach(function(item, index, array) {
  // ... do something with item
});

// And this code is more elaborate about their positions in the target array:

["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  console.log(`${item} is at index ${index} in ${array}`);
});

// The result of the function (if it returns any) is thrown away and ignored.

// Searching in array

// indexOf/lastIndexOf and includes

// arr.indexOf(item, from) – looks for item starting from index from, and returns the index where it was found, otherwise -1.
// arr.includes(item, from) – looks for item starting from index from, returns true if found.

let arrg = [1, 0, false];

console.log( arr.indexOf(0) ); // 1
console.log( arr.indexOf(false) ); // 2
console.log( arr.indexOf(null) ); // -1

console.log( arr.includes(1) ); // true

// Please note that indexOf uses the strict equality === for comparison. So, if we look for false, it finds 
// exactly false and not the zero.

// The method arr.lastIndexOf is the same as indexOf, but looks for from right to left.

let fruits = ['Apple', 'Orange', 'Apple']

console.log( fruits.indexOf('Apple') ); // 0 (first Apple)
console.log( fruits.lastIndexOf('Apple') ); // 2 (last Apple)

// The includes method handles NaN correctly

const arry = [NaN];
console.log( arry.indexOf(NaN) ); // -1 (wrong, should be 0)
console.log( arry.includes(NaN) );// true (correct)

// find and findIndex/findLastIndex

// Imagine we have an array of objects. How do we find an object with the specific condition?

// Here the arr.find(fn) method comes in handy.

// The syntax is:

let result = arr.find(function(item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});

let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
  ];
  
  let user = users.find(item => item.id == 1);
  
  console.log(user.name); // John
  
//   In real life arrays of objects is a common thing, so the find method is very useful.

// The arr.findIndex method has the same syntax, but returns the index where the element was found instead of the element itself. The value of -1 is returned if nothing is found.

// The arr.findLastIndex method is like findIndex, but searches from right to left, similar to lastIndexOf.

// filter

// The find method looks for a single (first) element that makes the function return true.

// If there may be many, we can use arr.filter(fn).

// The syntax is similar to find, but filter returns an array of all matching elements:

let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});

// Transform an array

// Let’s move on to methods that transform and reorder an array.

// map

// The arr.map method is one of the most useful and often used.

// It calls the function for each element of the array and returns the array of results.

// The syntax is:

let resultx = arr.map(function(item, index, array) {
  // returns the new value instead of item
});

let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
console.log(lengths); // 5,7,6


// sort(fn)

// The call to arr.sort() sorts the array in place, changing its element order.

let arr1 = [ 1, 2, 15 ];

// the method reorders the content of arr
arr1.sort();

console.log( arr1 );  // 1, 15, 2

// The items are sorted as strings by default.

// To use our own sorting order, we need to supply a function as the argument of arr.sort().

// The function should compare two arbitrary values and return:

// For instance, to sort as numbers:

function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr8 = [ 1, 2, 15 ];

arr8.sort(compareNumeric);

console.log(arr8);  // 1, 2, 15

// The arr.sort(fn) method implements a generic sorting algorithm. We don’t need to care 
// how it internally works (an optimized quicksort or Timsort most of the time). It will walk the 
// array, compare its elements using the provided function and reorder them, all we need is to 
// provide the fn which does the comparison.

[1, -2, 15, 2, 0, 8].sort(function(a, b) {
    console.log( a + " <> " + b );
    return a - b;
  });

// A comparison function may return any number
// Arrow functions for the best
// Use localeCompare for strings

reverse

// The method arr.reverse reverses the order of elements in arr.

let arre = [1, 2, 3, 4, 5];
arr.reverse();

console.log( arre ); // 5,4,3,2,1

// split and join

// The str.split(delim) method does exactly that. It splits the string into an array by the given delimiter delim.

let names = 'Bilbo, Gandalf, Nazgul';

let arr3 = names.split(', ');

for (let name of arr3) {
  console.log( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}

let arr7 = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

console.log(arr); // Bilbo, Gandalf

let str = "test";

console.log( str.split('') ); // t,e,s,t

// The call arr.join(glue) does the reverse to split. It creates a string of arr items joined by glue between them.

// For instance:

let arr6 = ['Bilbo', 'Gandalf', 'Nazgul'];

let str6 = arr6.join(';'); // glue the array into a string using ;

console.log( str6 ); // Bilbo;Gandalf;Nazgul


// reduce/reduceRight

// The methods arr.reduce and arr.reduceRight also belong to that breed, but are a little bit more intricate. 
// They are used to calculate a single value based on the array.

// The syntax is:

let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);

// So, the first argument is essentially the accumulator that stores the combined result of all previous 
// executions. And at the end it becomes the result of reduce.

// Sounds complicated?

let arr$ = [1, 2, 3, 4, 5];

let result$ = arr.reduce((sum, current) => sum + current, 0);

console.log(result$); // 15

// if there’s no initial, then reduce takes the first element of the array as 
// the initial value and starts the iteration from the 2nd element.

// So it’s advised to always specify the initial value.

// The method arr.reduceRight does the same, but goes from right to left.

// Array.isArray

// Arrays do not form a separate language type. They are based on objects.

// …But arrays are used so often that there’s a special method for that: Array.isArray(value). It returns true if 
// the value is an array, and false otherwise.

console.log(Array.isArray({})); // false

console.log(Array.isArray([])); // true

// Most methods support “thisArg”

// Almost all array methods that call functions – like find, filter, map, with a notable exception of sort, 
// accept an optional additional parameter thisArg.

// For example, here we use a method of army object as a filter, and thisArg passes the context:

let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let usersx = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

// find users, for who army.canJoin returns true
let soldiers = usersx.filter(army.canJoin, army);

console.log(soldiers.length); // 2
console.log(soldiers[0].age); // 20
console.log(soldiers[1].age); // 23

// If in the example above we used users.filter(army.canJoin), then army.canJoin would be called as a 
// standalone function, with this=undefined, thus leading to an instant error.

// A call to users.filter(army.canJoin, army) can be replaced with users.filter(user => army.canJoin(user)), 
// that does the same. The latter is used more often, as it’s a bit easier to understand for most people.
// A call to users.filter(army.canJoin, army) can be replaced with users.filter(user => army.canJoin(user)), 
// that does the same. The latter is used more often, as it’s a bit easier to understand for most people.

// Task

function camelize(str){
    strarr = str.split("-")

    strarr.forEach((item, index, array) =>{
        if (index > 0){
        array[index] = item.at(0).toUpperCase() + item.slice(1);
        }
    })

    camelized = strarr.join('')
    return camelized
}


function filterRangeInPlace(arr, a, b){
    arr.forEach((item, index, array) => {
        if (item < a || item > b){
            array.splice(index, 1)
            // console.log(item)
        }
    })
}

function compareNumeric(a, b) {
    if (a > b) return -1;
    if (a == b) return 0;
    if (a < b) return 1;
  }
  
let arrl = [ 1, 2, 15 ];

arrl.sort(compareNumeric);

console.log(arrl);  // 1, 2, 15

function Calculator(){

    this.methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b
    };

    this.calculate = function(strcal){
        ops = strcal.split(" ")
        a = +strcal.at(0)
        b = +strcal.at(-1)
        
        return this.methods[ops](a, b)
    };


    this.addMethod = function(name, func) {
        this.methods[name] = func;
      };
}


let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users$ = [ john, pete, mary ];

let names$ = users$.map(item => item.name)/* ... your code */

console.log( names$ ); // John, Pete, Mary