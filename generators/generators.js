// Generators

function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
// console.log(generator); // [object Generator]

// let one = generator.next();

// console.log(JSON.stringify(one)); // {value: 1, done: false}

// function* f(…) or function *f(…)?

// Generators are iterable

for(let value of generator) {
    console.log(value)
}

// As generators are iterable, we can call all related functionality, e.g. the spread syntax ...:

let sequence = [0, ...generateSequence()];

console.log(sequence)

// Using generators for iterables

let range = {
    from: 1,
    to: 5,
  
    // for..of range calls this method once in the very beginning
    [Symbol.iterator]() {
      // ...it returns the iterator object:
      // onward, for..of works only with that object, asking it for next values
      return {
        current: this.from,
        last: this.to,
  
        // next() is called on each iteration by the for..of loop
        next() {
          // it should return the value as an object {done:.., value :...}
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
};

// iteration over range returns numbers from range.from to range.to
console.log([...range]); // 1,2,3,4,5

// We can use a generator function for iteration by providing it as Symbol.iterator.

let rage = {
    from: 1,
    to: 5,

    *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
        for(let value = this.from; value <= this.to; value++) {
            yield value;
        }
    }
};

console.log([...rage]); // 1,2,3,4,5

/// Generator composition

// “embed” generators in each other.

function* generateSequencex(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

    // 0..9
    yield* generateSequencex(48, 57);
  
    // A..Z
    yield* generateSequencex(65, 90);
  
    // a..z
    yield* generateSequencex(97, 122);
  
}

let str = '';


for(let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
    //console.log(code)
}

// A generator composition is a natural way to insert a flow of one generator into another.

/// “yield” is a two-way street

// it not only returns the result to the outside, but also can pass the value inside the generator.

function* gen() {
    // Pass a question to the outer code and wait for an answer
    let result = yield "2 + 2 = ?"; 

    console.log(result);
}

let generatorx = gen();

let question = generatorx.next().value; // <-- yield returns the value

generatorx.next(4); // --> pass the result into the generator

/// generator.throw

// …But it can also initiate (throw) an error there. That’s natural, as an error is a kind of result.

function* genz() {
    try {
      let result = yield "2 + 2 = ?"; // (1)
  
      console.log("The execution does not reach here, because the exception is thrown above");
    } catch(e) {
      console.log(e); // shows the error
    }
}
  
generator = genz();
  
question = generator.next().value;
  
generator.throw(new Error("The answer is not found in my database")); // (2)

/// generator.return

function* gen$() {
    yield 1;
    yield 2;
    yield 3;
}
  
const g = gen$();
  
g.next();        // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }