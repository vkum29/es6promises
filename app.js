//promise.catch

'use strict';

let p1 = Promise.resolve(10);
let p2 = 20;
let p3 = new Promise((resolve, reject)=>{
	setTimeout(resolve, 1000, '30');
});



p1.then((res)=>{
    console.log('response from p1 ',res);
    throw p3; //rejection: Throwing p3 as error
}).then((res)=>{
    //will not be called
    console.log('response from p3 ',res);
    return p2;
},(err)=>{
    //p3 rejection is handled here
    console.error('error at p3 ',err);
}).then((res)=>{
    //res is undefined as nothing was returned from the e3:error handling
    console.log('response from p2 ',res);
    throw new Error("nothing more to handle");
}).then((res)=>{
    //will not execute as we have error
    console.log('Nothing to reolve i must quit!');
}).catch((err)=>{
    //Error is catught herenode
    console.error('Error unhandled earlier ',err);
});
