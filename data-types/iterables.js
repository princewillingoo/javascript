// Iterables

// If an object isn’t technically an array, but represents a collection (list, set) of something, 
// then for..of is a great syntax to loop over it, so let’s see how to make it work.

// Symbol.iterator

let range = {
    from: 1,
    to: 5
};

// We want the for..of to work:
// for(let num of range) ... num=1,2,3,4,5

// To make the range object iterable (and thus let for..of work) we need to add a method to the object named Symbol.iterator (a special built-in symbol just for that).

//     When for..of starts, it calls that method once (or errors if not found). The method must return an iterator – an object with the method next.
//     Onward, for..of works only with that returned object.
//     When for..of wants the next value, it calls next() on that object.
//     The result of next() must have the form {done: Boolean, value: any}, where done=true means that the loop is finished, otherwise value is the next value.

// 1. call to for..of initially calls this
range[Symbol.iterator] = function(){

    // ...it returns the iterator object:
    // 2. Onward, for..of works only with the iterator object below, asking it for next values
    return {
        current: this.from,
        last: this.to,

        // 3. next() is called on each iteration by the for..of loop
        next(){
            // 4. it should return the value as an object {done:.., value :...}
            if (this.current <= this.last){
                return {done: false, value: this.current++}
            }else{
                return {done:true}
            }
        }
    };
};

// now it works!
for (let num of range) {
    console.log(num); // 1, then 2, 3, 4, 5
}


// String is iterable

// Arrays and strings are most widely used built-in iterables

// And it works correctly with surrogate pairs!

let strx = '𝒳😂';
for (let char of strx) {
    console.log( char ); // 𝒳, and then 😂
}

// Calling an iterator explicitly

// We’ll iterate over a string in exactly the same way as for..of, but with direct calls. This code 
// creates a string iterator and gets values from it “manually”:

let str = "Hello";

// does the same as
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); // outputs characters one by one
}

// That is rarely needed, but gives us more control over the process than for..of. For instance, 
// we can split the iteration process: iterate a bit, then stop, do something else, and then resume later.

// Iterables and array-likes

// Two official terms look similar, but are very different. Please make sure you understand them well to avoid the confusion.

//     Iterables are objects that implement the Symbol.iterator method, as described above.
//     Array-likes are objects that have indexes and length, so they look like arrays.

let arrayLike = { // has indexes and length => array-like
    0: "Hello",
    1: "World",
    length: 2
  };
  
// Error (no Symbol.iterator)
for (let item of arrayLike) {}

// Both iterables and array-likes are usually not arrays, they don’t have push, pop etc. 
// That’s rather inconvenient if we have such an object and want to work with it as with 
// an array. E.g. we would like to work with range using array methods. How to achieve that?

// Array.from

// There’s a universal method Array.from that takes an iterable or array-like value and makes a “real” 
// Array from it. Then we can call array methods on it.

let arrayLikex = {
    0: "Hello",
    1: "World",
    length: 2
};
  
let arr = Array.from(arrayLikex); // (*)
console.log(arr.pop()); // World (method works)

// Array.from at the line (*) takes the object, examines it for being an iterable or array-like, 
// then makes a new array and copies all items to it.

// The same happens for an iterable:

    // // assuming that range is taken from the example above
    // let arr = Array.from(range);
    // alert(arr); // 1,2,3,4,5 (array toString conversion works)