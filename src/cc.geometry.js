new CC.Class({
    $name: "CC.Vec2",
    $properties: ["0", "1", "length", "width", "height"],
    init: function(x, y) {
        this.x = x;
        this.y = y;
    },
    set0: function(v) {
        this.x = v;
    },
    get0: function() {
        return this.x;
    },
    set1: function(v) {
        this.y = v;
    },
    get1: function() {
        return this.y;
    },
    getLength: function() {
        return 2;
    },
    setWidth: function(v) {
        this.x = v;
    },
    getWidth: function() {
        return this.x;
    },
    setHeight: function(v) {
        this.y = v;
    },
    getHeight: function() {
        return this.y;
    },
    inverse: function() {
        this.x = -this.x;
        this.y = -this.y;
    },
    add: function(vec) {
        this.x += vec.x;
        this.y += vec.y;
    },
    subtract: function(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    }
});
CC.Vec2.add = function(a, b) {
    return new CC.Vec2(a.x + b.x, a.y + b.y);
};
CC.Vec2.subtract = function(a, b) {
    return new CC.Vec2(a.x - b.x, a.y - b.y);
};

CC.Point = function(x, y) { return new CC.Vec2(x, y); };
CC.Size = function(width, height) { return new CC.Vec2(width, height); };

CC.Rect = function(x, y, width, height) {
    this.origin = CC.Point(x, y);
    this.size = CC.Size(width, height);
};
CC.Rect.prototype.isEmpty = function() {
    return this.size.width === 0 || this.size.height === 0;
};
CC.Rect.prototype.isNull = function() {
    return this.origin.x === null;
};
CC.Rect.prototype.isInfinite = function() {
    return this.size.width === Infinity || this.size.height === Infinity;
};
CC.Rect.prototype.containsPoint = function(point) {
    return (this.origin.x <= point.x &&
        this.origin.x + this.size.width >= point.x &&
        this.origin.y <= point.y &&
        this.origin.y + this.size.height >= point.y);
};
CC.Rect.prototype.containsRect = function(rect) {
    return (this.containsPoint(rect.origin) && 
        this.containsPoint(new CC.Point(rect.origin.x + rect.Size.width, 
        rect.origin.y + rect.Size.height)));
};
CC.Rect.prototype.intersectsRect = function(rect) {
    // TODO: implement
    return true;
};
