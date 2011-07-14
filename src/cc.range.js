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
        return new CC.Class(start, length);
    },
    isInside: function(location) {
        return (location - this.location) < this.length;
    }
});