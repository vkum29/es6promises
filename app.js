//promise.all
//This compare the Promise.race taggeed in promise.race-01

'use strict';

let p1 = Promise.resolve(10);
let p2 = new Promise((resolve, reject)=>{
    setTimeout(resolve, 500, '20');
});

//executes once both p1 and p2 is resolved
Promise.all([p1,p2]).then((res)=>{
	console.log('resolved with ',res);
},(err)=>{
	console.error('rejected with ', err)
});



let p3 = new Promise((resolve, reject) => {
	throw new Error('custom error -p3.');
});
//excutes on first rejection like race
Promise.all([p2,p3]).then((res)=>{
	console.log('resolved with ',res);
},(res)=>{
    console.log('resolved with ',res);
});
