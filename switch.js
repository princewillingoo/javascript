// The "switch" statement

// A switch statement can replace multiple if checks.

// It gives a more descriptive way to compare a value with multiple variants.

// switch(x) {
//     case 'value1':  // if (x === 'value1')
//       ...
//       [break]
  
//     case 'value2':  // if (x === 'value2')
//       ...
//       [break]
  
//     default:
//       ...
//       [break]
//   }

// If the equality is found, switch starts to execute the code starting from the corresponding case, 
// until the nearest break (or until the end of switch).

let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
  case 4:
    alert( 'Exactly!' );
    break;
  case 5:
    alert( 'Too big' );
    break;
  default:
    alert( "I don't know such values" );
}

// If there is no break then the execution continues with the next case without any checks.

// An example without break:

// let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
}

// Any expression can be a switch/case argument

// Both switch and case allow arbitrary expressions.

// For example:

let q = "1";
let b = 0;

switch (+q) {
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;

  default:
    alert("this doesn't run");
}

// Here +q gives 1, that’s compared with b + 1 in case, and the corresponding code is executed

// Grouping of “case”

// let a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

  case 3: // (*) grouped two cases
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;

  default:
    alert('The result is strange. Really.');
}

// Type matters

// Let’s emphasize that the equality check is always strict. The values must be of the same type to match.