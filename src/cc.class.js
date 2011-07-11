CC.Class = function(definition) {
    var c = function() {
        if (this.init) {
            this.init.apply(this, arguments);
        }
    };
    var className = definition["$name"];
    if (typeof className != "undefined") {
        var classPath = className.split(".");
        var currentObj = window;
        var len = classPath.length;
        for (var i=0; i < len - 1; i++) {
            currentObj = currentObj[classPath[i]];
            if (typeof currentObj == "undefined") {
                throw "CC.Class: Could not find object at " + classPath.slice(0, len - 1).join(".");
            }
        }
        currentObj[classPath[len - 1]] = c;
        c.displayName = className;
    }
    
    var proto = {};
    var superClass = definition["$inherits"];
    proto.prototype = superClass;
    for (var methodName in definition) {
        if (methodName.charAt(0) == "$") {
            continue;
        }
        var method = definition[methodName];
        proto[methodName] = method;
        if (typeof method.displayName == "undefined") {
            method.displayName = c.displayName + "." + methodName;
        }
    }
    var propertyNames = definition["$properties"] || [];
    for (var i=0; i < propertyNames.length; i++) {
        var propertyName = propertyNames[i];
        var propertyDefinition = {};
        var capitalizedPropertyName = propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
        if (typeof definition["get" + capitalizedPropertyName] == "function") {
            propertyDefinition["get"] = definition["get" + capitalizedPropertyName];
        }
        if (typeof definition["set" + capitalizedPropertyName] == "function") {
            propertyDefinition["set"] = definition["set" + capitalizedPropertyName];
        }
        Object.defineProperty(proto, propertyName, propertyDefinition);
    }
    c.prototype = proto;
};
CC.Class.displayName = "CC.Class";