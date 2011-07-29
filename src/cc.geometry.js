new CC.Class({
    $name: "CC.Point",
    $prototype: CC.Vec2,
    offseted: function(x, y) {
        return new CC.Point(this.x + x, this.y + y);
    }
});

new CC.Class({
    $name: "CC.Size",
    $prototype: CC.Vec2,
    $properties: ["width", "height"],
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
    }
});

CC.Rect = function(x, y, width, height) {
    this.origin = new CC.Point(x, y);
    this.size = new CC.Size(width, height);
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
CC.Rect.prototype.toString = function() {
    return "Rect(" + this.origin.x + "," + this.origin.y + "," + this.size.width + "," + this.size.height + ")";
};
