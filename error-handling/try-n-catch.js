try {

    console.log('Start of try runs');  // (1) <--

    lalala; // error, variable is not defined!

    console.log('End of try (never reached)');  // (2)

}catch (err) {

    console.log(`Error has occurred!`); // (3) <--

}

// So, try...catch can only handle errors that occur in valid code. 
// Such errors are called “runtime errors” or, sometimes, “exceptions”.

// try...catch works synchronously

// Error object

try{
    lalala; // error, variable is not defined!
} catch (err) {
    console.log(err.name); // ReferenceError
    console.log(err.message); // lalala is not defined
    console.log(err.stack); // ReferenceError: lalala is not defined at (...call stack)
  
    // Can also show an error as a whole
    // The error is converted to string as "name: message"
    console.log(err); // ReferenceError: lalala is not defined
}

// Optional “catch” binding

// If we don’t need error details, catch may omit it:

try {
    // ...
  } catch { // <-- without (err)
    // ...
}

// “Throw” operator

let json = '{ "age": 30 }'; // incomplete data

try {

  let user = JSON.parse(json); // <-- no errors

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name"); // (*)
  }

  console.log( user.name );

} catch (err) {
  console.log( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
}

// Rethrowing

try {

    let user = JSON.parse(json);
  
    if (!user.name) {
      throw new SyntaxError("Incomplete data: no name");
    }
  
    blabla(); // unexpected error
  
    console.log( user.name );
  
  } catch (err) {
  
    if (err instanceof SyntaxError) {
      console.log( "JSON Error: " + err.message );
    } else {
      throw err; // rethrow (*)
    }
  
}

// try…catch…finally

try {
    console.log( 'try' );
    if (confirm('Make an error?')) BAD_CODE();
  } catch (err) {
    console.log( 'catch' );
  } finally {
    console.log( 'finally' );
}

// Variables are local inside try...catch...finally

// finally and return

// try...finally