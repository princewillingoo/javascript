// Replace Function Expressions with arrow functions in the code below:

// function ask(question, yes, no) {
//   if (confirm(question)) yes();
//   else no();
// }

// ask(
//   "Do you agree?",
//   function() { alert("You agreed."); },
//   function() { alert("You canceled the execution."); }
// );

// SOLUTION

// ask(
//     "Do you agree?",
//     () => alert("You agreed"),
//     () => alert("You canceled the execution.")
// )

// let user = {};
// user["name"] = "John";
// user.surname = "Smith";
// user["name"] = "Pete";
// delete user.name;
// console.log(user);

// function isEmpty(obj){
//   for (let prop in obj){
//     return false
//   }
//   return true
// }

// let schedule = {};
// console.log( isEmpty(schedule) ); // true
// schedule["8:30"] = "get up";
// console.log( isEmpty(schedule) ); // false

// let salaries = {
//   John: 100,
//   Ann: 160,
//   Pete: 130
// }

// let sum = 0;
// for(let key in salaries){
//   sum += salaries[key]
// }

// console.log(sum)

// before the call
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
}

function multiplyNumeric(obj){
  for (let prop in obj){
    if (typeof (obj[prop]) == 'Number') {
      obj[prop] = obj[prop] * 2
    }
  }
}

multiplyNumeric(menu);

console.log(menu)