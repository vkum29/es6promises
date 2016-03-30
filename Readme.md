//Readme.md

# ES6 - Promise

All code is inside app.js and for execution is tested with node version 4.3.0 via *command* _node app[.js]_ command in terminal

## To checkout an example use tags:
* promise.all-01
* promise.all-02
* promise.catch-01
* promise.catch-02
* promise.catch-03
* promise.race-01
* promise.race-02
* promise.reject-01
* promise.reject-02
* promise.then-01
* promise.thenable-01
* promise.create-01

*Command*: git checkout < tagName >, *Example* : git checkout promise.all-01

## Tags:

* Promise.all:
  * *promise.all-01* : Simple example of promise getting resolved. A promise.all executes when all the prmoises/iterable object are resolved.

  * *promise.all-02* : An example on top of promise.all-01 which shows how promise.all behaves when any of the promise was rejected.

* Promise.catch:
  * *promise.catch-01* : Catching a error/rejection with promise.catch simple example

  * *promise.catch-02* : Another example of rejection handling : catch and then(undefined,onReject)

  * *promise.catch-03* : Simplified example to clear the doubts if any after seeing catch-01/catch-02

* promise.race:
  * *promise.race-01* : An example showing how Promise.race works

  * *promise.race-02* : Is comparison of race with all so it has same functionality as in race-01, exceptions is use of all method instead of race.

* Promise.reject:
  * *promise.reject-01* : Handling or rejecting a promise via then

  * *promise.reject-02* : Handling or rejecting a promise via catch

* Promise.resolve:
  * *promise.thenable-01* : Example of promise.resolve with thenable

* Promise.then:
  * *promise.then-01* : Example of then method

* Promise.create:
  * *promise.create-01* : Example of creating promise



