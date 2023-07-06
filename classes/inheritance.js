// Let’s say we have class Animal:

class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }

    run(speed) {
        this.speed = speed
        console.log(`${this.name} runs with speed ${this.speed}`);
    }
    stop() {
        this.speed = 0
        console.log(`${this.name} stands still.`);
    }
}

let animal = new Animal("My animal");

// The syntax to extend another class is: class Child extends Parent.

class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} hides!`);
    }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!

// Any expression is allowed after extends
function f(phrase) {
    return class {
        sayHi() { console.log(phrase); }
    };
}

class User extends f("Hello") {}

new User().sayHi(); // Hello
// Here class User inherits from the result of f("Hello").

// That may be useful for advanced programming patterns when we use functions 
// to generate classes depending on many conditions and can inherit from them.

// Overriding a method

// Classes provide "super" keyword for that.

//     super.method(...) to call a parent method.
//     super(...) to call a parent constructor (inside our constructor only).

// For instance, let our rabbit autohide when stopped:

class Rabbitx extends Animal {
    hide() {
        console.log(`${this.name} hides!`)
    }

    stop() {
        super.stop(); // call parent stop
        this.hide(); // and then hide
    }
}

rabbit = new Rabbitx("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!

// Arrow functions have no super

// Overriding constructor

class Rabbit extends Animal {
    // generated for extending classes without own constructors
    constructor(...args) {
      super(...args);
    }
}

// For the Rabbit constructor to work, it needs to call super() before using this, like here:


class Rabbit extends Animal {

    constructor(name, earLength) {
      super(name);
      this.earLength = earLength;
    }
  
    // ...
}
  
// now fine
rabbit = new Rabbit("White Rabbit", 10);
console.log(rabbit.name); // White Rabbit
console.log(rabbit.earLength); // 10#

// Overriding class fields: a tricky note

// In other words, the parent constructor always uses its own field value, 
// not the overridden one.