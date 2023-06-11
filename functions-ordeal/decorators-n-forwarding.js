// Decorators and forwarding, call/apply

// JavaScript gives exceptional flexibility when dealing with functions. They can be passed around, used as 
// objects, and now we’ll see how to forward calls between them and decorate them.

// Transparent caching

function slow(x) {
    // there can be a heavy CPU-intensive job here
    console.log(`Called with ${x}`);
    return x;
}

function cachingDecorator(func) {
    let cache = new Map();
  
    return function(x) {
      if (cache.has(x)) {    // if there's such key in cache
        return cache.get(x); // read the result from it
      }
  
      let result = func(x);  // otherwise call func
  
      cache.set(x, result);  // and cache (remember) the result
      return result;
    };
}  

slow = cachingDecorator(slow);

console.log( slow(1) ); // slow(1) is cached and the result returned
console.log( "Again: " + slow(1) ); // slow(1) result returned from cache

console.log( slow(2) ); // slow(2) is cached and the result returned
console.log( "Again: " + slow(2) ); // slow(2) result returned from cache

// The cachingDecorator is reusable. We can apply it to another function.
// The caching logic is separate, it did not increase the complexity of slow 
// itself (if there was any).
// We can combine multiple decorators if needed (other decorators will follow).

// Using “func.call” for the context

// The caching decorator mentioned above is not suited to work with object methods.

// we'll make worker.slow caching
let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        // scary CPU-heavy task here
        console.log("Called with " + x);
        return x * this.someMethod(); // (*)
    }
};

console.log( worker.slow(1) ); // the original method works

worker.slow = cachingDecorator(worker.slow); // now make it caching

console.log( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined

// The reason is that the wrapper calls the original function as func(x) in the line (**). And, when 
// called like that, the function gets this = undefined.

// We would observe a similar symptom if we tried to run:

let func = worker.slow;
func(2);

// So, the wrapper passes the call to the original method, but without the context this. Hence the error.

// Let’s fix it.

// There’s a special built-in function method func.call(context, …args) that allows to call a function explicitly setting this.

// The syntax is:

func.call(context, arg1, arg2, '...')

// In our case, we can use call in the wrapper to pass the context to the original function:

function cachingDecorator(func, hash) {
    let cache = new Map();
    return function() {
      let key = hash(arguments); // (*)
      if (cache.has(key)) {
        return cache.get(key);
      }
  
      let result = func.call(this, ...arguments); // (**)
  
      cache.set(key, result);
      return result;
    };
}

// Going multi-argument

worker = {
    slow(min, max) {
      return min + max; // scary CPU-hogger is assumed
    }
};
  
// should remember same-argument calls
worker.slow = cachingDecorator(worker.slow);

// There are many solutions possible:

//     Implement a new (or use a third-party) map-like data structure that is more versatile and allows multi-keys.
//     Use nested maps: cache.set(min) will be a Map that stores the pair (max, result). So we can get result as cache.get(min).get(max).
//     Join two values into one. In our particular case we can just use a string "min,max" as the Map key. For flexibility, we can allow to provide a hashing function for the decorator, that knows how to make one value from many.

worker = {
    slow(min, max) {
      console.log(`Called with ${min},${max}`);
      return min + max;
    }
};

function cachingDecorator(func, hash) {
    let cache = new Map();
    return function() {
      let key = hash(arguments); // (*)
      if (cache.has(key)) {
        return cache.get(key);
      }
  
      let result = func.call(this, ...arguments); // (**)
  
      cache.set(key, result);
      return result;
    };
}
  
function hash(args) {
    return args[0] + ',' + args[1];
}
  
worker.slow = cachingDecorator(worker.slow, hash);
  
console.log( worker.slow(3, 5) ); // works
console.log( "Again " + worker.slow(3, 5) ); // same (cached)

// func.apply

// Instead of func.call(this, ...arguments) we could use func.apply(this, arguments).

// There’s only a subtle difference regarding args:

//     The spread syntax ... allows to pass iterable args as the list to call.
//     The apply accepts only array-like args.

// So these two calls are almost equivalent:

func.call(context, ...args);
func.apply(context, args);

// Passing all arguments along with the context to another function is called call forwarding.

let wrapper = function() {
    return func.apply(this, arguments);
};
  
// When an external code calls such wrapper, it is indistinguishable 
// from the call of the original function func.

// Borrowing a method

// Now let’s make one more minor improvement in the hashing function:

// As of now, it works only on two arguments. It would be better if it 
// could glue any number of args.

function hash(args) {
    return args.join();
}

// …Unfortunately, that won’t work. Because we are calling hash(arguments), and 
// arguments object is both iterable and array-like, but not a real array.

// Still, there’s an easy way to use array join:

function hash() {
  console.log( [].join.call(arguments) ); // 1,2
}

hash(1, 2);

// The trick is called method borrowing.

// We take (borrow) a join method from a regular 
// array ([].join) and use [].join.call to run it 
// in the context of arguments.

// Decorators and function properties

// It is generally safe to replace a function or a method with a decorated one, except for one little thing. 
// If the original function had properties on it, like func.calledCount or whatever, then the decorated one will 
// not provide them. Because that is a wrapper. So one needs to be careful if one uses them.

// It is quite common to take array methods and apply them to arguments.