// Extending built-in classes

// add one more method to it (can do more)
class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
console.log(filteredArr); // 10, 50
console.log(filteredArr.isEmpty()); // false

arr.constructor === PowerArray

// Even more, we can customize that behavior.

class PowerArrayx extends Array {
    isEmpty() {
      return this.length === 0;
    }
  
    // built-in methods will use this as the constructor
    static get [Symbol.species]() {
      return Array;
    }
  }
  
let arrx = new PowerArrayx(1, 2, 5, 10, 50);
console.log(arrx.isEmpty()); // false
  
// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArrx = arrx.filter(item => item >= 10);
  
// filteredArr is not PowerArray, but Array
console.log(filteredArrx.isEmpty()); // Error: filteredArr.isEmpty is not a function

// No static inheritance in built-ins

// Built-in objects have their own static methods, for instance Object.keys, Array.isArray etc.