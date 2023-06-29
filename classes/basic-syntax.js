// Class basic syntax

// The basic syntax is:

// class MyClass {
//     // class methods
//     constructor() { ... }
//     method1() { ... }
//     method2() { ... }
//     method3() { ... }
//     ...
// }

// For example:

class User {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log(this.name);
    }
}

// Usage:
let user = new User("John");
user.sayHi();

// No comma between class methods

// What is a class?

// In JavaScript, a class is a kind of function.

// Here, take a look:

class Userx {
    constructor(name) { this.name = name; }
    sayHi() { console.log(this.name); }
}

// proof: User is a function
console.log(typeof Userx); // function

// What class User {...} construct really does is:

//     Creates a function named User, that becomes the result of the class declaration. 
//     The function code is taken from the constructor method (assumed empty if we don’t 
//     write such method).
//     Stores class methods, such as sayHi, in User.prototype.

// After new User object is created, when we call its method, it’s taken from the prototype, 
// just as described in the chapter F.prototype. So the object has access to class methods.

// class is a function
console.log( typeof Userx ); // function

// ...or, more precisely, the constructor method
console.log( User === User.prototype.constructor ); // true

// The methods are in User.prototype, e.g:
console.log(User.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
console.log(Object.getOwnPropertyNames(User.prototype)); ; // constructor, sayHi

// Not just a syntactic sugar

// rewriting class User in pure functions

// 1. Create constructor function
function User$(name) {
    this.name = name;
}
  // a function prototype has "constructor" property by default,
  // so we don't need to create it
  
  // 2. Add the method to prototype
User$.prototype.sayHi = function() {
    console.log(this.name);
};
  
// Usage:
user = new User$("John");
user.sayHi();

// Still, there are important differences.

// Class Expression

// Just like functions, classes can be defined inside 
// another expression, passed around, returned, assigned, etc.

User = class OurClass {
    sayHi() {
        console.log("Hello");
    }
};

// Similar to Named Function Expressions, class expressions may have a name.

// If a class expression has a name, it’s visible inside the class only:

// We can even make classes dynamically “on-demand”, using return keyword:

// Getters/setters

// Technically, such class declaration works by creating getters and setters 
// in User.prototype.

class Userz {

    constructor(name) {
        // invokes the setter
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short.");
            return;
        }
        this._name = value;
    }
}

user = new Userz("John");
console.log(user.name); //John

user = new Userz(""); //Name is too short.

// Computed names […]

class User1 {

    ['say' + 'Hi']() {
      console.log("Hello");
    }
}
  
new User1().sayHi();

// Class fields

// “Class fields” is a syntax that allows 
// to add any properties.

class User2 {
    name = "John";

    sayHi() {
        console.log(`Hello, ${this.name}!`);
    }
}

new User2().sayHi(); // Hello, John!

// The important difference of class fields is that they are set on individual objects, not User.prototype:

// Making bound methods with class fields

// if an object method is passed around and called in another context, this won’t be a reference to its object any more.

// For instance, this code will show undefined:

class Button {
    constructor(value) {
        this.value = value;
    }

    click() {
        console.log(this.value)
    }
}

let button = new Button("hello")

setTimeout(button.click, 1000); // undefined

// The problem is called "losing this".

// Class fields provide another, quite elegant syntax:

class Button {
    constructor(value) {
      this.value = value;
    }
    click = () => {
      alert(this.value);
    }
}
  
button = new Button("hello");
  
setTimeout(button.click, 1000); // hello