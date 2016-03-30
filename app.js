//promise.race
//Race executes whenever any one of given promise or iterable is resloved or rejected

'use strict';

let p1 = Promise.resolve(10);
let p2 = new Promise((resolve, reject)=>{
    setTimeout(resolve, 500, '20');
});


//Race handling resolve
Promise.race([p1,p2]).then((res)=>{
	console.log('resolved with ',res);
},(err)=>{
    //will not be called
	console.error('rejected with ', err)
});



let p3 = new Promise((resolve, reject) => {
	throw new Error('custom error -p3.');
});

//Race handling rejection
Promise.race([p2,p3]).then((res)=>{
    //will not be called
	console.log('resolved with ',res);
},(res)=>{
    console.log('resolved with ',res);
});
