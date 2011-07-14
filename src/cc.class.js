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
    
    var superClass = definition["$prototype"];
    var proto = superClass ? Object.create(superClass.prototype) : {};
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
    c.properties = definition["$properties"] || [];
    if (superClass) {
        c.properties = c.properties.concat(superClass.properties);
    }
    // TODO: Should remove duplicate properties
    for (var i=0; i < c.properties.length; i++) {
        var propertyName = c.properties[i];
        var propertyDefinition = {};
        var capitalizedPropertyName = propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
        if (typeof proto["get" + capitalizedPropertyName] == "function") {
            propertyDefinition["get"] = proto["get" + capitalizedPropertyName];
        }
        if (typeof proto["set" + capitalizedPropertyName] == "function") {
            propertyDefinition["set"] = proto["set" + capitalizedPropertyName];
        }
        Object.defineProperty(proto, propertyName, propertyDefinition);
    }
    c.prototype = proto;
};
CC.Class.displayName = "CC.Class";