// [[Prototype]]

// In JavaScript, objects have a special hidden property [[Prototype]] (as named in the specification), 
// that is either null or references another object. That object is called “a prototype”:

// The property [[Prototype]] is internal and hidden, but there are many ways to set it.

let animal = {
    eats: true
};
let rabbit = {
    jumps: true
};

rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

// we can find both properties in rabbit now:
console.log( rabbit.eats ); // true (**)
console.log( rabbit.jumps ); // true

// If we have a method in animal, it can be called on rabbit:

animal = {
    eats: true,
    walk() {
        console.log("Animal walk")
    }
};

rabbit = {
    jumps: true,
    __proto__: animal
};


// walk is taken from the prototype
rabbit.walk(); // Animal walk

// Writing doesn’t use prototype

// Accessor properties are an exception, as assignment is handled by a setter function. 
// So writing to such a property is actually the same as calling a function.

user = {
    name: "John",
    surname: "Smith",

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

admin = {
    __proto__: user,
    isAdmin: true
};

console.log(admin.fullName); // John Smith (*)

// setter triggers!
admin.fullName = "Alice Cooper"; // (**)

console.log(admin.fullName); // Alice Cooper, state of admin modified
console.log(user.fullName); // John Smith, state of user protected

// The value of “this”

// The answer is simple: this is not affected by prototypes at all.

// No matter where the method is found: in an object or its prototype. In a method call, 
// this is always the object before the dot.

// for…in loop

// The for..in loop iterates over inherited properties too.

// there’s a built-in method obj.hasOwnProperty(key): it returns true 
// if obj has its own (not inherited) property named key

animal = {
    eats: true
};

rabbit = {
    jumps: true,
    __proto__: animal
};


for(let prop in rabbit) {
    let isOwn = rabbit.hasOwnProperty(prop);
  
    if (isOwn) {
      console.log(`Our: ${prop}`); // Our: jumps
    } else {
      console.log(`Inherited: ${prop}`); // Inherited: eats
    }
}

// Almost all other key/value-getting methods ignore inherited properties

