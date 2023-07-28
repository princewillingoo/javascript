// Promise API

// There are 6 static methods in the Promise class. 

// Promise.all

// promises to execute in parallel and wait until all of them are ready.

Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(result => console.log(result))

// A common trick is to map an array of job data into an array of promises, and then wrap that into Promise.all.

// example with fetching user information for an array of GitHub users by their names

let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // all responses are resolved successfully
    for(let response of responses) {
      console.log(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => console.log(user.name)));


// In case of an error, other promises are ignored

// Promise.all(iterable) allows non-promise “regular” values in iterable

Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 1000)
    })
]).then(result => console.log(result)); // 1, 2, 3

// Promise.allSettled

// Even if one request fails, we’re still interested in the others.

let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url',
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => {
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        console.log(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        console.log(`${urls[num]}: ${result.reason}`);
      }
    });
  });

// Promise.race

// Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).

promise = Promise.race(iterable);

// After the first settled promise “wins the race”, all further results/errors are ignored.

// Promise.any

// Similar to Promise.race, but waits only for the first fulfilled promise and gets its result.

promise = Promise.any(iterable);

// Promise.resolve/reject

