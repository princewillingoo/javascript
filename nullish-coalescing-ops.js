// As it treats null and undefined similarly, we’ll use a special term here, in this article. For brevity, we’ll say that a value is “defined” when it’s neither null nor undefined.

// The result of a ?? b is:

//     if a is defined, then a,
//     if a isn’t defined, then b.

// In other words, ?? returns the first argument if it’s not null/undefined. Otherwise, the second one.

// The nullish coalescing operator isn’t anything completely new. It’s just a nice syntax to get the first “defined” value of the two.

// We can rewrite result = a ?? b using the operators that we already know, like this:

result = (a !== null && a !== undefined) ? a : b;

// The common use case for ?? is to provide a default value.

// For example, here we show user if its value isn’t null/undefined, otherwise Anonymous:

let user;

alert(user ?? "Anonymous"); // Anonymous (user is undefined)

//Here’s the example with user assigned to a name:

let user_ = "John";

alert(user_ ?? "Anonymous"); // John (user is not null/undefined)

// We can also use a sequence of ?? to select the first value from a list that isn’t null/undefined.

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value:
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder

// Comparison with ||

// let firstName = null;
// let lastName = null;
// let nickName = "Supercoder";

// shows the first truthy value:
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder

// The important difference between them is that:

//     || returns the first truthy value.
//     ?? returns the first defined value.

// In practice though, we may want to use default value only when the variable is null/undefined. 
// That is, when the value is really unknown/not set.

// For example, consider this:

let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0

// Precedence

// The precedence of the ?? operator is the same as ||. They both equal 3

// Using ?? with && or ||

// Due to safety reasons, JavaScript forbids using ?? together with && and || operators, 
// unless the precedence is explicitly specified with parentheses.

// Summary

//     The nullish coalescing operator ?? provides a short way to choose the first “defined” value from a list.

//     It’s used to assign default values to variables:

// // set height=100, if height is null or undefined
// height = height ?? 100;

// The operator ?? has a very low precedence, only a bit higher than ? and =, so consider adding parentheses when using it in an expression.

// It’s forbidden to use it with || or && without explicit parentheses.
