//promise.then
//then returns a promise
//is used to chain multiple actions

'use strict';

let p1 = Promise.resolve(10);
let p2 = 20;
let p3 = new Promise((resolve, reject)=>{
	setTimeout(resolve, 1000, '30');
});

//Then handler
p1.then((res)=>{
    //handles resolution
    console.log('response from p1 ',res);
    return p3;
}).then((res)=>{
    console.log('response from p3 ',res);
    return p2;
}).then((res)=>{
    console.log('response from p2 ',res);
    throw new Error("nothing more to handle");
}).then((res)=>{
    console.log('resolve ', res);
},(err)=>{
    //handles rejection
    console.error('recieved ',err);
});
