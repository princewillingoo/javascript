// Promise


let promise1 = new Promise(function(resolve, reject){
    // the function is executed automatically when the promise is constructed
    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve("done"), 1000)
});


promise2 = new Promise(function(resolve, reject){
    // after 1 second signal that the job is finished with an error
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// There can be only a single result or an error
// Reject with Error objects
// Immediately calling resolve/reject
// The state and result are internal

// Consumers: then, catch

// resolve runs the first function in .then
promise1.then(
    result => console.log(result), // shows "done!" after 1 second
    error => console.log(error) // doesn't run
);

promise2.then(
    result => console.log(result), // shows "done!" after 1 second
    error => console.log(error) // doesn't run
);

// If we’re interested only in successful completions, then we can provide only one 
// function argument to .then

promise1.then(console.log); // shows "done!" after 1 second

// catch : only for errors

// .catch(f) is the same as promise.then(null, f)
promise2.catch(console.log); // shows "Error: Whoops!" after 1 second

// Cleanup: finally
// Just like there’s a finally clause in a regular try {...} catch {...}, 
// there’s finally in promises.

new Promise((resolve, reject) => {
    setTimeout(() => resolve("value"), 2000);
})
    .finally(() => console.log("Promise ready")) // triggers first
    .then(result => console.log(result)); // <-- .then shows "value"


// We can attach handlers to settled promises
// Sometimes, it might be that a promise is already settled when we add a handler to it.

// Example: loadScript

function loadScript(src) {
    return new Promise(function(resolve, reject) {
      let script = document.createElement('script');
      script.src = src;
  
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`Script load error for ${src}`));
  
      document.head.append(script);
    });
}

promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => console.log(`${script.src} is loaded!`),
  error => console.log(`Error: ${error.message}`)
);

promise.then(script => console.log('Another handler...'));

