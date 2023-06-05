// Scheduling: setTimeout and setInterval


setTimeout // allows us to run a function once after the interval of time.
setInterval // allows us to run a function repeatedly, starting after the interval 
            // of time, then repeating continuously at that interval.


// setTimeout

// The syntax:

let timerId = setTimeout(func|code, [delay], [arg1], [arg2], "...")

// Example

function sayHi(phrase, who) {
    console.log( phrase + ', ' + who )
}

setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John

// But using strings is not recommended, use arrow functions instead of them, like this:

setTimeout(() => alert('Hello'), 1000);

// Pass a function, but don’t run it

// Novice developers sometimes make a mistake by adding brackets () after the function:

// wrong!
setTimeout(sayHi(), 1000);

// Canceling with clearTimeout

// A call to setTimeout returns a “timer identifier” timerId that we can use to cancel the execution.

let timerIdx = setTimeout("...");
clearTimeout(timerIdx)

// setInterval

// The setInterval method has the same syntax as setTimeout:

let timerIds = setInterval(func|code, [delay], [arg1], [arg2], '...')

// repeat with the interval of 2 seconds
timerIds = setInterval(() => alert('tick'), 2000);

// after 5 seconds stop
setTimeout(() => { clearInterval(timerIds); alert('stop'); }, 5000);

// Nested setTimeout

// There are two ways of running something regularly.

/** instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let tickId = setTimeout(function tick() {
    alert('tick');
    tickId = setTimeout(tick, 2000); // (*)
}, 2000);

// The nested setTimeout is a more flexible method than setInterval. 
// This way the next call may be scheduled differently, depending on 
// the results of the current one.

let delay = 5000;

let timerIdn = setTimeout(function request(){
    // ...send request...

    if ("request failed due to server overload"){
        // increase the interval to the next run
        delay *= 2;
    }

    timerIdn = setTimeout(request, delay)

}, delay);

// Nested setTimeout allows to set the delay between the executions more 
// precisely than setInterval

// Let’s compare two code fragments. The first one uses setInterval:
let i = 1;
setInterval(function() {
  func(i++);
}, 100);

// The second one uses nested setTimeout:
let ii = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);

// Zero delay setTimeout

// There’s a special use case: setTimeout(func, 0), or just setTimeout(func).

// This schedules the execution of func as soon as possible. But the scheduler 
// will invoke it only after the currently executing script is complete.

setTimeout(() => alert("World"));

alert("Hello");

// Zero delay scheduling with setTimeout(func, 0) (the same as setTimeout(func)) 
// is used to schedule the call “as soon as possible, but after the current script is complete”.

// Task

i = 0;

setTimeout(() => alert(i), 100); // 100000000

// assume that the time to execute this function is >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
}