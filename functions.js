function showMessage() {
    alert( 'Hello everyone!' );
  }

function name(parameter1, parameter2, ... parameterN) {
    // body
   }

   function showMessage() {
    alert( 'Hello everyone!' );
  }
  
  showMessage();
  showMessage();

// Local Variables

function showMessage() {
    let message = "Hello, I'm JavaScript!"; // local variable
    alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Error! The variable is local to the function

// Global Variables

let userName = 'John';

function showMessage() {
  userName = "Bob"; // (1) changed the outer variable

  let message = 'Hello, ' + userName;
  alert(message);
}

alert( userName ); // John before the function call

showMessage();

alert( userName ); // Bob, the value was modified by the function

// INFO
let userName = 'John';

function showMessage() {
  let userName = "Bob"; // declare a local variable

  let message = 'Hello, ' + userName; // Bob
  alert(message);
}

// the function will create and use its own userName
showMessage();

alert( userName ); // John, unchanged, the function did not access the outer variable

// Global variables are visible from any function (unless shadowed by locals).

// It’s a good practice to minimize the use of global variables. Modern code has few or no globals. 
// Most variables reside in their functions. Sometimes though, they can be useful to store project-level data.

// Parameters

function showMessage(from, text) { // parameters: from, text
  alert(from + ': ' + text);
}

showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)

function showMessage(from, text) {
    from = '*' + from + '*'; // make "from" look nicer
    alert( from + ': ' + text );
}
  
let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann

//   Default values

// For instance, the aforementioned function showMessage(from, text) can be called with a single argument:

showMessage("Ann");

// That’s not an error. Such a call would output "*Ann*: undefined". As the value for text isn’t passed, 
// it becomes undefined.

// We can specify the so-called “default” (to use if omitted) value for a parameter in the function declaration,
// using =:

function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given

// The default value also jumps in if the parameter exists, but strictly equals undefined, like this:

showMessage("Ann", undefined); // Ann: no text given

function showMessage(from, text = anotherFunction()) {
    // anotherFunction() only executed if no text given
    // its result becomes the value of text
  }


//   Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.

//   We can check if the parameter is passed during the function execution, by comparing it with undefined:
  
function showMessage(text) {
    // ...
    if (text === undefined) { // if the parameter is missing
        text = 'empty message';
    }
    alert(text);
}

showMessage(); // empty message

// Modern JavaScript engines support the nullish coalescing operator ??, it’s better when most falsy values, 
// such as 0, should be considered “normal”:

function showCount(count) {
  // if count is undefined or null, show "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown

// Returning a value

// There may be many occurrences of return in a single function. For instance:

function checkAge(age) {
  if (age >= 18) {
    return true;
  } else {
    return confirm('Do you have permission from your parents?');
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}

// It is possible to use return without a value. That causes the function to exit immediately.

// For example:

function showMovie(age) {
  if ( !checkAge(age) ) {
    return;
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}

// In the code above, if checkAge(age) returns false, then showMovie won’t proceed to the alert.

// A function with an empty return or without it returns undefined

// If a function does not return a value, it is the same as if it returns undefined:

// Never add a newline between return and the value

// For a long expression in return, it might be tempting to put it on a separate line, like this:

return
 (some + long + expression + or + whatever * f(a) + f(b))

// That doesn’t work, because JavaScript assumes a semicolon after return. That’ll work the same as:

return;
 (some + long + expression + or + whatever * f(a) + f(b))

// So, it effectively becomes an empty return.

// If we want the returned expression to wrap across multiple lines, we should start it at the same line as 
// return. Or at least put the opening parentheses there as follows:

return (
    some + long + expression
    + or +
    whatever * f(a) + f(b)
    )
  
//   And it will work just as we expect it to.

// Naming a function

// Functions are actions. So their name is usually a verb.

// Examples of such names:

showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false

// Functions == Comments

// Functions should be short and do exactly one thing. If that thing is big, 
// maybe it’s worth it to split the function into a few smaller functions.

// For instance, compare the two functions showPrimes(n) below. Each one outputs prime numbers up to n.

// The first variant uses a label:

function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}

// The second variant uses an additional function isPrime(n) to test for primality:

function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}

// The second variant is easier to understand, isn’t it? Instead of the code piece we see a name of the 
// action (isPrime). Sometimes people refer to such code as self-describing.