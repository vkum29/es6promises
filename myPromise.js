/**
 * myPromise.js
 * Create and handle Promise without library in ES5
 * Simple demo - Work is for demo only (And does not implement all promise functionality as desired)
 * This is how VJ(author) was able to think of an implementation for promise and might match some library but is never ensured ;)
 */


(function() {
    //callback for promise then and catch handlers are resolved via cbHandler
    function cbHandler() {
        console.log('callback handler', this.state);
        var _self = this;
        var currentResult = _self;
        _self.cbPool.forEach(function(object) {
            if (_self.state === object.type) {
                newResult = object.cb(currentResult);
                currentResult = newResult;
            }
        })
    }

    //class to create promise
    function myPromise(handler) {
        //handler is must for a promise else throw error
        if (handler && typeof handler === 'function') {
            var _self = this;

            _self.handler = handler;
            _self.state = 'pending';
            _self.cbPool = [];

            //resolve handler used by parameter for then handler
            var resolve = function (value) {

                console.log('resolve is called');

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
            };

            //reject handler used in then
            var reject = function (value) {
                console.log('reject is called');
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
            };

            //A promise is Async so used settimeout to replicate same
            setTimeout(function(){
            _self.handler(resolve, reject);
            },0);

        } else {
            throw Error("Promise needs a function handler/resolver as an argument.");
        }

        //Chaining promise
        return _self;
    }

    myPromise.prototype.myThen = function(resolnHandler, rejectnHandler) {
        console.log('then is called');

        //Then is executed immediately if the Promise was already resolved

        var _self = this;
        if (_self.state === 'resolved') {
            resolnHandler(_self);
        } else if (_self.state === 'rejected' && _self.rejection === 'unhandled') {
            rejectnHandler(_self);
        } else {
            //Will store the handlers in cbPool to executed later once promise is resolved
            _self.cbPool.push({ 'cb': resolnHandler, type: 'resolved' });
            _self.cbPool.push({ 'cb': rejectnHandler, type: 'rejected' });
        }
        //Chaining promise
        return _self;
    };

    myPromise.prototype.myCatch = function(errorHandler) {
        console.log('catch is called');
         //Just like then, is executed immediately if the Promise was already resolved
        var _self = this;
        if (_self.state !== 'pending' && _self.rejection === 'unhandled') {
            if (errorHandler && typeof errorHandler === 'function') {
                errorHandler(_self.finalValue);
                _self.rejection = 'handled';
            }
        } else {
            //Will store the handlers in cbPool to executed later once promise is resolved
            _self.cbPool.push({ 'cb': errorHandler, type: 'rejected' });
        }

        //Chaining promise
        return _self;
    };

    var p = new myPromise(function(resolve, reject) {
        console.log("hi");

        resolve.call(p, "success");
    });

    // console.log(p);

    p.myThen(function(value) {
        console.log("called p resolved");
    }, function(err) {
        console.log("called p error");
    }).myThen(function(value) {
        console.log("called p resolved 2nd time");
    }, function(err) {
        console.log("called p error another time");
    });

    // console.log(p);

})();
