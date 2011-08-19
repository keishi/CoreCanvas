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
        this.textModel.font = new CC.Font("Courier", 14);
        this._selection = new CC.Selection();
        this._selection.addRange(new CC.Range(4, 0));
        this.selectionDirection = CC.SelectionDirection.NONE;
        
        this.selectionColor = new CC.Color(255, 165, 0, 0.5);
        this.needsRedraw = false;
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
        this.needsRedraw = true;
        if (!dontResetSelectionDirection) {
            this.selectionDirection = CC.SelectionDirection.NONE;
        }
    },
    draw: function(rect) {
        var textModel = this.textModel;
        if (!rect) {
            rect = new CC.Rect(0, 0, this._canvas.width, this._canvas.height);
        }
        CC.currentContext = this._canvas.getContext("2d");
        var ctx = CC.currentContext;
        ctx.clearRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        
        // Fill background
        CC.Color.lightGray.setFill();
        ctx.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);

        // Draw text
        this.textModel.font.set();
        CC.Color.black.setFill();
        for (var i = 0; i < this.textModel.lines.length; i++) {
            textModel.lines[i].drawAtPoint(new CC.Point(0, this.textModel.rowToOffset(i) + this.lineHeight));
        }
        // Draw selection
        if (this._selection.isCollapsed) {
            var cursorTextOffset = this._selection.getRangeAt(0).location;
            var cursorTextPosition = textModel.textOffsetToTextPosition(cursorTextOffset);
            var cursorPosition = textModel.textPositionToPosition(cursorTextPosition);
            CC.Color.blue.setStroke();
            CC.canvas.drawSharpVerticalLine(cursorPosition, this.lineHeight, 1.0);
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
                    
                }
            }
        }
    },
});
