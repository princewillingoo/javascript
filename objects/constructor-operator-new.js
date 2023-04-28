// Constructor, operator "new"

// The regular {...} syntax allows us to create one object. But often we need to create many similar objects, 
// like multiple users or menu items and so on.

// That can be done using constructor functions and the "new" operator.

// Constructor function

// Constructor functions technically are regular functions. There are two conventions though:

//     They are named with capital letter first.
//     They should be executed only with "new" operator.

function User(name) {
    this.name = name;
    this.isAdmin = false
}

let user = new User("Jack");

console.log(user.name); // Jack
console.log(user.isAdmin); //fasle

function User(name) {
    // this = {};  (implicitly)
  
    // add properties to this
    this.name = name;
    this.isAdmin = false;
  
    // return this;  (implicitly)
}

// So let user = new User("Jack") gives the same result as:

// let user = {
//   name: "Jack",
//   isAdmin: false
// };

// new function() { … }

// If we have many lines of code all about creation of a 
// single complex object, we can wrap them in an immediately 
// called constructor function, like this:

// create a function and immediately call it with new
let enduser = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...other code for user creation
  // maybe complex logic and statements
  // local variables etc
};

// This constructor can’t be called again, because it is not saved anywhere, just created and called. So this trick aims to encapsulate the code that constructs the single object, without future reuse.

// Constructor mode test: new.target // SKIPPED

// Return from constructors

// Usually, constructors do not have a return statement. Their task is to write all necessary stuff into this, and it automatically becomes the result.

// But if there is a return statement, then the rule is simple:

//     If return is called with an object, then the object is returned instead of this.
//     If return is called with a primitive, it’s ignored.

function BigUser() {

    this.name = "John";
  
    return { name: "Godzilla" };  // <-- returns this object
}
  
console.log( new BigUser().name );  // Godzilla, got that object


function SmallUser() {
    this.name = "John";
    
    return; // <-- returns this
}
  
console.log( new SmallUser().name );  // John

// Usually constructors don’t have a return statement.

// Methods in constructor

function User(name) {
    this.name = name;
  
    this.sayHi = function() {
      alert( "My name is: " + this.name );
    };
}
  
  let john = new User("John");
  
  john.sayHi(); // My name is: John
  
  /*
  john = {
     name: "John",
     sayHi: function() { ... }
  }
  */

// Task

1. 
function Accumulator(startingValue){
    this.value = startingValue;

    this.read = function() {
        this.value += +prompt("Number ?", 0)
    };
};

2.
function Calculator(){
    this.read = function() {
        this.a = +prompt("a?", 0)
        this.b = +prompt("b?", 0)
    };

    this.sum = function() {
        alert(this.a)
    }

    this.mul = function() {
        alert(this.b)
    }
};
