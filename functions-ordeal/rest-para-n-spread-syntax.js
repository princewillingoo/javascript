// Rest parameters and spread syntax

// Many JavaScript built-in functions support an arbitrary number of arguments.


Math.max(arg1, arg2, ... argN) // – returns the greatest of the arguments.
Object.assign(dest, src1, ... srcN) // – copies properties from src1..N into dest. 
// …and so on.

// Rest parameters ...

// A function can be called with any number of arguments, no matter how it is defined.

function sum(a, b) {
    return a + b;
}

console.log( sum(1, 2, 3, 4, 5, 6) )

// There will be no error because of “excessive” arguments.

// The rest of the parameters can be included in the function definition by using three dots ... 
// followed by the name of the array that will contain them.

function sumAll(...args) {
    let sum = 0;

    for (let arg of args) sum += args;

    return sum;
}

console.log( sumAll(1) ); // 1
console.log( sumAll(1, 2) ); // 3


function showName(firstName, lastName, ...titles) {
    console( firstName + ' ' + lastName ); // Julius Caesar

    // the rest go into titles array
    // i.e. titles = ["Consul", "Imperator"]

    console.log( titles.length )
}

showName("Julius", "Caesar", "Consul", "Imperator");

/// The ...rest must always be last.

// The “arguments” variable

// There is also a special array-like object named arguments that contains all arguments by their index.
// It’s not an array. It does not support array methods
// it always contains all arguments. We can’t capture them partially,

function showName() {
    alert( arguments.length );
    alert( arguments[0] );
    alert( arguments[1] );
  
    // it's iterable
    // for(let arg of arguments) alert(arg);
}

// As we remember, arrow functions don’t have their own this. Now we know they don’t have 
// the special arguments object either.

// Spread syntax

// Spread syntax to the rescue! It looks similar to rest parameters, also using ..., 
// but does quite the opposite.

// When ...arr is used in the function call, it “expands” an iterable object arr into the list of arguments.

// For Math.max

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

console.log( Math.max(...arr1, ...arr2) ); // 8

// In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

// In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

let str = "Hello";

console.log([...str]); // H,e,l,l,o

// The spread syntax internally uses iterators to gather elements, the same way as for..of does.

// For this particular task we could also use Array.from

console.log(Array.from(str) ); // H,e,l,l,o

// But there’s a subtle difference between Array.from(obj) and [...obj]:

//     Array.from operates on both array-likes and iterables.
//     The spread syntax works only with iterables.

// Copy an array/object

// Remember when we talked about Object.assign() in the past?

// It is possible to do the same thing with the spread syntax.

let arr = [1, 2, 3];

let arrCopy = [...arr]; // spread the array into a list of parameters
                        // then put the result into a new array

// do the arrays have the same contents?
console.log( JSON.stringify(arr) === JSON.stringify(arrCopy) ); // true

// are the arrays equal?
console.log(arr == arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arr.push(4);
console.log(arr) // 1, 2, 3, 4
console.log(arrCopy); // 1, 2, 3

// Note that it is possible to do the same thing to make a copy of an object:

// This way of copying an object is much shorter than let objCopy = Object.assign({}, obj) or for 
// an array let arrCopy = Object.assign([], arr) so we prefer to use it whenever we can.