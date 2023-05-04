// Object to primitive conversion

// What happens when objects are added obj1 + obj2, subtracted obj1 - obj2 or printed using console.log(obj)?

// JavaScript doesn’t allow you to customize how operators work on objects. Unlike some other programming languages, such 
// as Ruby or C++, we can’t implement a special object method to handle addition (or other operators).

// In case of such operations, objects are auto-converted to primitives, and then the operation is carried out over these 
// primitives and results in a primitive value.

// That’s an important limitation: the result of obj1 + obj2 (or another math operation) can’t be another object!

// In this chapter we’ll cover how an object converts to primitive and how to customize it.

// We have two purposes:

//     It will allow us to understand what’s going on in case of coding mistakes, when such an operation happened accidentally.
//     There are exceptions, where such operations are possible and look good. E.g. subtracting or comparing dates (Date objects). We’ll come across them later.

// Conversion rules

// In the chapter Type Conversions we’ve seen the rules for numeric, string and boolean conversions of primitives. But we left a gap for objects. Now, as we know about methods and symbols it becomes possible to fill it.

//     There’s no conversion to boolean. All objects are true in a boolean context, as simple as that. There exist only numeric and string conversions.
//     The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, Date objects (to be covered in the chapter Date and time) can be subtracted, and the result of date1 - date2 is the time difference between two dates.
//     As for the string conversion – it usually happens when we output an object with console.log(obj) and in similar contexts.

// We can implement string and numeric conversion by ourselves, using special object methods.

// Hints

// How does JavaScript decide which conversion to apply?

// There are three variants of type conversion, that happen in various situations. They’re called “hints”, as described in the specification:

// 1. "string"

// output
console.log(obj);

// using object as a property key
anotherObj[obj] = 123;

// 2. "number"

// explicit conversion
let num = Number(obj);

// maths (except binary plus)
let n = +obj; // unary plus
let delta = date1 - date2;

// less/greater comparison
let greater = user1 > user2;

// 3. "default"

// binary plus uses the "default" hint
let total = obj1 + obj2;

// obj == number uses the "default" hint
if (user == 1) { "..." };

// The greater and less comparison operators, such as < >, can work with both strings and numbers too. 
// Still, they use the "number" hint, not "default". That’s for historical reasons.

// In practice though, things are a bit simpler.

// All built-in objects except for one case (Date object, we’ll learn it later) implement "default" conversion the same way as "number". And we probably should do the same.

// Still, it’s important to know about all 3 hints, soon we’ll see why.

// To do the conversion, JavaScript tries to find and call three object methods:

//     Call obj[Symbol.toPrimitive](hint) – the method with the symbolic key Symbol.toPrimitive (system symbol), if such method exists,
//     Otherwise if hint is "string"
//         try calling obj.toString() or obj.valueOf(), whatever exists.
//     Otherwise if hint is "number" or "default"
//         try calling obj.valueOf() or obj.toString(), whatever exists.

// Symbol.toPrimitive

// If the method Symbol.toPrimitive exists, it’s used for all hints, and no more methods are needed.

// For instance, here user object implements it:

let user ={
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint){
        console.log((`hint: ${hint}`));
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};

// conversion demo
console.log(user); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500) // hint: default -> 1500

// As we can see from the code, user becomes a self-descriptive string or a money amount, depending on 
// the conversion. The single method user[Symbol.toPrimitive] handles all conversion cases.

// toString/valueOf

// If there’s no Symbol.toPrimitive then JavaScript tries to find methods toString and valueOf:

//     For the "string" hint: call toString method, and if it doesn’t exist or if it returns an object instead of a primitive value, then call valueOf (so toString has the priority for string conversions).
//     For other hints: call valueOf, and if it doesn’t exist or if it returns an object instead of a primitive value, then call toString (so valueOf has the priority for maths).

// By default, a plain object has following toString and valueOf methods:

//     The toString method returns a string "[object Object]".
//     The valueOf method returns the object itself.

// Here’s the demo:

let user1 = {name: "John"};

console.log(user1); // [object Object]
console.log(user1.valueOf() === user1); // true

// So if we try to use an object as a string, like in an console.log or so, then by default we see [object Object].

// Let’s implement these methods to customize the conversion.

// For instance, here user does the same as above using a combination of toString and valueOf 
// instead of Symbol.toPrimitive:

let enduser = {
    name: "John",
    money: 1000,
  
    // for hint="string"
    toString() {
      return `{name: "${this.name}"}`;
    },
  
    // for hint="number" or "default"
    valueOf() {
      return this.money;
    }
  
  };
  
  console.log(enduser); // toString -> {name: "John"}
  console.log(+enduser); // valueOf -> 1000
  console.log(enduser + 500); // valueOf -> 1500

// Often we want a single “catch-all” place to handle all primitive conversions. In this case, we can implement toString only, like this:

let user3 = {
  name: "John",

  toString() {
    return this.name;
  }
};

console.log(user3); // toString -> John
console.log(user3 + 500); // toString -> John500

// In the absence of Symbol.toPrimitive and valueOf, toString will handle all primitive conversions.

// A conversion can return any primitive type

// The important thing to know about all primitive-conversion methods is that they do not necessarily return the “hinted” primitive.
// The only mandatory thing: these methods must return a primitive, not an object.


// Historical notes

// For historical reasons, if toString or valueOf returns an object, there’s no error, but such value is ignored (like if the method didn’t exist). That’s because in ancient times there was no good “error” concept in JavaScript.

// In contrast, Symbol.toPrimitive is stricter, it must return a primitive, otherwise there will be an error.

// Further conversions

// As we know already, many operators and functions perform type conversions, e.g. multiplication * converts operands to numbers.

// If we pass an object as an argument, then there are two stages of calculations:

//     The object is converted to a primitive (using the rules described above).
//     If necessary for further calculations, the resulting primitive is also converted.

// For instance:

let obj1 = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

console.log(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number

//     The multiplication obj * 2 first converts the object to primitive (that’s a string "2").
//     Then "2" * 2 becomes 2 * 2 (the string is converted to number).

// Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

let obj = {
  toString() {
    return "2";
  }
};

console.log(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation