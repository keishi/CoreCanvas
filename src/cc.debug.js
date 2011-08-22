CC.DEBUG = function(args) {
    console.log(Array.prototype.map.call(args, function(o) {
        if (typeof o.toString == "function") {
            return o.toString();
        }
        return o;
    }));
};