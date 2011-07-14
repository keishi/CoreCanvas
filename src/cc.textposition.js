new CC.Class({
    $name: "CC.TextPosition",
    $properties: ["col", "row", "lineNumber"],
    $prototype: CC.Vec2,
    setCol: function(v) {
        this.x = v;
    },
    getCol: function() {
        return this.x;
    },
    setRow: function(v) {
        this.y = v;
    },
    getRow: function() {
        return this.y;
    },
    setLineNumber: function(v) {
        this.y = v - 1;
    },
    getLineNumber: function() {
        return this.y + 1;
    },
});
