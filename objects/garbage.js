// Garbage collection

// Reachability

// The main concept of memory management in JavaScript is reachability.

// Simply put, “reachable” values are those that are accessible or usable somehow. They are guaranteed to be stored in memory.

//     There’s a base set of inherently reachable values, that cannot be deleted for obvious reasons.

//     For instance:
//         The currently executing function, its local variables and parameters.
//         Other functions on the current chain of nested calls, their local variables and parameters.
//         Global variables.
//         (there are some other, internal ones as well)

//     These values are called roots.

//     Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.

//     For instance, if there’s an object in a global variable, and that object has a property referencing another object, that object is considered reachable. And those that it references are also reachable. Detailed examples to follow.

// There’s a background process in the JavaScript engine that is called garbage collector. It monitors all objects and removes those that have become unreachable.

// user has a reference to the object

let user = {
  name: "John"
};

user = null;

// Now John becomes unreachable. There’s no way to access it, no references to it. Garbage collector will 
// junk the data and free the memory.

// Two references

// user has a reference to the object
let pple = {
    name: "John"
  };
  
  let admin = pple;

// Now if we do the same:

pple = null;

// …Then the object is still reachable via admin global variable, so it must stay in memory. If we overwrite admin too, then it can be removed.

// Interlinked objects

function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;
  
    return {
      father: man,
      mother: woman
    }
  }
  
  let family = marry({
    name: "John"
  }, {
    name: "Ann"
  });

// > family
// {
//   father: <ref *1> {
//     name: 'John',
//     wife: { name: 'Ann', husband: [Circular *1] }
//   },
//   mother: <ref *2> {
//     name: 'Ann',
//     husband: <ref *1> { name: 'John', wife: [Circular *2] }
//   }
// }

// It’s not enough to delete only one of these two references, because all objects would still be reachable.
// But if we delete both, then we can see that John has no incoming reference any more:
// Outgoing references do not matter. Only incoming ones can make an object reachable. So, John is now unreachable and will be removed from the memory with all its data that also became unaccessible.

// Unreachable island

// It is possible that the whole island of interlinked objects becomes unreachable and is removed from the memory.
// The source object is the same as above. Then:

// family = null;

// Internal algorithms

// The basic garbage collection algorithm is called “mark-and-sweep”.

// The following “garbage collection” steps are regularly performed:

//     The garbage collector takes roots and “marks” (remembers) them.
//     Then it visits and “marks” all references from them.
//     Then it visits marked objects and marks their references. All visited objects are remembered, so as not to visit the same object twice in the future.
//     …And so on until every reachable (from the roots) references are visited.
//     All objects except marked ones are removed.

// That’s the concept of how garbage collection works. JavaScript engines apply many optimizations to make it run faster and not introduce any delays into the code execution.

// Some of the optimizations:

//     Generational collection – objects are split into two sets: “new ones” and “old ones”. In typical code, many objects have a short life span: they appear, do their job and die fast, so it makes sense to track new objects and clear the memory from them if that’s the case. Those that survive for long enough, become “old” and are examined less often.
//     Incremental collection – if there are many objects, and we try to walk and mark the whole object set at once, it may take some time and introduce visible delays in the execution. So the engine splits the whole set of existing objects into multiple parts. And then clear these parts one after another. There are many small garbage collections instead of a total one. That requires some extra bookkeeping between them to track changes, but we get many tiny delays instead of a big one.
//     Idle-time collection – the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.
