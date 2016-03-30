//promise.catch

'use strict';

let p1 = Promise.reject(10);
let p2 = 20;
let p3 = new Promise((resolve, reject)=>{
	setTimeout(resolve, 1000, '30');
});

//p1 is rejected
p1.then((res)=>{
    //will not run
    console.log('response from p1 ',res);
    return p3;
}).then((res)=>{
    //will not run
    console.log('response from p3 ',res);
    return p2;
}).then((res)=>{
    //will not run
    console.log('response from p2 ',res);
    throw new Error("nothing more to handle");
}).catch((err)=>{
    //rejection will be handled here
    console.error('Error unhandled earlier ',err);
}).then((res)=>{
    //As error is handled this will run
    console.log('Nothing to resolve i must quit!');
});
