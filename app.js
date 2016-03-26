//promise.all

'use strict';

let p1 = Promise.resolve(10);
let p2 = 20;
let p3 = new Promise((resolve, reject)=>{
	setTimeout(resolve, 1000, '30');
});

Promise.all([p1,p2,p3]).then((res)=>{
	console.log('res ',res);
},(err)=>{
	console.error('error ', err)
});

