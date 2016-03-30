//promise.catch

'use strict';

let p1 = Promise.reject(10);
let p2 = 20;
let p3 = new Promise((resolve, reject)=>{
	setTimeout(resolve, 1000, '30');
});

//P1 was rejected
p1.then((res)=>{
    //will not be called
    console.log('response from p1 ',res);
    return p3;
}).then((res)=>{
    //will not be called
    console.log('response from p3 ',res);
    return p2;
},(err)=>{
    //error is handled here
    console.error('error at p3 ',err);
}).then((res)=>{
    //executes as error is handled earlier
    console.log('response from p2 ',res);
    throw new Error("nothing more to handle");
}).then((res)=>{
    //will not be called
    console.log('Nothing to reolve i must quit!');
}).catch((err)=>{
    //executed as error is handled
    console.error('Error unhandled earlier ',err);
});


//then(undefined, (err)=>{}) is equivalent to catch((err)=>{})
