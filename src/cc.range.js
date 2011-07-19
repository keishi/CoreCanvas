new CC.Class({
    $name: "CC.Range",
    init: function(location, length) {
        this.location = location;
        this.length = length;
    },
    intersection: function(range) {
        var start = Math.max(this.location, range.location);
        var end = Math.min(this.location + this.length, range.location + range.length);
        var length = end > start ? end - start : 0;
        return new CC.Range(start, length);
    },
    isInside: function(location) {
        return (location - this.location) < this.length;
    },
    isEqualTo: function(r) {
        return this.location == r.location && this.length == r.length;
    },
    toString: function() {
        return "CC.Range(" + this.location + "," + this.length + ")";
    }
});