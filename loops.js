// The “while” loop

// The while loop has the following syntax:

while (condition) {
  // code
  // so-called "loop body"
}

// While the condition is truthy, the code from the loop body is executed.

// For instance, the loop below outputs i while i < 3:

let i = 0;
while (i < 3) { // shows 0, then 1, then 2
  alert( i );
  i++;
}

// Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and converted to a boolean by while.

// For instance, a shorter way to write while (i != 0) is while (i):

let j = 3;
while (j) { // when i becomes 0, the condition becomes falsy, and the loop stops
  alert( j );
  j--;
}

// The “do…while” loop

// The condition check can be moved below the loop body using the do..while syntax:

do {
  // loop body
} while (condition);

// The loop will first execute the body, then check the condition, and, while it’s truthy, 
// execute it again and again.

// For example:

let k = 0;
do {
  alert( k );
  k++;
} while (k < 3);

// This form of syntax should only be used when you want the body of the loop to execute at least once regardless of the condition being truthy. 
// Usually, the other form is preferred: while(…) {…}.

// The “for” loop

// The for loop is more complex, but it’s also the most commonly used loop.

for (begin; condition; step) {
  // ... loop body ...
}

for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
    alert(i);
  }
  
//   Let’s examine the for statement part-by-part:
//   part 		
//   begin 	let i = 0 	Executes once upon entering the loop.
//   condition 	i < 3 	Checked before every loop iteration. If false, the loop stops.
//   body 	alert(i) 	Runs again and again while the condition is truthy.
//   step 	i++ 	Executes after the body on each iteration.

// Here’s exactly what happens in our case:

// for (let i = 0; i < 3; i++) alert(i)

// run begin
let l = 0
// if condition → run body and run step
if (l < 3) { alert(l); i++ }
// if condition → run body and run step
if (l < 3) { alert(l); i++ }
// if condition → run body and run step
if (l < 3) { alert(l); i++ }
// ...finish, because now i == 3

// Inline variable declaration

// Here, the “counter” variable i is declared right in the loop. This is called an “inline” variable declaration. Such variables are visible only inside the loop.

for (let i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, no such variable

// Instead of defining a variable, we could use an existing one:

let o = 0;

for (o = 0; o < 3; o++) { // use an existing variable
  alert(o); // 0, 1, 2
}

alert(i); // 3, visible, because declared outside of the loop

// Skipping parts

// Any part of for can be skipped.

// For example, we can omit begin if we don’t need to do anything at the loop start.

// Like here:

let x = 0; // we have i already declared and assigned

for (; x < 3; x++) { // no need for "begin"
  alert( x ); // 0, 1, 2
}

// We can also remove the step part:

let z = 0;

for (; z < 3;) {
  alert( z++ );
}

// This makes the loop identical to while (i < 3).

// We can actually remove everything, creating an infinite loop:

for (;;) {
  // repeats without limits
}

// Please note that the two for semicolons ; must be present. Otherwise, there would be a syntax error.

// Breaking the loop

// Normally, a loop exits when its condition becomes falsy.

// But we can force the exit at any time using the special break directive.

// For example, the loop below asks the user for a series of numbers, “breaking” when no number is entered:

let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

  if (!value) break; // (*)

  sum += value;

}
alert( 'Sum: ' + sum );

// The combination “infinite loop + break as needed” is great for situations when a loop’s condition must be 
// checked not in the beginning or end of the loop, but in the middle or even in several places of its body.

// Continue to the next iteration

for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body
  if (i % 2 == 0) continue;

  alert(i); // 1, then 3, 5, 7, 9
}

// For even values of i, the continue directive stops executing the body and passes control to the next iteration 
// of for (with the next number). So the alert is only called for odd values.

// No break/continue to the right side of ‘?’

// Please note that syntax constructs that are not expressions cannot be used with the ternary operator ?. In particular, directives such as break/continue aren’t allowed there.

// For example, if we take this code:

if (i > 5) {
  alert(i);
} else {
  continue;
}

// …and rewrite it using a question mark:

(i > 5) ? alert(i) : continue; // continue isn't allowed here

// …it stops working: there’s a syntax error.

// This is just another reason not to use the question mark operator ? instead of if.

// Labels for break/continue

for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if we want to exit from here to Done (below)?
  }
}

alert('Done!');

// The ordinary break after input would only break the inner loop. That’s not sufficient – labels, come to the rescue!

// A label is an identifier with a colon before a loop:

// labelName: for (...) {
//   ...
// }

// The break <labelName> statement in the loop below breaks out to the label:

outer: for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) break outer; // (*)

    // do something with the value...
  }
}

alert('Done!');

// In the code above, break outer looks upwards for the label named outer and breaks out of that loop.

// Labels do not allow to “jump” anywhere

// Labels do not allow us to jump into an arbitrary place in the code.

// For example, it is impossible to do this:

break label; // jump to the label below (doesn't work)

label: for (...)

// A break directive must be inside a code block. Technically, any labelled code block will do, e.g.:

label: {
  // ...
  break label; // works
  // ...
}

// …Although, 99.9% of the time break is used inside loops, as we’ve seen in the examples above.

// A continue is only possible from inside a loop.

// There are many algorithms for this task.

// Let’s use a nested loop:

// For each i in the interval {
//   check if i has a divisor from 1..i
//   if yes => the value is not a prime
//   if no => the value is a prime, show it
// }

// The code using a label:

let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // for each i...

  for (let j = 2; j < i; j++) { // look for a divisor..
    if (i % j == 0) continue nextPrime; // not a prime, go next i
  }

  alert( i ); // a prime
}

// There’s a lot of space to optimize it. For instance, we could look for the divisors from 2 to square root of i. 
// But anyway, if we want to be really efficient for large intervals, we need to change the approach and rely on 
// advanced maths and complex algorithms like Quadratic sieve, General number field sieve etc.