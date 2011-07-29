new CC.Class({
    $name: "CC.Vec2",
    $properties: ["0", "1", "length"],
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
    isEqualTo: function(v) {
        return v.x == this.x && v.y == this.y;
    },
    invert: function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    },
    normSquared: function() {
        return this.x * this.x + this.y * this.y;
    },
    norm: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    add: function(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    },
    subtract: function(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    },
    multiply: function(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    },
    dot: function(vec) {
        return this.x * vec.x + this.y * vec.y;
    },
    toString: function() {
        return "(" + this.x + "," + this.y + ")";
    }
});
CC.Vec2.add = function(a, b) {
    return new CC.Vec2(a.x + b.x, a.y + b.y);
};
CC.Vec2.subtract = function(a, b) {
    return new CC.Vec2(a.x - b.x, a.y - b.y);
};

new CC.Class({
    $name: "CC.Vec3",
    $properties: ["0", "1", "2", "length"],
    init: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
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
    set2: function(v) {
        this.z = v;
    },
    get2: function() {
        return this.z;
    },
    getLength: function() {
        return 3;
    },
    isEqualTo: function(v) {
        return v.x == this.x && v.y == this.y && v.z == this.z;
    },
    invert: function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    },
    normSquared: function() {
        return this.x * this.x + this.y * this.y;
    },
    norm: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    add: function(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    },
    subtract: function(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    },
    multiply: function(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    },
    dot: function(vec) {
        return this.x * vec.x + this.y * vec.y;
    },
    toString: function() {
        return "Vec2(" + this.x + "," + this.y + ")";
    }
});
CC.Vec2.add = function(a, b) {
    return new CC.Vec2(a.x + b.x, a.y + b.y);
};
CC.Vec2.subtract = function(a, b) {
    return new CC.Vec2(a.x - b.x, a.y - b.y);
};

new CC.Class({
    $name: "CC.Vec3",
    $properties: ["0", "1", "2", "length"],
    init: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
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
    set2: function(v) {
        this.z = v;
    },
    get2: function() {
        return this.z;
    },
    getLength: function() {
        return 3;
    },
    isEqualTo: function(v) {
        return v.x == this.x && v.y == this.y && v.z == this.z;
    },
    invert: function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    },
    normSquared: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    norm: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    add: function(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    },
    subtract: function(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        return this;
    },
    multiply: function(factor) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
        return this;
    },
    dot: function(vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    },
    toString: function() {
        return "Vec3(" + this.x + "," + this.y + "," + this.z + ")";
    }
});