//promise.all

'use strict';

let p1 = Promise.reject(10);
let p2 = 20;
let p3 = new Promise((resolve, reject)=>{
	setTimeout(resolve, 1000, '30');
});

p1.then((res)=>{
    console.log('response from p1 ',res);
    return p3;
}).then((res)=>{
    console.log('response from p3 ',res);
    return p2;
}).then((res)=>{
    console.log('response from p2 ',res);
    throw new Error("nothing more to handle");
}).catch((err)=>{
    console.error('Error unhandled earlier ',err);
}).then((res)=>{
    console.log('Nothing to resolve i must quit!');
});
