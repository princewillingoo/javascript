// Property getters and setters


// Getters and setters

// Accessor properties are represented by “getter” and “setter” methods. 
// In an object literal they are denoted by get and set:

let obj = {
    get propName() {
      // getter, the code executed on getting obj.propName
    },
  
    set propName(value) {
      // setter, the code executed on setting obj.propName = value
    }
};

// The getter works when obj.propName is read, the setter – when it is assigned.

let user = {
    name: "John",
    surname: "Smith"
};

// Now we want to add a fullName property, that should be "John Smith".

user = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(" ")
    }
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

console.log(user.name); // Alice
console.log(user.surname); // Cooper

// Accessor descriptors

// Descriptors for accessor properties are different from those for data properties.

// For instance, to create an accessor fullName with defineProperty, we can pass a descriptor 
// with get and set:

user = {
    name: "John",
    surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
    get() {
        return `${this.name} ${this.surname}`;
    },

    set(value) {
        [this.name, this.surname] = value.split(" ");
    }
});

// Please note that a property can be either an accessor (has get/set methods) 
// or a data property (has a value), not both.

// Smarter getters/setters

// Getters/setters can be used as wrappers over “real” property values to gain more 
// control over operations with them.

let user = {
    get name() {
      return this._name;
    },
  
    set name(value) {
      if (value.length < 4) {
        console.log("Name is too short, need at least 4 characters");
        return;
      }
      this._name = value;
    }
};
  
user.name = "Pete";
console.log(user.name); // Pete
  
user.name = ""; // Name is too short...

// Using for compatibility

// Imagine we started implementing user objects using data properties name and age:

function User(name, age) {
    this.name = name;
    this.age = age;
}
  
let john = new User("John", 25);
  
console.log( john.age ); // 25

function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;
}
  
john = new User("John", new Date(1992, 6, 1));

// Adding a getter for age solves the problem:

function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;
  
    // age is calculated from the current date and birthday
    Object.defineProperty(this, "age", {
      get() {
        let todayYear = new Date().getFullYear();
        return todayYear - this.birthday.getFullYear();
      }
    });
}
  
john = new User("John", new Date(1992, 6, 1));
  
console.log( john.birthday ); // birthday is available
console.log( john.age );      // ...as well as the age