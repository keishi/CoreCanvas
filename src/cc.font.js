new CC.Class({
    $name: "CC.Font",
    init: function(name, size) {
        this.name = name;
        this.size = size;
    },
    set: function() {
        CC.currentContext.font = this.size + "px \"" + this.name + "\"";
    }
});
