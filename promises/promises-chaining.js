// Promises chaining

new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000); // (*)
  
  }).then(function(result) { // (**)
  
    console.log(result); // 1
    return result * 2;
  
  }).then(function(result) { // (***)
  
    console.log(result); // 2
    return result * 2;
  
  }).then(function(result) {
  
    console.log(result); // 4
    return result * 2;
  
});



// The whole thing works, because every call to a .then returns a new promise, 
// so that we can call the next .then on it.

// A classic newbie error: technically we can also add many .then to a single promise. 
// This is not chaining.

let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  });
  
  promise.then(function(result) {
    console.log(result); // 1
    return result * 2;
  });
  
  promise.then(function(result) {
    console.log(result); // 1
    return result * 2;
  });
  
  promise.then(function(result) {
    console.log(result); // 1
    return result * 2;
});

// What we did here is just adding several handlers to one promise. They don’t pass the result to each other; 
// instead they process it independently.

// Returning promises

// A handler, used in .then(handler) may create and return a promise.

new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);
  
  }).then(function(result) {
  
    console.log(result); // 1
  
    return new Promise((resolve, reject) => { // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) { // (**)
  
    console.log(result); // 2
  
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) {
  
    console.log(result); // 4
  
});

// Example: loadScript