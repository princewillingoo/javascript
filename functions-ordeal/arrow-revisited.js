// Arrow functions revisited

// It’s in the very spirit of JavaScript to create a function and pass it somewhere.

// And in such functions we usually don’t want to leave the current context. That’s where arrow functions come in handy.

// Arrow functions have no “this”

// For instance, we can use it to iterate inside an object method:

let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
  
    showList() {
      this.students.forEach(
        student => console.log(this.title + ': ' + student)
      );
    }
};
  
group.showList();

// If we used a “regular” function, there would be an error:

group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
  
    showList() {
      this.students.forEach(function(student) {
        // Error: Cannot read property 'title' of undefined
        console.log(this.title + ': ' + student);
      });
    }
};
  
group.showList();

// Not having this naturally means another limitation: arrow functions can’t be used as 
// constructors. They can’t be called with new.

// Arrows have no “arguments”

function defer(f, ms) {
    return function() {
      setTimeout(() => f.apply(this, arguments), ms);
    };
}
  
function sayHi(who) {
    console.log('Hello, ' + who);
}
  
let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds

// The same without an arrow function would look like:

function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}

