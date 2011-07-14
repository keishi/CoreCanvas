new CC.Class({
    $name: "CC.LineMetricsCache",
    init: function() {
        this.offsets = [];
    },
    update: function(ctx, line) {
        for (var i=0; i < line.length; i++) {console.log(line.substring(0, i + 1));
            this.offsets[i] = ctx.measureText(line.substring(0, i + 1)).width;
        }
    }
});

new CC.Class({
    $name: "CC.TextMetricsCache",
    init: function() {
        this.lines = {};
    },
    invalidateLineAtIndex: function(index) {
        delete this.lines[index];
    },
    invalidateAll: function() {
        for (var i in this.lines) {
            delete this.lines[i];
        }
    }
});
