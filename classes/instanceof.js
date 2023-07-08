// Class checking: "instanceof"

// The instanceof operator allows to check whether an object belongs to a certain class. 
// It also takes inheritance into account.

class Rabbit {}
let rabbit = new Rabbit();

// is it an object of Rabbit class?
console.log( rabbit instanceof Rabbit); //true

// It also works with constructor functions:

// instead of class
function Rabbitx() {}

console.log( new Rabbitx() instanceof Rabbitx ); // true

// …And with built-in classes like Array:

let arr = [1, 2, 3];
console.log( arr instanceof Array ); // true
console.log( arr instanceof Object ); // true