var CC = {};

CC.DEBUG = true;


// Function.prototype.bind polyfill
if ( !Function.prototype.bind ) {
    Function.prototype.bind = function( obj ) {
        if(typeof this !== "function") { // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var slice = [].slice;
        var args = slice.call(arguments, 1);
        var self = this;
        var nop = function () {};
        var bound = function () {
            return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));    
        };
        bound.prototype = this.prototype;
        return bound;
    };
}
