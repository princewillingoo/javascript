// Destructuring assignment

// The two most used data structures in JavaScript are Object and Array.

// Destructuring assignment is a special syntax that allows us to “unpack” arrays or objects into a bunch of variables, as sometimes that’s more convenient.

// Destructuring also works great with complex functions that have a lot of parameters, default values, and so on. Soon we’ll see that.

// Array destructuring

// we have an array with the name and surname
let arr = ["John", "Smith"]

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

// It looks great when combined with split or other array-returning methods:

let [firstNamex, surnamex] = "John Smith".split(' ');
console.log(firstNamex); // John
console.log(surnamex);  // Smith

console.log(firstName); // John
console.log(surname); // Smith

// Ignore elements using commas

let [firstNamez, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log( title ); // Consul

// Works with any iterable on the right-side

let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

// Assign to anything at the left-side

let user = {};
[user.name, user.surename] = "John Smith".split(' ');

console.log(user.name); // John
console.log(user.surename); // Smith

// Looping with .entries()

// We can use it with destructuring to loop over keys-and-values of an object:

let user$ = {
    name: "John",
    age: 30
};

// loop over keys-and-values
for (let [key, value] of Object.entries(user$)){
    console.log(`${key}:${value}`); // name:John, then age:30
}

// The similar code for a Map is simpler, as it’s iterable:

let user_ = new Map();
user.set("name", "John");
user.set("age", "30");

// Map iterates as [key, value] pairs, very convenient for destructuring
for (let [key, value] of user_) {
    console.log(`${key}:${value}`); // name:John, then age:30
}

// Swap variables trick

let guest = "Jane";
let admin = "Pete";

// Let's swap the values: make guest=Pete, admin=Jane
[guest, admin] = [admin, guest];
console.log(`${guest} ${admin}`); // Pete Jane (successfully swapped!)

// The rest ‘…’

// Usually, if the array is longer than the list at the left, the “extra” items are omitted.

let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log(name1); // Julius
console.log(name2); // Caesar
// Further items aren't assigned anywhere

// If we’d like also to gather all that follows – we can add one more parameter that gets “the rest” using three dots "...":

let [name1x, name2x, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// Default values

// If the array is shorter than the list of variables at the left, there’ll be no errors. Absent values are considered undefined:

let [qfirstName, qsurname] = [];

console.log(qfirstName); // undefined
console.log(qsurname); // undefined

// If we want a “default” value to replace the missing one, we can provide it using =:
// Default values can be more complex expressions or even function calls. They are evaluated only if 
// the value is not provided.

// runs only prompt for surname
let [name = prompt('name?'), surename=prompt('surname?')] = ["Julius"]

// Please note: the prompt will run only for the missing value (surname).

// Object destructuring

let {var1, var2} = {var1:"...", var2:"..."}

let options = {
    xtitle: "Menu",
    width: 100,
    height: 200
};

let {xtitle, width, height} = options;

console.log(title);  // Menu
console.log(width);  // 100
console.log(height); // 200

// The order does not matter. This works too:

// changed the order in let {...}
let {oheight, owidth, otitle} = { title: "Menu", height: 200, width: 100 }

// If we want to assign a property to a variable with another name, for instance, 
// make options.width go into the variable named w, then we can set the variable name using a colon:

let {width:w, height: h, ctitle} = options;

// For potentially missing properties we can set default values using "=", like this:

let {width$ = 100, height$ = 200, title$} = options;

// In the code below prompt asks for width, but not for title:

let {width_ = prompt("width?"), title_ = prompt("title?")} = options;

// We also can combine both the colon and equality:

let {width: wx = 100, height: hx = 200, titlex} = options;

// If we have a complex object with many properties, we can extract only what we need:

// only extract title as a variable
let { titler } = options;

// The rest pattern “…”

// title = property named title
// rest = object with the rest of properties
let {titleof, ...restof} = options;

// now title="Menu", rest={height: 200, width: 100}
console.log(restof.height);  // 200
console.log(restof.width);   // 100

// Gotcha if there’s no let

// The problem is that JavaScript treats {...} in the main code flow (not inside another expression) as a code block. Such code blocks can be used to group statements, like this:

// To show JavaScript that it’s not a code block, we can wrap the expression in parentheses (...):

// let title, width, height;

// okay now
({title, width, height} = {title: "Menu", width: 200, height: 100});

console.log( title ); // Menu

// Nested destructuring

// If an object or an array contain other nested objects and arrays, we can use more 
// complex left-side patterns to extract deeper portions.

let option$ = {
    size: {
        width: 100,
        height: 200
    },
    items: ["Cake", "Donut"],
    extra: true
};

// destructuring assignment split in multiple lines for clarity
let {
    size: { // put size here
        widthd,
        heightd
    },
    items: [item1, item2], // assign items here
    titled = "Menu" // not present in the object (default value is used)

} = option$;


console.log(title);  // Menu
console.log(width);  // 100
console.log(height); // 200
console.log(item1);  // Cake
console.log(item2);  // Donut

// Smart function parameters

// There are times when a function has many parameters, most of which are optional. 
// That’s especially true for user interfaces

// Here’s a bad way to write such function:

function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}

// In real-life, the problem is how to remember the order of arguments.

// Another problem is how to call a function when most parameters are ok by default.

// Like this?

// undefined where default values are fine
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])

// That’s ugly. And becomes unreadable when we deal with more parameters.

// Destructuring comes to the rescue!

// We can pass parameters as an object, and the function immediately destructurizes them into variables:

// we pass object to function
let optionss = {
    title: "My menu",
    items: ["Item1", "Item2"]
};
  
// ...and it immediately expands it to variables
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    // title, items – taken from options,
    // width, height – defaults used
    console.log( `${title} ${width} ${height}` ); // My Menu 200 100
    console.log( items ); // Item1, Item2
}
  
showMenu(optionss);

// We can also use more complex destructuring with nested objects and colon mappings:

let optionsu = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

function showMenu({
  title = "Untitled",
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
  console.log( `${title} ${w} ${h}` ); // My Menu 100 200
  console.log( item1 ); // Item1
  console.log( item2 ); // Item2
}

showMenu(optionsu)

// Please note that such destructuring assumes that showMenu() does have an argument. If we want all values by default, then we should specify an empty object:

showMenu({}); // ok, all values are default

showMenu(); // this would give an error

// We can fix this by making {} the default value for the whole object of parameters:

function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  console.log( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200

// In the code above, the whole arguments object is {} by default, so there’s always something to destructurize.

// The full object syntax:

/*let {prop : varName = default, ...rest} = object*/

// The full array syntax:

/*let [item1 = default, item2, ...rest] = array*/