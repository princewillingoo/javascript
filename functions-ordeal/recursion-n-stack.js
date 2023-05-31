// Recursion and stack

// Two ways of thinking

// For something simple to start with – let’s write a function pow(x, n) that raises x to a natural power of n. 
// In other words, multiplies x by itself n times.

pow(2, 2) = 4
pow(2, 3) = 8
pow(2, 4) = 16

// two ways to implement it.

function pow(x, n) {
    let result = 1;

    // multiply results by x n times in the loop
    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

console.log( pow(2, 3) ); // 8

function pow(x, n) {
    if (n == 1) {
        return x;
    }else {
        return x * pow(x, n - 1);
    }
}

console.log( pow(2, 3) ); // 8

// Recursion is usually shorter

function pow(x, n) {
    return (n == 1) ? x : (x * pow(x, n - 1));
}

// Recursive traversals

// Another great application of the recursion is a recursive traversal.

// Imagine, we have a company. The staff structure can be presented as an object:

// An iterative approach is not easy, because the structure is not simple.

let company = { // the same object, compressed for brevity
    sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
    development: {
      sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
      internals: [{name: 'Jack', salary: 1300}]
    }
};

// The function to do the job
function sumSalaries(department) {
    if (Array.isArray(department)) { // case (1)
      return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
    } else { // case (2)
      let sum = 0;
      for (let subdep of Object.values(department)) {
        sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
      }
      return sum;
   }
}
  
console.log(sumSalaries(company)); // 7700

// Recursive structures

// A recursive (recursively-defined) data structure is a structure that replicates itself in parts.

// Linked list

// For instance:

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

// The list can be easily split into multiple parts and later joined back:

let secondList = list.next.next;
list.next.next = null;

// To join:

list.next.next = secondList;

// And surely we can insert or remove items in any place.

// For instance, to prepend a new value, we need to update the head of the list:

// prepend the new value to the list
list = { value: "new item", next: list };

// To remove a value from the middle, change next of the previous one:
list.next = list.next.next;