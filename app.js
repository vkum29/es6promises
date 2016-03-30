//promise.all

'use strict';

let p1 = Promise.resolve(10);
let p2 = 20;
let p3 = new Promise((resolve, reject)=>{
	setTimeout(resolve, 1000, '30');
});

//Executes when all p1,p2,p3 are resolved so will fire after 1ms at least.
Promise.all([p1,p2,p3]).then((res)=>{
	console.log('res ',res);
},(err)=>{
	console.error('error ', err)
});

//Rejection scenario:
let p4 = new Promise((resolve, reject) => {
	reject('40');
});

//Executes when any rejection occurs so it wont wait for p3 to get resolved.
Promise.all([p1,p2,p3,p4]).then((res)=>{
	console.log('res ',res);
},(err)=>{
	console.error('error ', err);
});
