// Arrays

// Objects allow you to store keyed collections of values. Thatâ€™s fine.

// But quite often we find that we need an ordered collection, where we have a 1st, a 2nd, a 3rd element 
// and so on. For example, we need that to store a list of something: users, goods, HTML elements etc.

// There exists a special data structure named Array, to store ordered collections.

// Declaration

// There are two syntaxes for creating an empty array:

let arr = new Array();
let arrx = []

// Almost all the time, the second syntax is used. We can supply initial elements in the brackets:

let fruits = ["Apple", "Orange", "Plum"];

// Array elements are numbered, starting with zero.

// We can get an element by its number in square brackets:

console.log( fruits[0] ); // Apple
console.log( fruits[1] ); // Orange
console.log( fruits[2] ); // Plum

// We can replace an element:

fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]

// …Or add a new one to the array:

fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]

// The total count of the elements in the array is its length:

console.log( fruits.length )

// We can also use console.log to show the whole array.

console.log( fruits ); // Apple,Orange,Plum

// An array can store elements of any type.

let multi_arr = [
    'Apple',
    {name: 'John'},
    true,
    function() {console.log('hello');},
]

// Get last elements with “at”

// Get last elements with “at”

// Some programming languages allow the use of negative indexes for the same purpose, like fruits[-1].
// Although, in JavaScript it won’t work. The result will be undefined, because the index in square brackets is treated literally.
// We can explicitly calculate the last element index and then access it: fruits[fruits.length - 1].

// same as fruits[fruits.length-1]
console.log( fruits.flat(-1) ); // Plum

// In other words, arr.at(i):

//     is exactly the same as arr[i], if i >= 0.
//     for negative values of i, it steps back from the end of the array.

// Methods pop/push, shift/unshift

// In computer science, the data structure that allows this, is called deque.

// pop

let fruitsx = ["Apple", "Orange", "Pear"];

console.log( fruitsx.pop() ); // remove "Pear" and console.log it

console.log( fruitsx ); // Apple, Orange

// Both fruits.pop() and fruits.at(-1) return the last element of the array, but fruits.pop() also modifies the array by removing it.

// push

let fruitsy = ["Apple", "Orange"];

fruitsy.push("Pear");

console.log( fruitsy ); // Apple, Orange, Pear

// The call fruitsy.push(...) is equal to fruitsy[fruits.length] = ....

// Methods that work with the beginning of the array:

// shift

// Extracts the first element of the array and returns it:

console.log( fruits.shift() ); // remove Apple and console.log it

// unshift

// Add the element to the beginning of the array:

fruits.unshift('Apple');

// Methods push and unshift can add multiple elements at once:

let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
console.log( fruits );

// Internals

// An array is a special kind of object. The square brackets used to access a property arr[0] actually 
// come from the object syntax. That’s essentially the same as obj[key], where arr is the object, while 
// numbers are used as keys.

// They extend objects providing special methods to work with ordered collections of data and 
// also the length property. But at the core it’s still an object.

// For instance, it is copied by reference:

let fruits = ["Banana"]

let arrr = fruits; // copy by reference (two variables reference the same array)

console.log( arrr === fruits ); // true

arrr.push("Pear"); // modify the array by reference

console.log( fruits ); // Banana, Pear - 2 items now

// …But what makes arrays really special is their internal representation. The engine tries to store its 
// elements in the contiguous memory area, one after another

// But they all break if we quit working with an array as with an “ordered collection” and start working with it as 
// if it were a regular object.

// For instance, technically we can do this:

let fruits = []; // make an array

fruits[99999] = 5; // assign a property with the index far greater than its length

fruits.age = 25; // create a property with an arbitrary name

// That’s possible, because arrays are objects at their base. We can add any properties to them.

// Performance

// Methods push/pop run fast, while shift/unshift are slow.

// The pop method does not need to move anything, because other elements keep their indexes. That’s why it’s blazingly fast.
// The similar thing with the push method.

// Loops

// One of the oldest ways to cycle array items is the for loop over indexes:

let arrstar = ["Apple", "Orange", "Pear"]

for(let i = 0; i < arr.length; i++){
    console.log(arrstar[i])
}

// But for arrays there is another form of loop, for..of:

let frui = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fr of frui) {
  console.log( frui );
}

// The for..of doesn’t give access to the number of the current element, just its value, but in most cases
// that’s enough. And it’s shorter.

// Technically, because arrays are objects, it is also possible to use for..in:

let arrw = ["Apple", "Orange", "Pear"];

for (let key in arrw) {
  console.log( arrw[key] ); // Apple, Orange, Pear
}

// But that’s actually a bad idea. There are potential problems with it:
// The loop for..in iterates over all properties, not only the numeric ones.
// The for..in loop is optimized for generic objects, not arrays, and thus is 10-100 times slower.

// Generally, we shouldn’t use for..in for arrays.

// A word about “length”

// The length property automatically updates when we modify the array. To be precise, it is actually not 
// the count of values in the array, but the greatest numeric index plus one.

// Another interesting thing about the length property is that it’s writable.
// But if we decrease it, the array is truncated. The process is irreversible, here’s the example:

// So, the simplest way to clear the array is: arr.length = 0;.

// new Array()

// There is one more syntax to create an array:

let arxr = new Array("Apple", "Pear", "etc");

// It’s rarely used, because square brackets [] are shorter. Also, there’s a tricky feature with it.

// If new Array is called with a single argument which is a number, then it creates an array without items, but with the given length.

// Multidimensional arrays

// Arrays can have items that are also arrays. We can use it for multidimensional arrays, for example to store matrices:

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log( matrix[1][1] ); // 5, the central element

// toString

// Arrays have their own implementation of toString method that returns a comma-separated list of elements.

// Also, let’s try this:

console.log( [] + 1 ); // "1"
console.log( [1] + 1 ); // "11"
console.log( [1,2] + 1 ); // "1,21"

// Arrays do not have Symbol.toPrimitive, neither a viable valueOf, they implement only toString conversion, so here [] becomes an empty string, [1] becomes "1" and [1,2] becomes "1,2".

// Don’t compare arrays with ==

// Arrays in JavaScript, unlike some other programming languages, shouldn’t be compared with operator ==.

// This operator has no special treatment for arrays, it works with them as with any objects.

// Let’s recall the rules:

//     Two objects are equal == only if they’re references to the same object.
//     If one of the arguments of == is an object, and the other one is a primitive, then the object gets converted to primitive, as explained in the chapter Object to primitive conversion.
//     …With an exception of null and undefined that equal == each other and nothing else.

// The strict comparison === is even simpler, as it doesn’t convert types.

// So, if we compare arrays with ==, they are never the same, unless we compare two variables that reference exactly the same array.7

// Task

let farm = ["Apples", "Pear", "Orange"];

// push a new value into the "copy"
let shoppingCart = farm;
shoppingCart.push("Banana");

// what's in fruits?
console.log( farm.length ); // ?

arrr.push(function() {
    console.log( this );
  });



function sumInput(){
    arr = []
    sum = 0

    while(true){
        value = prompt("Enter a number...", 0)

        if (value === "" || value === null || !isFinite(value)) break;

        arr.push(value)
    }

    for(let a of arr){
        sum += a
    }

    return a;
}