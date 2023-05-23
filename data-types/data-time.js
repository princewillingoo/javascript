// Date and time

// Let’s meet a new built-in object: Date. It stores the date, time and provides methods for date/time management.

// Creation

let now = new Date();
console.log(now); // shows current date/time

new Date(milliseconds)

// Create a Date object with the time equal to number of milliseconds (1/1000 of a second) passed after 
// the Jan 1st of 1970 UTC+0.

// 0 means 01.01.1970 UTC+0
let Jan01_1970 = new Date(0);
console.log( Jan01_1970 );

// now add 24 hours, get 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log( Jan02_1970 )

// An integer number representing the number of milliseconds that has passed since the beginning of 1970 
// is called a timestamp.

// We can always create a date from a timestamp using new Date(timestamp) and convert 
// the existing Date object to a timestamp using the date.getTime() method (see below).

// new Date(datestring) == Date.parse

let date = new Date("2017-01-26");
console.log(date);

new Date(year, month, date, hours, minutes, seconds, ms)

// For instance:

new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1); // the same, hours etc are 0 by default

// The maximal precision is 1 ms (1/1000 sec):

let datex = new Date(2011, 0, 1, 2, 3, 4, 567);
console.log( date ); // 1.01.2011, 02:03:04.567

// Access date components

getFullYear(), getMonth(), getDate(), getHours(), getMinutes(), getSeconds(), getMilliseconds(), getDay()
getTime(), getTimezoneOffset()

// Setting date components

// Setting date components

// The following methods allow to set date/time components:

    // setFullYear(year, [month], [date])
    // setMonth(month, [date])
    // setDate(date)
    // setHours(hour, [min], [sec], [ms])
    // setMinutes(min, [sec], [ms])
    // setSeconds(sec, [ms])
    // setMilliseconds(ms)
    // setTime(milliseconds) // (sets the whole date by milliseconds since 01.01.1970 UTC)

// Every one of them except setTime() has a UTC-variant, for instance: setUTCHours().

// some methods can set multiple components at once,

let today = new Date();

today.setHours(0);
console.log(today) // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
console.log(today); // still today, now 00:00:00 sharp.

// Autocorrection

// The autocorrection is a very handy feature of Date objects. We can set out-of-range values, and it will auto-adjust itself.

// For instance:

let datee = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
console.log(date); // ...is 1st Feb 2013!

// Date to number, date diff

// When a Date object is converted to number, it becomes the timestamp same as date.getTime():

let date1 = new Date();
console.log(+date1)

// The important side effect: dates can be subtracted, the result is their difference in ms.

let start = new Date(); // start measuring time

// do the job
for (let i = 0; i < 100000; 1++) {
    let doSomething = i * i * i;
}

let end = new Date(); // end measuring time

console.log( `The loop took ${end - start} ms` );

// Date.now()

// If we only want to measure time, we don’t need the Date object.

// There’s a special method Date.now() that returns the current timestamp.

let startx = Date.now(); // milliseconds count from 1 Jan 1970

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let endx = Date.now(); // done

console.log( `The loop took ${endx - startx} ms` ); // subtract numbers, not dates

// Benchmarking

// For more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.

// For example, like this:

function diffSubtract(date1, date2) {
    return date2 - date1;
}
  
function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
}
  
function bench(f) {
    let date1 = new Date(0);
    let date2 = new Date();
  
    let start = Date.now();
    for (let i = 0; i < 100000; i++) f(date1, date2);
    return Date.now() - start;
}
  
let time1 = 0;
let time2 = 0;
  
  // run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
for (let i = 0; i < 10; i++) {
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
}
  
console.log( 'Total time for diffSubtract: ' + time1 );
console.log( 'Total time for diffGetTime: ' + time2 );

// Date.parse from a string

// The method Date.parse(str) can read a date from a string.

// The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ, where:

//     YYYY-MM-DD – is the date: year-month-day.
//     The character "T" is used as the delimiter.
//     HH:mm:ss.sss – is the time: hours, minutes, seconds and milliseconds.
//     The optional 'Z' part denotes the time zone in the format +-hh:mm. A single letter Z would mean UTC+0.

// For instance:

let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

console.log(ms); // 1327611110417  (timestamp)

// We can instantly create a new Date object from the timestamp:

let datep = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

console.log(date);

// Task //

function getWeekDay(date){
    daysOfWeek = {
        0:"MO", 
        1:"TU", 
        2:"WE", 
        3:"TH", 
        4:"FR", 
        5:"SA", 
        6:"SU",
    }

    day = String(date.getDay())
    dayOfWeek = daysOfWeek[day]
    return dayOfWeek
}

// function getSecondsToday() {
//     today = new Date.now()
//     todayStart = today.setHours(0)
//     secondsPassed =  
// }