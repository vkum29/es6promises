//promise.reject

'use strict';

let p1 = Promise.reject("Testing static reject");

p1.then(function(reason) {
  // not called
}, function(reason) {
  console.log(reason); // "Testing static reject"
});

Promise.reject(new Error("fail")).then(function(error) {
  // not called
}, function(error) {
  console.log(error); // Stacktrace
});
