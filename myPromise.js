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

    function handleResolveReject(handler){
        var _self = this;
        try{
            if(handler && typeof handler === 'function' ){
                _self.result = handler(_self.result);
                _self.state = 'resolved';
            }
        }catch(error){
            _self.state = 'rejected';
            if(error.type === 'MyPromise'){
                _self.result = error.toString();
            } else {
                _self.result = error;
            }
        }
    }

    function updateCbPool(obj){
        var _self = this;
        if(obj.resolved || obj.rejected){
            _self.cbPool.push(obj);
        }
    }
    //callback for promise then and catch handlers are resolved via cbHandler
    function cbHandler() {
        var _self = this;
        var result = _self.value;
        var foundPromise = false;
        _self.cbPool.forEach(function(object) {
            try {
                if (foundPromise) {
                    updateCbPool.call(result,object);
                } else if (object[_self.state]) {
                    result = object[_self.state](result);
                    _self.state = 'resolved';
                    if (result && result.type === 'MyPromise') {
                        foundPromise = true;
                    }
                }

            } catch (err) {
                _self.state = 'rejected';
                if(err.type === 'MyPromise'){
                    result = err.toString();
                } else {
                    result = err;
                }
            }
        });

        if(result && result.type === 'MyPromise' && result.state !== 'pending'){
            cbHandler.call(result);
        }
    }

    //resolve handler used by parameter for then handler
    function resolveReject(value, state) {
        var _self = this;
        //A promise is resolved/rejected only once - ensured that with check
        if (['resolved', 'rejected'].indexOf(_self.state) > -1) {
            return _self;
        } else {
            _self.state = state;
            _self.value = value;
            _self.result = value;
            cbHandler.call(_self);
        }
        //Chaining promise
        return _self;
    }

    //class to create promise
    function MyPromise(handler) {
        var _self = this;
        function resolnHandler(value) {
            resolveReject.apply(_self, [value, 'resolved']);
        }

        function rejectnHandler(value) {
            resolveReject.apply(_self, [value, 'rejected']);
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
        var _self = this;
        var cb = resolnHandler;

        //Then is executed immediately if the Promise was already resolved
        if(_self.state === 'pending'){
            //Will store the handlers in cbPool to executed later once promise is resolved
            updateCbPool.call(_self,{
                'resolved': resolnHandler,
                'rejected': rejectnHandler
            });
        } else {
            if (_self.state === 'rejected'){
                cb = rejectnHandler;
            }

            handleResolveReject.call(_self,cb);

            if(_self.result && _self.result.type === 'MyPromise'){
                return _self.result;
            }
        }

        //Chaining promise
        return _self;

    };

    MyPromise.prototype.catch = function(rejectnHandler) {

        //Just like then, is executed immediately if the Promise was already resolved
        var _self = this;

        if (_self.state === 'rejected') {
            handleResolveReject.call(_self,rejectnHandler);
        } else if(_self.state === 'pending'){
            //Will store the handlers in cbPool to executed later once promise is resolved
            updateCbPool.call(_self,{
                'rejected': rejectnHandler
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


    MyPromise.prototype.toString = function() {
        var _self = this;
        var value = '<pending>';
        if (_self.state === 'resolved') {
            value = '\'' + _self.value + '\'';
        } else if (_self.state === 'rejected') {
            value = '<' + _self.state + '> \'' + _self.value + '\'';
        }

        return 'MyPromise { ' + value + ' }';
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



var p = new MyPromise(function(resolve, reject){
    setTimeout(reject, 1000, 'hi');
});


p.then(function(value) {
    'use strict';
    console.log('\n', 'value 1:: ', value);
    console.log('\t', 'promise \'p\' resolved');
    return new MyPromise(function(resolve, reject){
        setTimeout(reject, 1000, 'hi1');
    });
}, function(err) {
    'use strict';
    console.log('\n', 'Error 1:: ', err);
    console.log('\t', 'promise \'p\' rejected');
    return new MyPromise(function(resolve, reject){
        setTimeout(reject, 1000, 'hi12');
    });
}).catch(function(value) {
    'use strict';
    console.log('\n', 'Error 2:: ', value);
    console.log('\t', 'promise \'p\' resolved and then was catched');
    throw new Error("just another try for catch");
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
