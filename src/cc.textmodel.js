new CC.Class({
    $name: "CC.TextModel",
    $properties: ["text"],
    init: function(text) {
        this.lines = [];
        if (typeof text != "string") {
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
    textPositionToTextOffset: function(textPosition) {
        var textOffset = 0;
        for (var i = 0; i < textPosition.row; i++) {
            textOffset += this.lines[i].length + 1;
        }
        textOffset += textPosition.col;
        return textOffset;
    },
    textOffsetToTextPosition: function(textOffset) {
        var textPosition = new CC.TextPosition(0, 0);
        var len = this.lines.length;
        for (var i = 0; i < len; i++) {
            var lineLength = this.lines[i].length;
            if (textOffset > lineLength) {
                textOffset -= lineLength + 1;
                textPosition.row++;
            } else {
                textPosition.col += textOffset;
                return textPosition;
            }
        }
        return null;
    }
});
