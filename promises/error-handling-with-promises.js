// Error handling with promises

fetch('https://no-such-server.blabla') // rejects
    .then(response => response.json())
    .catch(err => console.log(err)) // // TypeError: failed to fetch (the text may vary)

// Implicit try…catch

new Promise((resolve, reject) => {
    resolve("ok");
}).then((result) => {
    throw new Error("Whoops!"); // rejects the promise
}).catch(alert); // Error: Whoops!0

// The final .catch not only catches explicit rejections, but also accidental errors in 
// the handlers above.

// Rethrowing

// In a regular try..catch we can analyze the error and maybe rethrow it if it can’t be handled. 
// The same thing is possible for promises.

// the execution: catch -> catch
new Promise((resolve, reject) => {
    throw new Error("Whoops!");
}).catch(function(error){

    if (error  instanceof URIError){
        // handle it
    }else {
        console.log("Can't handle such error");

        throw error; // throwing this or another error jumps to the next catch
    }
}).then(function() {
    /* doesn't run here */
}).catch(error => {
    console.log(`The unknown error has occurred: ${error}`)
    // don't return anything => execution goes the normal way
});

// Unhandled rejections

new Promise(function() {
    noSuchFunction(); // Error here (no such function)
  })
    .then(() => {
      // successful promise handlers, one or more
    }); // without .catch at the end!

// In case of an error, the promise becomes rejected, and the execution should jump to the closest rejection 
// handler. But there is none. So the error gets “stuck”. There’s no code to handle it.
// The JavaScript engine tracks such rejections and generates a global error in that case. 

