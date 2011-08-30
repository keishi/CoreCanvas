new CC.Class({
    $name: "CC.TextModel",
    $properties: ["text"],
    init: function(text) {
        this.lines = [];
        if (typeof text != "string") {
            text = "";
        }
        this.textLength = 0;
        this.text = text;
        this.font = new CC.Font("Courier", 14);
        this.lineHeight = 16;
        this.metricsCache = new CC.TextMetricsCache();
        this.delegate = null;
    },
    getText: function() {
        return this.lines.join("\n");
    },
    setText: function(text) {
        if (this.text == text) {
            return;
        }
        this.lines = text.split("\n");
        this.textLength = text.length;

        if (this.delegate && this.delegate.textDidChange) {
            this.delegate.textDidChange(this);
        }
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
    },
    deleteRange: function(range) {
        this.text = this.text.substring(0, range.location) + this.text.substring(range.location + range.length);
    },
    insertTextAt: function(text, location) {
        this.text = this.text.substring(0, location) + text + this.text.substring(location);
    },
    replaceRange: function(replacement, range) {
        this.deleteRange(range);
        this.insertTextAt(replacement, range.location);
    },
    rowToOffset: function(row){
        return row * this.lineHeight;
    },
    offsetToRow: function(offset){
        return Math.min(Math.max(Math.floor(offset / this.lineHeight), 0), this.lines.length - 1);
    },
    columnToOffset: function(col, row){
        var line = this.lines[row];
        this.font.set();
        return CC.currentContext.measureText(line.substring(0, col)).width;
    },
    offsetToCursorColumn: function(offset, row) {
        var col = this.offsetToColumn(offset, row);
        var line = this.lines[row];
        if (col >= line.length) {
            return col;
        }
        var left = CC.currentContext.measureText(line.substring(0, col)).width;
        var right = CC.currentContext.measureText(line.substring(0, col + 1)).width;
        if (offset - left > right - offset) {
            return col + 1;
        }
        return col;
    },
    offsetToColumn: (function() {
        return function(offset, row) {
            var line = this.lines[row];
            if (offset > measure(line, line.length)) {
                return line.length;
            }
            return find(offset, line, 0, line.length - 1);
        };
        function measure(line, col) {
            return CC.currentContext.measureText(line.substring(0, col)).width;
        }
        function find(offset, line, start, end) {
            if (start == end) {
                return start;
            } else if (end - start == 1) {
                if (offset > measure(line, end)) {
                    return end;
                } else {
                    return start;
                }
            } else {
                var middle = Math.floor((start + end) / 2);
                if (offset >= measure(line, middle)) {
                    return find(offset, line, middle, end);
                } else {
                    return find(offset, line, start, middle);
                }
            }
        }
    })(),
    textPositionToPosition: function(textPosition) {
        return new CC.Point(this.columnToOffset(textPosition.col, textPosition.row), this.rowToOffset(textPosition.row));
    },
    positionToTextPosition: function(position) {
        var row = this.offsetToRow(position.y);
        var col = this.offsetToColumn(position.x, row);
        return new CC.TextPosition(col, row);
    },
    positionToCursorTextPosition: function(position) {
        var row = this.offsetToRow(position.y);
        var col = this.offsetToCursorColumn(position.x, row);
        return new CC.TextPosition(col, row);
    },
    textOffsetToPosition: function(textOffset) {
        var textPosition = this.textOffsetToTextPosition(textOffset);
        return this.textPositionToPosition(textPosition);
    },
    positionToTextOffset: function(position) {
        var textPosition = this.positionToTextPosition(position);
        return this.textPositionToTextOffset(textPosition);
    },
    positionToCursorTextOffset: function(position) {
        var textPosition = this.positionToCursorTextPosition(position);
        return this.textPositionToTextOffset(textPosition);
    },
    textInRange: function(range) {
        return this.text.substr(range.location, range.length);
    },
    textInSelection: function(selection) {
        var text = "";
        var len = selection.getRangeCount();
        var wholeText = this.text;
        for (var i = 0; i < len; i++) {
            if (i != 0) {
                text += "\n";
            }
            var range = selection.getRangeAt(i);
            text += wholeText.substr(range.location, range.length);
        }
        return text;
    },
    splitRangeWithLineBreaks: function(range) {
        var parts = [];
        var lines = this.textInRange(range).split("\n");
        var offset = 0;
        for (var i = 0; i < lines.length; i++) {
            var length = lines[i].length;
            parts.push(new CC.Range(offset, length));
            offset += length;
        }
    }
});
