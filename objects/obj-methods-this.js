// Object methods, "this"

let user = {
    name: "Prince",
    age: 30
}

// in the real world, a user can act: select something from the shopping cart, login, logout etc.
// Actions are represented in JavaScript by functions in properties.

// Method examples
// For a start, let’s teach the user to say hello:

user.sayHi = function() { // Function Expression
    console.log("Hello");
};

console.log(user);
user.sayHi(); // Hello!

// Of course, we could use a pre-declared function as a method, like this:

// first, declare
function sayHi() {
    console.log("Hello!");
}

// then add as a method
user.sayHi = sayHi;
console.log(user);

user.sayHi();

// Method shorthand
// There exists a shorter syntax for methods in an object literal:

user = {
    sayHi: function() {
        alert("Hello");
    }
};

// method shorthand looks better, right?
user = {
    sayHi() {
        alert("Hello");
    }
};

// As demonstrated, we can omit "function" and just write sayHi().
// To tell the truth, the notations are not fully identical. There are subtle differences related to object inheritance (to be covered later),

// “this” in methods

// It’s common that an object method needs to access the information stored in the object to do its job.

let enduser = {
    name: "John",
    age: 30,

    sayHi() {
        // "this" is the "current object"
        alert(this.name);
    }
};

enduser.sayHi(); // John

// Technically, it’s also possible to access the object without this, by referencing it via the outer variable:

// alert(user.name); // "user" instead of "this"

// But such code is unreliable. If we decide to copy user to another variable, e.g. admin = user and overwrite user with something else, then it will access the wrong object.

let admin = enduser;
enduser = null; // overwrite to make things obvious

admin.sayHi(); // TypeError: Cannot read property 'name' of null

// If we used this.name instead of user.name inside the alert, then the code would work.

// "this" is not bound

// In JavaScript, keyword "this" behaves unlike most other programming languages. It can be used in any function, even if it’s not a method of an object.

// There’s no syntax error in the following example:

let user = { name: "John" };
let master = { name: "Admin" };

function sayHi() {
    alert( this.name );
}

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)

// The rule is simple: if obj.f() is called, then this is obj during the call of f. So it’s either user or admin in the example above.

// Calling without an object: this == undefined

// We can even call the function without an object at all:

function sayHi() {
  alert(this);
}

sayHi(); // undefined

// Usually such call is a programming error. If there’s this inside a function, it expects to be called in an object context.

// The consequences of unbound this
// The concept of run-time evaluated this has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

// Arrow functions have no "this"

let person = {
    firstName: "Ilya",
    sayHi() {
      let arrow = () => alert(this.firstName);
      arrow();
    }
};
  
user.sayHi(); // Ilya

// Please note that arrow functions are special: they have no this. When this is accessed inside an arrow function, it is taken from outside.

// Task

// Using "this" in object literal

// Here the function makeUser returns an object.

// What is the result of accessing its ref? Why?

function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // What's the result?

// Answer: an error.

// Try it:

function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined

// That’s because rules that set this do not look at object definition. Only the moment of call matters.

// Here the value of this inside makeUser() is undefined, because it is called as a function, not as a method with “dot” syntax.

// The value of this is one for the whole function, code blocks and object literals do not affect it.

// So ref: this actually takes current this of the function.

// We can rewrite the function and return the same this with undefined value:

function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined

// As you can see the result of alert( makeUser().name ) is the same as the result of alert( user.ref.name ) from the previous example.

// Here’s the opposite case:

function makeUser() {
  return {
    name: "John",
    ref() {
      return this;
    }
  };
}

let user = makeUser();

alert( user.ref().name ); // John

// Now it works, because user.ref() is a method. And the value of this is set to the object before dot ..
// Create a calculator

// Create an object calculator with three methods:

//     read() prompts for two values and saves them as object properties with names a and b respectively.
//     sum() returns the sum of saved values.
//     mul() multiplies saved values and returns the result.

let calculator = {
  // ... your code ...
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

let calculator = {
  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },

  read() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

// Open the solution with tests in a sandbox.
// Chaining

// There’s a ladder object that allows to go up and down:

let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // shows the current step
    alert( this.step );
  }
};

// Now, if we need to make several calls in sequence, can do it like this:

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0

// Modify the code of up, down and showStep to make the calls chainable, like this:

// ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0

// Such approach is widely used across JavaScript libraries.

// Open a sandbox with tests.

// The solution is to return the object itself from every call.

let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    alert( this.step );
    return this;
  }
};

ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0

// We also can write a single call per line. For long chains it’s more readable:

ladder
  .up()
  .up()
  .down()
  .showStep() // 1
  .down()
  .showStep(); // 0

// Open the solution with tests in a sandbox.