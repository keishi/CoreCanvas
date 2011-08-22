new CC.Class({
    $name: "CC.Selection",
    $properties: ["isCollapsed", "rangeCount"],
    init: function() {
        this._ranges = [];
    },
    getIsCollapsed: function(){
        var len = this._ranges.length;
        for (var i = 0; i < len; i++) {
            if (this._ranges[i].length != 0) {
                return false;
            }
        }
        return true;
    },
    getRangeCount: function() {
        return this._ranges.length;
    },
    getRangeAt: function(index) {
        return this._ranges[index];
    },
    collapseToStart: function() {
        this._ranges = [new CC.Range(this._ranges[0].location, 0)];
        this.direction = CC.SelectionDirection.NONE;
    },
    collapseToEnd: function() {
        var lastRange = this._ranges[this._ranges.length - 1];console.log(lastRange.toString());
        this._ranges = [new CC.Range(lastRange.location + lastRange.length, 0)];
        this.direction = CC.SelectionDirection.NONE;
    },
    collapseEachRangeToStart: function() {
        for (var i=0; i < this._ranges.length; i++) {
            this._ranges[i].length = 0;
        }
    },
    collapseEachRangeToEnd: function() {
        for (var i=0; i < this._ranges.length; i++) {
            var range = this._ranges[i];
            range.location = range.location + location.length;
            range.length = 0;
        }
    },
    moveEachRangeForward: function(textOffset) {
        for (var i=0; i < this._ranges.length; i++) {
            this._ranges[i].location += textOffset;
        }
    },
    _sortRanges: function() {
        this._ranges.sort(function(a, b) {
            return a.location - b.location;
        });
    },
    _concatSortedRangesIfPossible: function() {
        if (this._ranges.length <= 1)
            return;
        var newRanges = [];
        for (var i=0; i < this._ranges.length; i++) {
            var currentRange = this._ranges[i];
            while (i < this._ranges.length - 1) {
                var nextRange = this._ranges[i + 1];
                if (!currentRange.intersects(nextRange)) {
                    newRanges.push(currentRange);
                    break;
                }
                currentRange = currentRange.union(nextRange);
                i++;
            }
        }
        newRanges.push(currentRange);
        this._ranges = newRanges;
    },
    addRange: function(range) {
        this._ranges.push(range);
        this._sortRanges();
        this._concatSortedRangesIfPossible();
    },
    startTextOffset: function() {
        return this._ranges[0].location;
    },
    endTextOffset: function() {
        var lastRange = this._ranges[this._ranges.length - 1];
        return lastRange.location + lastRange.length;
    },
    isEqualTo: function(selection) {
        if (this._ranges.length != selection._ranges.length) {
            return false;
        }
        for (var i = 0; i < this._ranges.length; i++) {
            if (!this._ranges[i].isEqualTo(selection._ranges[i])) {
                return false
            }
        }
        return true;
    },
    copy: function() {
        var o = new CC.Selection();
        var ranges = this._ranges;
        for (var i=0; i < ranges.length; i++) {
            o._ranges[i] = ranges[i].copy();
        }
        o.direction = this.direction;
        return o;
    },
    toString: function() {
        return "CC.Selection(" + this._ranges.map(function (e) { return e.toString(); }).join(" | ") + ")";
    }
});
