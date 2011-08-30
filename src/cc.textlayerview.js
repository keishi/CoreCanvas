CC.SelectionDirection = {
    NONE: "none",
    FORWARD: "forward",
    BACKWARD: "backward"
};

new CC.Class({
    $name: "CC.TextLayerView",
    $properties: ["element", "lineHeight", "selection"],
    init: function(){
        this._canvas = document.createElement("canvas");
        this.textModel = new CC.TextModel();
        this.textModel.delegate = this;
        this.textModel.font = new CC.Font("Monaco", 18);
        this.textModel.lineHeight = 20;
        this._selection = new CC.Selection();
        this._selection.addRange(new CC.Range(4, 0));
        this.selectionDirection = CC.SelectionDirection.NONE;
        this.selectionColor = new CC.Color(255, 165, 0, 0.5);
        this.needsRedraw = false;
        this.delegate = null;
        this.cursorBlinkTimer = setInterval(this.onCursorBlink.bind(this), 500);
        this.cursorBlinkTimerPaused = false;
        this._cursorIsBlinkHidden = true;
        this.convertingRange = new CC.Range(4, 10);//null;
    },
    onCursorBlink: function() {
        if (this.cursorBlinkTimerPaused) {
            return;
        }
        this._cursorIsBlinkHidden = !this._cursorIsBlinkHidden;
        this.needsRedraw = true;
    },
    getElement: function() {
        return this._canvas;
    },
    getLineHeight: function() {
        return this.textModel.lineHeight;
    },
    getSelection: function() {
        return this._selection.copy();
    },
    setSelection: function(selection, dontResetSelectionDirection) {
        if (this._selection.isEqualTo(selection)) {
            return;
        }
        this._selection = selection.copy();
        this.pauseCursorBlink(700);
        this._cursorIsBlinkHidden = false;
        this.needsRedraw = true;
        if (!dontResetSelectionDirection) {
            this.selectionDirection = CC.SelectionDirection.NONE;
        }
    },
    pauseCursorBlink: function(t) {
        if (this.cursorBlinkTimerPaused) {
            return;
        }
        this.cursorBlinkTimerPaused = true;
        setTimeout(function() {
            this.cursorBlinkTimerPaused = false;
        }.bind(this), t);
    },
    textDidChange: function(model) {
        if (this.delegate && this.delegate.textDidChange) {
            this.delegate.textDidChange(this);
        }
    },
    updateSize: function() {
        CC.currentContext = this._canvas.getContext("2d");
        var width = 0;
        for (var i = 0; i < this.textModel.lines.length; i++) {
            width = Math.max(width, CC.currentContext.measureText(this.textModel.lines[i]).width);
        }
        this._canvas.width = width;
        this._canvas.height = this.lineHeight * this.textModel.lines.length;
    },
    _drawLineUnderRow: function(row, start_col, end_col) {
        var textModel = this.textModel;
        var underlineOffset = this.lineHeight / 2 + textModel.font.size / 2;
        var startPosition = textModel.textPositionToPosition(new CC.TextPosition(start_col, row)).offseted(0, underlineOffset);
        var endPosition = textModel.textPositionToPosition(new CC.TextPosition(end_col, row)).offseted(0, underlineOffset);
        CC.canvas.drawLine(startPosition, endPosition);
    },
    draw: function(rect) {
        var textModel = this.textModel;
        if (!rect) {
            rect = new CC.Rect(0, 0, this._canvas.width, this._canvas.height);
        }
        CC.currentContext = this._canvas.getContext("2d");
        var ctx = CC.currentContext;
        // if (background has alpha)
        //     ctx.clearRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        
        // Fill background
        CC.Color.white.setFill();
        ctx.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);

        var firstVisibleRow = textModel.offsetToRow(rect.origin.y);
        var lastVisibleRow = textModel.offsetToRow(rect.origin.y + rect.size.height);

        // Draw additional lines so it doesn't flicker when scrolling.
        var firstDrawingRow = Math.max(0, firstVisibleRow - 100);
        var lastDrawingRow = Math.min(textModel.lines.length - 1, lastVisibleRow + 100);

        // Draw text
        this.textModel.font.set();
        CC.Color.black.setFill();
        for (var i = firstDrawingRow; i <= lastDrawingRow; i++) {
            textModel.lines[i].drawAtPoint(new CC.Point(0, this.textModel.rowToOffset(i) + this.lineHeight / 2));
        }
        // Draw input manager underline
        if (this.convertingRange) {
            CC.Color.black.setStroke();
            ctx.lineWidth = 2;
            var startTextPosition = textModel.textOffsetToTextPosition(this.convertingRange.location);
            var endTextPosition = textModel.textOffsetToTextPosition(this.convertingRange.location + this.convertingRange.length);
            if (startTextPosition.row == endTextPosition.row) {
                this._drawLineUnderRow(startTextPosition.row, startTextPosition.col, endTextPosition.col);
            } else {
                var startRow = startTextPosition.row;
                var endRow = endTextPosition.row;
                for (var i = startRow; i <= endRow; i++) {
                    var startCol = i == startRow ? startTextPosition.col : 0;
                    var endCol = i == endRow ? endTextPosition.col : textModel.lines[i].length;
                    this._drawLineUnderRow(i, startCol, endCol);
                }
            }
        }
        // Draw selection
        if (this._selection.isCollapsed) {
            if (!this._cursorIsBlinkHidden) {
                var cursorTextOffset = this._selection.getRangeAt(0).location;
                var cursorTextPosition = textModel.textOffsetToTextPosition(cursorTextOffset);
                var cursorPosition = textModel.textPositionToPosition(cursorTextPosition);
                CC.Color.blue.setStroke();
                ctx.lineWidth = 1;
                CC.canvas.drawSharpVerticalLine(cursorPosition, this.lineHeight, 1.0);
            }
        } else {
            this.selectionColor.setFill();
            var rangeCount = this._selection.getRangeCount();
            for (var i = 0; i < rangeCount; i++) {
                var range = this._selection.getRangeAt(i);
                var startTextPosition = textModel.textOffsetToTextPosition(range.location);
                var endTextPosition = textModel.textOffsetToTextPosition(range.location + range.length);
                if (startTextPosition.row == endTextPosition.row) {
                    var startPosition = textModel.textPositionToPosition(startTextPosition);
                    var endPosition = textModel.textPositionToPosition(endTextPosition);
                    CC.canvas.fillRect(new CC.Rect(startPosition.x, startPosition.y, endPosition.x - startPosition.x, this.lineHeight));
                } else { // range across multiple lines
                    var startPosition = textModel.textPositionToPosition(startTextPosition);
                    CC.canvas.fillRect(new CC.Rect(startPosition.x, startPosition.y, rect.origin.x + rect.size.width - startPosition.x, this.lineHeight));
                    var endPosition = textModel.textPositionToPosition(endTextPosition);
                    CC.canvas.fillRect(new CC.Rect(rect.origin.x, endPosition.y, endPosition.x, this.lineHeight));
                    CC.canvas.fillRect(new CC.Rect(rect.origin.x, startPosition.y + this.lineHeight, rect.origin.x + rect.size.width, endPosition.y - startPosition.y - this.lineHeight));
                }
            }
        }
    },
});
