new CC.Class({
    $name: "CC.Color",
    $prototype: CC.Vec3,
    $properties: ["red", "green", "blue"],
    init: function(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = typeof alpha != "undefined" ? alpha : 0;
    },
    setRed: function(v) {
        this.x = v;
    },
    getRed: function() {
        return this.x;
    },
    setGreen: function(v) {
        this.y = v;
    },
    getGreen: function() {
        return this.y;
    },
    setBlue: function(v) {
        this.z = v;
    },
    getBlue: function() {
        return this.z;
    },
    setFill: function() {
        CC.currentContext.fillStyle = this.toCSSString();
    },
    setStroke: function() {
        CC.currentContext.strokeStyle = this.toCSSString();
    },
    toCSSString: function() {
        if (this.alpha > 0) {
            return "rgba(" + this.x + "," + this.y + "," + this.z + "," + this.alpha + ")";
        }
        return "rgb(" + this.x + "," + this.y + "," + this.z + ")";
    }
});
CC.Color.white = new CC.Color(255, 255, 255);
CC.Color.black = new CC.Color(0, 0, 0);
CC.Color.red = new CC.Color(255, 0, 0);
CC.Color.green = new CC.Color(0, 255, 0);
CC.Color.blue = new CC.Color(0, 0, 255);
CC.Color.lightGray = new CC.Color(230, 230, 230);
