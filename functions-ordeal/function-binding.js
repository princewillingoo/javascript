// Function binding

// When passing object methods as callbacks, for instance to setTimeout, there’s a known problem: 
// "losing this".

// Losing “this”

let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`)
    }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!

// The last line can be rewritten as:

let f = user.sayHi;
setTimeout(f, 1000); // lost user context

// Solution 1: a wrapper

setTimeout(function(){
    user.sayHi(); // Hello, John!
}, 1000)

// Now it works, because it receives user from the outer lexical environment, 
// and then calls the method normally.

setTimeout(() => user.sayHi(), 1000); // Hello, John!

// What if before setTimeout triggers (there’s one second delay!) user changes value? Then, suddenly, 
// it will call the wrong object!

// ...the value of user changes within 1 second

user = {
    sayHi() { console.log("Another user in setTimeout!"); }
};
  
// Another user in setTimeout!

// Solution 2: bind

// The basic syntax is:

// more complex syntax will come a little later
let boundFunc = func.bind(context);

user = {
    firstName: "John"
};

function func() {
    console.log(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); //

// Here func.bind(user) as a “bound variant” of func, with fixed this=user.

// All arguments are passed to the original func “as is”, for instance:

funcUser("Hello"); // Hello, John (argument "Hello" is passed, and this=user)

// Now let’s try with an object method:

user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
}

let sayHi = user.sayHi.bind(user); // (*)

// can run it without an object
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
user = {
    sayHi() { console.log("Another user in setTimeout!"); }
};

// Convenience method: bindAll

// If an object has many methods and we plan to actively pass it around, then we could bind 
// them all in a loop:

for (let key in user) {
    if (typeof user[key] == 'function') {
        user[key] = user[key].bind(user);
    }
}

// Partial functions

// We can bind not only this, but also arguments. That’s rarely done, but sometimes can be handy.

let bound = func.bind(context, [arg1], [arg2], [argN]);

// It allows to bind context as this and starting arguments of the function.

function mul(a, b) {
    return a * b;
}
  
let double = mul.bind(null, 2);
  
console.log( double(3) ); // = mul(2, 3) = 6
console.log( double(4) ); // = mul(2, 4) = 8
console.log( double(5) ); // = mul(2, 5) = 10

// The call to mul.bind(null, 2) creates a new function double that passes calls to mul, 
// fixing null as the context and 2 as the first argument. Further arguments are passed “as is”.

// Going partial without context

// Fortunately, a function partial for binding only arguments can be easily implemented.

function partial(func, ...argsBound) {
    return function(...args) { // (*)
      return func.call(this, ...argsBound, ...args);
    }
  }
  
 // Usage:
user = {
    firstName: "John",
    say(time, phrase) {
      console.log(`[${time}] ${this.firstName}: ${phrase}!`);
    }
};
  
// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());
  
user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
