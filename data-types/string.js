// Strings

// In JavaScript, the textual data is stored as strings. There is no separate type for a single character.
// The internal format for strings is always UTF-16, it is not tied to the page encoding.

// Quotes

let single = 'single-quoated';
let double = "double-quoted";

let backticks = `backticks`;

// Backticks, however, allow us to embed any expression into the string, by wrapping it in ${…}:

function sum(a, b) {
    return a + b;
}

console.log(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3

// Another advantage of using backticks is that they allow a string to span multiple lines:

let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

console.log(guestList); // a list of guests, multiple lines

// Special characters

let guestMemo = "Guests:\n * John\n * Pete\n * Mary";

console.log(guestMemo); // a multiline list of guests, same as above

console.log(guestList == guestMemo); // true


// String length

console.log( `My\n`.length ); // 3

// length is a property

// Accessing characters

let str = `Hello`

// the first character
console.log( str[0] ); // H
console.log( str.at(0) ); // H

// the last character
console.log( str[str.length - 1] ); // o
console.log( str.at(-1) );

// The square brackets always return undefined for negative indexes, for instance:

let word = `Hello`;

console.log( word[-2] ); // undefined
console.log( word.at(-2) ); // l

// We can also iterate over characters using for..of:

for (let char of "Hello"){
    console.log(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}

// Strings are immutable

// Strings can’t be changed in JavaScript. It is impossible to change a character.

// The usual workaround is to create a whole new string and assign it to str instead of the old one.

// For instance:

let st = 'Hi';

str = 'h' + st[1]; // replace the string

console.log( st ); // hi

// Changing the case

// Methods toLowerCase() and toUpperCase() change the case:

console.log( 'Interface'.toUpperCase() ); // INTERFACE
console.log( 'Interface'.toLowerCase() ); // interface

// Or, if we want a single character lowercased:

console.log( 'Interface'[0].toLowerCase() ); // 'i'

// Searching for a substring

// There are multiple ways to look for a substring within a string.

// The first method is str.indexOf(substr, pos).

// It looks for the substr in str, starting from the given position pos, and returns the position where the 
// match was found or -1 if nothing can be found.

let strx = 'Widget with id';

console.log( strx.indexOf('id', 2) ) // 12 // case-sensitive

// If we’re interested in all occurrences, we can run indexOf in a loop. Every new call is made with the position after the previous match:

let strz = 'As sly as a fox, as strong as an ox';

let targetz = 'as'; // let's look for it

let posz = 0;
while (true) {
  let foundPos = str.indexOf(target, posz);
  if (foundPos == -1) break;

  console.log( `Found at ${foundPos}` );
  posz = foundPos + 1; // continue the search from the next position
}

// The same algorithm can be layed out shorter:

let strt = "As sly as a fox, as strong as an ox";
let targett = "as";

let post = -1;
while ((post = str.indexOf(targett, post + 1)) != -1) {
  console.log( post );
}

strx .lastIndexOf(substr, position)
// There is also a similar method str.lastIndexOf(substr, position) that searches from the end of a string to its beginning.

// There is a slight inconvenience with indexOf in the if test. We can’t put it in the if like this:

let strw = "Widget with id";

if (strw.indexOf("Widget")) {
    console.log("We found it"); // doesn't work!
}

// So, we should actually check for -1, like this:

let strp = "Widget with id";

if (strp.indexOf("Widget") != -1) {
    console.log("We found it"); // works now!
}

// includes, startsWith, endsWith

console.log( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"

// The methods str.startsWith and str.endsWith do exactly what they say:

console.log( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
console.log( "Widget".endsWith("get") ); // true, "Widget" ends with "get"

// Getting a substring

// There are 3 methods in JavaScript to get a substring: substring, substr and slice.

// Let’s recap these methods to avoid any confusion:
// method 	selects… 	negatives

// slice(start, end) 	from start to end (not including end) 	allows negatives
// substring(start, end) 	between start and end (not including end) 	negative values mean 0
// substr(start, length) 	from start get length characters 	allows negative start


// Comparing strings

// Although, there are some oddities.

//    A lowercase letter is always greater than the uppercase:

console.log( 'a' > 'Z' ); // true

//    Letters with diacritical marks are “out of order”:

console.log( 'Österreich' > 'Zealand' ); // true

// To understand what happens, we should be aware that strings in Javascript are encoded using UTF-16. That is: each character has a corresponding numeric code.

// There are special methods that allow to get the character for the code and back:

str.codePointAt(pos)

// Returns a decimal number representing the code for the character at position pos:

console.log( "z".codePointAt(0).toString(16) ); // 7a (if we need a hexadecimal value)

// String.fromCodePoint(code)

//     Creates a character by its numeric code

console.log( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)

let str$ = '';

for (let i = 65; i <= 220; i++) {
  str$ += String.fromCodePoint(i);
}
console.log( str$ );
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ

// The characters are compared by their numeric code. The greater code means that the character is greater.
// The code for a (97) is greater than the code for Z (90).

// Correct comparisons

// Luckily, modern browsers support the internationalization standard ECMA-402.

// It provides a special method to compare strings in different languages, following their rules.

// The call str.localeCompare(str2) returns an integer indicating whether str is less, equal or greater than str2 according to the language rules:

//     Returns a negative number if str is less than str2.
//     Returns a positive number if str is greater than str2.
//     Returns 0 if they are equivalent.

console.log( 'Österreich'.localeCompare('Zealand') ); // -1

// There are several other helpful methods in strings:

//     str.trim() – removes (“trims”) spaces from the beginning and end of the string.
//     str.repeat(n) – repeats the string n times.


// Task

function ucFirst(chars){
    strq = chars.at(0).toUpperCase() + chars.slice(1, chars.length)
    return strq
}


function checkSpam(chars){
    strq = chars.toLowerCase()
    
    if (strq.includes('viagra') || strq.includes('xxx')){
        return true
    }
    
    return false
}

function truncate(str, maxlength){
    if (str.length > maxlength){
        return str.slice(0, maxlength - 1) + "..."
    }

function extractCurrencyValue(str) {
    return +str.slice(1);
    }
    
    return str
}