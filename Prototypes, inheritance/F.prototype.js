// F.prototype

animal = {
    eats: true
};

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal


console.log( rabbit.eats ); // true

// F.prototype only used at new F time

// F.prototype property is only used when new F is called, 
// it assigns [[Prototype]] of the new object.

// Default F.prototype, constructor property

// Every function has the "prototype" property 
// even if we don’t supply it.

function Rabbit() {}
// by default:
// Rabbit.prototype = { constructor: Rabbit }

rabbit = new Rabbit(); // inherits from {constructor: Rabbit}

console.log(rabbit.constructor == Rabbit); // true (from prototype)

Rabbit.prototype = {
    jumps: true,
    constructor: Rabbit
};
  
// now constructor is also correct, because we added it

// On regular objects the prototype is nothing special:

user = {
    name: "John",
    prototype: "Bla-bla" // no magic at all
};