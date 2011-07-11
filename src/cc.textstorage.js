new CC.Class({
    $name: "CC.TextStorage",
    $properties: ["text"],
    init: function(text) {
        if (typeof text != "String") {
            text = "";
        }
        this.text = text;
    },
    getText: function() {
        return this.lines.join("\n");
    },
    setText: function(text) {
        this.lines = text.split("\n");
    },
    charAt: function(line, col) {
        return this.lines[line].charAt(col);
    }
});