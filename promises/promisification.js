// Promisification

// In practice we may need to promisify more than one function, so it makes sense to use a helper.

function promisify(f) {
    return function (...args) { // return a wrapper-function (*)
      return new Promise((resolve, reject) => {
        function callback(err, result) { // our custom callback for f (**)
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
  
        args.push(callback); // append our custom callback to the end of f arguments
  
        f.call(this, ...args); // call the original function
      });
    };
}


// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);