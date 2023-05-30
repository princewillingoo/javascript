// JSON methods, toJSON

// Consider the case of a complex object

let user = {
    name: "John",
    age: 30,

    toString() {
        return `{name: "${this.name}", age: ${this.age}}`
    }
};

console.log(user); //  {name: "John", age: 30}

// …But in the process of development, new properties are added, old properties are renamed and removed. 
// Updating such toString every time can become a pain.

// JSON.stringify

// JavaScript provides methods:

//     JSON.stringify to convert objects into JSON.
//     JSON.parse to convert JSON back into an object.

// For instance, here we JSON.stringify a student:

let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    spouse: null
};

let json = JSON.stringify(student);

console.log(typeof json); // we've got a string!

console.log(json);

/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/

// JSON.stringify can be applied to primitives as well.

// JSON supports following data types:

    // Objects { ... }
    // Arrays [ ... ]
    // Primitives:
    //     strings,
    //     numbers,
    //     boolean values true/false,
    //     null.

console.log( JSON.stringify([1, 2, 3]) ); // [1,2,3]

// JSON is data-only language-independent specification, so some JavaScript-specific object properties are skipped by JSON.stringify.

// Namely:

//     Function properties (methods).
//     Symbolic keys and values.
//     Properties that store undefined.

// The important limitation: there must be no circular references.

// For instance:

let room = {
    number: 23
};

let meetup = {
    title: "Confrence",
    particpants: ["john", "ann"]
};

meetup.place = room;      // meetup references room
room.occupiedBy = meetup; // room references meetup

JSON.stringify(meetup); // Error: Converting circular structure to JSON

// Here, the conversion fails, because of circular reference: room.occupiedBy 
// references meetup, and meetup.place references room:

// Excluding and transforming: replacer

// The full syntax of JSON.stringify is:

// let json = JSON.stringify(value[, replacer, space])

// Most of the time, JSON.stringify is used with the first argument only. But if we need to 
// fine-tune the replacement process, like to filter out circular references, we can use the 
// second argument of JSON.stringify.


let room = {
    number: 23
};
  
let meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup references room
};
  
room.occupiedBy = meetup; // room references meetup
  
console.log( JSON.stringify(meetup, ['title', 'participants']) );
// {"title":"Conference","participants":[{},{}]}

// Let’s include in the list every property except room.occupiedBy that would cause the circular reference:

let room = {
    number: 23
};
  
let meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup references room
};
  
room.occupiedBy = meetup; // room references meetup
  
console.log( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/

// Now everything except occupiedBy is serialized. But the list of properties is quite long.

// Fortunately, we can use a function instead of an array as the replacer.

// In our case, we can return value “as is” for everything except occupiedBy. To ignore occupiedBy, 
// the code below returns undefined:

let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

console.log( JSON.stringify(meetup, function replacer(key, value) {
  console.log(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/

// Please note that replacer function gets every key/value pair including nested objects and array items.

// Formatting: space

// The third argument of JSON.stringify(value, replacer, space) is the number of spaces to use for pretty formatting.

let userx = {
    name: "John",
    age: 25,
    roles: {
      isAdmin: false,
      isEditor: true
    }
};

console.log(JSON.stringify(user, null, 4));

/* for JSON.stringify(user, null, 4) the result would be more indented:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/

// Custom “toJSON”

// an object may provide method toJSON for to-JSON conversion. JSON.stringify automatically calls it if available.

let room = {
    number: 23,
    toJson() {
        return this.number
    }
};

let meetup = {
    title: "Conference",
    room
};

console.log( JSON.stringify(room) ); // 23

console.log( JSON.stringify(meetup) );

// As we can see, toJSON is used both for the direct call JSON.stringify(room) and when room is 
// nested in another encoded object.

// JSON.parse

// To decode a JSON-string, we need another method named JSON.parse.

// The syntax:

let value = JSON.parse(str, [reviver])

let userData = '{"name": "John", "age": 35, "isAdmin": fasle, "friends": [0,1,2,3] }';

let user$ = JSON.parse(userData);

console.log( user$.friends[1] ); // 1

// Using reviver

// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

console.log( meetup.date.getDate() ); // Error!

// The value of meetup.date is a string, not a Date object. How could JSON.parse know that it should transform that string into a Date?

// Let’s pass to JSON.parse the reviving function as the second argument, that returns all values “as is”, but date will become a Date:
// By the way, that works for nested objects as well:

let schedule = `{
    "meetups": [
      {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
      {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
    ]
}`;
  
schedule = JSON.parse(schedule, function(key, value) {
    if (key == 'date') return new Date(value);
    return value;
});
  
console.log( schedule.meetups[1].date.getDate() ); // works!

// Task //

console.log( JSON.stringify(meetup, function replacer(key, value) {
    return ((key != "" && value == meetup)) ? undefined : value;
}));