//promise.creation

'use strict';


//settled promise state: fulfilled
let p1 = Promise.resolve('resolve');

//settled promise state: rejected
let p2 = Promise.reject('rejected');


//unsettled promise: pending
let p3 = new Promise((resolve, reject)=>{
    setTimeout(resolve, 1000, '30');
});

console.log(p1);

console.log(p2);

console.log(p3);
