let year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year == 2015) console.log( 'You are right!' );

if (year == 2015){
    console.log( "That's correct!" );
    console.log( "You're so smart!" );
}

// We can also pass a pre-evaluated boolean value to if, like this:

// let cond = (year == 2015); // equality evaluates to true or false

// if (cond) {
//   ...
// }

let annual = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (annual == 2015) {
  console.log( 'You guessed it right!' );
} else {
  console.log( 'How can you be so wrong?' ); // any value except 2015
}

let farme = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (frame < 2015) {
  console.log( 'Too early...' );
} else if (frame > 2015) {
  console.log( 'Too late' );
} else {
  console.log( 'Exactly!' );
}

let accessAllowed;
let age = prompt('How old are you?', '');

if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}

console.log(accessAllowed);

let old = 3;
let accessGranted = (old > 18) ? true : false
console.log(accessGranted);

// let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

console.log( message );

let company = prompt('Which company created JavaScript?', '');

(company == 'Netscape') ?
   console.log('Right!') : console.log('Wrong.');


// It’s not recommended to use the question mark operator in this way.

// let company = prompt('Which company created JavaScript?', '');

if (company == 'Netscape') {
  console.log('Right!');
} else {
  console.log('Wrong.');
}