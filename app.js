//promise.all

'use strict';

let p1 = new Promise(function(resolve, reject){
	resolve({then: function(onFullfill, onReject){ console.log("a thenable object in promise."); onReject("then executed");}});
});

p1.then(function(reason) {
  console.log("success ",reason);
}, function(reason) {
  console.log("failure ",reason); // "Testing static reject"
});

