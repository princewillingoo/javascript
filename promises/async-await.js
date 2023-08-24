// Async/await

// The word “async” before a function means one simple thing: a function always returns a promise.

async function f() {
    return 1;
}

f().then(result => console.log(result))

async function f1() {
    return Promise.resolve(1);
}

f1().then(result => console.log(result))

// But not only that. There’s another keyword, await, that works only inside async functions,

// Await

// The keyword await makes JavaScript wait until that promise settles and returns its result.

async function f2() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
    });

    let result = await promise; // wait until the promise resolves (*)

    console.log(result); // "done!"
}

f2();

// It’s just a more elegant syntax of getting the promise result than promise.then. And, it’s easier to read and write.

// Error handling

async function f5() {

    try {
      let response = await fetch('/no-user-here');
      let user = await response.json();
    } catch(err) {
      // catches errors both in fetch and response.json
      alert(err);
    }
}
  
f5();

// If we don’t have try..catch, then the promise generated by the call of the async function f() becomes rejected.

async function f6() {
    let response = await fetch('http://no-such-url');
}
  
// f() becomes a rejected promise
f6().catch(alert); // TypeError: failed to fetch // (*)