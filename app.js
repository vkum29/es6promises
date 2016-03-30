//promise.reject

'use strict';

let p1 = Promise.reject("Testing static reject");

p1.catch((reason) => {
  console.log(reason); // "Testing static reject"
});

Promise.reject(new Error("fail")).catch((error) => {
  console.log(error); // Stacktrace
});
