/**
 * MyPromise.js
 * Create and handle Promise without library in ES5
 * Simple demo - Work is for demo only (And does not implement all promise functionality as desired)
 * This is how VJ(author) was able to think of an implementation for promise and might match some library but is never ensured ;)
 */
/*global global:true, MyPromise:true, console:true, setTimeout:true*/

var window;

(function(global) {
    'use strict';
    //callback for promise then and catch handlers are resolved via cbHandler
    function cbHandler() {
        var _self = this;
        var currentResult = _self.finalValue;
        var nextResult;
        var foundPromise = false;
        _self.cbPool.forEach(function(object) {
            try {
                if (foundPromise) {
                    currentResult.cbPool.push(object);
                } else if (object[_self.state]) {
                    nextResult = object[_self.state](currentResult);
                    currentResult = nextResult;
                    _self.state = 'resolved';
                    if (nextResult && nextResult.type === 'MyPromise') {
                        foundPromise = true;
                    }
                }

            } catch (err) {
                _self.state = 'rejected';
                currentResult = err;
            }
        });
    }

    //resolve handler used by parameter for then handler
    function resolve(value) {
        var _self = this;
        //A promise is resolved/rejected only once - ensured that with check
        if (['resolved', 'rejected'].indexOf(_self.state) > -1) {
            return _self;
        } else {
            _self.state = 'resolved';
            _self.finalValue = value;
            cbHandler.call(_self);
        }
        //Chaining promise
        return _self;
    }

    //reject handler used in then
    function reject(value) {
        var _self = this;
        //A promise is resolved/rejected only once - ensured that with check
        if (['resolved', 'rejected'].indexOf(_self.state) > -1) {
            return _self;
        } else {
            _self.state = 'rejected';
            _self.rejection = 'unhandled';
            _self.finalValue = value;

            cbHandler.call(_self);
        }
        //Chaining promise
        return _self;
    }

    //class to create promise
    function MyPromise(handler) {
        var _self = this;
        function resolnHandler(value) {
            resolve.call(_self, value);
        }

        function rejectnHandler(value) {
            reject.call(_self, value);
        }

        //handler is must for a promise else throw error
        if (handler && typeof handler === 'function') {

            _self.handler = handler;
            _self.state = 'pending';
            _self.type = 'MyPromise';
            _self.cbPool = [];
            _self.id = Date.now();

            _self.handler(resolnHandler, rejectnHandler);

        } else {
            throw Error('Promise needs a function handler/resolver as an argument.');
        }

        //Chaining promise
        return _self;
    }

    MyPromise.prototype.then = function(resolnHandler, rejectnHandler) {

        //Then is executed immediately if the Promise was already resolved

        var _self = this;
        if (_self.state === 'resolved') {
            resolnHandler(_self);
        } else if (_self.state === 'rejected' && _self.rejection === 'unhandled') {
            rejectnHandler(_self);
        } else {
            //Will store the handlers in cbPool to executed later once promise is resolved
            _self.cbPool.push({
                'resolved': resolnHandler,
                'rejected': rejectnHandler
            });
        }
        //Chaining promise
        return _self;
    };

    MyPromise.prototype.catch = function(errorHandler) {

        //Just like then, is executed immediately if the Promise was already resolved
        var _self = this;
        if (_self.state !== 'pending' && _self.rejection === 'unhandled') {
            if (errorHandler && typeof errorHandler === 'function') {
                errorHandler(_self.finalValue);
                _self.rejection = 'handled';
            }
        } else {
            //Will store the handlers in cbPool to executed later once promise is resolved
            _self.cbPool.push({
                'rejected': errorHandler
            });
        }

        //Chaining promise
        return _self;
    };

    //Expose resolve and reject as a function
    MyPromise.resolve = function(obj) {
        return new MyPromise(function(resolve) {
            resolve(obj);
        });
    };

    MyPromise.reject = function(err) {
        return new MyPromise(function(undefined, reject) {
            reject(err);
        });
    };

    if (global) {
        global.MyPromise = MyPromise;
    }

})(window || global);



var p = new MyPromise(function(resolve) {//takes two params resolve and reject in same order
    'use strict';
    console.log('resolve promise \'p\' after 3000ms');
    setTimeout(resolve, 3000, 'success for p');
});


p.then(function(value) {
    'use strict';
    console.log('\n', 'value 1:: ', value);
    console.log('\t', 'promise \'p\' resolved');
    throw new MyPromise(function(resolve) { //takes two params resolve and reject in same order
        console.log('resolve promise \'p1\' after 3000ms');
        setTimeout(resolve, 3000, 'success for p1');
    });
}, function(err) {
    'use strict';
    console.log('\n', 'Error 1:: ', err);
    console.log('\t', 'promise \'p\' rejected');
}).catch(function(value) {
    'use strict';
    console.log('\n', 'Error 2:: ', value);
    console.log('\t', 'promise \'p\' resolved and then was catched');
}).then(function(value) {
    'use strict';
    console.log('\n', 'value 3:: ', value);
    console.log('\t', 'promise \'p\' resolved and then was handled 2nd time');
}, function(err) {
    'use strict';
    console.log('\n', 'Error 3:: ', err);
    console.log('\t', 'promise \'p\' resolved and then was unhandled 2nd time');
}).catch(function(value) {
    'use strict';
    console.log('\n', 'Error 4:: ', value);
    console.log('\t', 'promise \'p\' resolved and then was catched again');
});
