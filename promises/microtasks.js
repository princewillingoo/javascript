// Microtasks

// Promise handlers .then/.catch/.finally are always asynchronous.

let promise = Promise.resolve();

promise.then(() => console.log("promise done!"));

console.log("code finished"); // this alert shows first

// Microtasks queue

// Promise handlers always go through this internal queue.

// Unhandled rejection

// An “unhandled rejection” occurs when a promise error is not handled at the end of the microtask queue.