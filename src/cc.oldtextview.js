new CC.Class({
    $name: "CC.TextView",
    $prototype: CC.ScrollView,
    $properties: ["element", "text", "height", "width"],
    init: function() {
        this._element = document.createElement("div");
        this._element.style.overflow = "auto";
        this._canvas2D = new CC.Canvas2D();
        this._element.appendChild(this._canvas2D.canvasElement);
        this._textStorage = new CC.TextStorage();
        this.fontFamily = "Courier";
        this.fontSize = 18;
        this.lineHeight = Math.floor(this.fontSize * 1.3);
        this._lineNumberWidth = 40;
        this.fontColor = "#000000";
        this._element.addEventListener("scroll", this.onScroll.bind(this), false);
        this.selectedRanges = [new CC.Range(0, 0)];
    },
    getElement: function() {
        return this._element;
    },
    setText: function(text) {
        this._textStorage.text = text;
    },
    getHeight: function() {
        return this._element.offsetHeight;
    },
    getWidth: function() {
        return this._element.offsetWidth;
    },
    paintLines: function() {
        this._canvas2D.canvasElement.height = this._textStorage.lines.length * this.lineHeight;
        
        this.setFontStyle();
        for (var i=0; i < this._textStorage.lines.length; i++) {
            this._canvas2D.drawText(this._textStorage.lines[i], new CC.Point(this._lineNumberWidth + 4, this._lineToOffset(i) + this.lineHeight));
        }
    },
    setFontStyle: function() {
        var ctx = this._canvas2D.ctx;
        ctx.font = this.fontSize + "px " + this.fontFamily;
        ctx.fillStyle = this.fontColor;
        ctx.textBaseline = "middle";
    },
    onScroll: function(e) {
        this.paintLines();
        this.paintLineNumbers();
    },
    paintLineNumbers: function() {
        var ctx = this._canvas2D.ctx;

        ctx.fillStyle = "rgb(255,255,200)";
        this._canvas2D.fillRect(new CC.Rect(0, this._element.scrollTop, this._lineNumberWidth - 2, this.height));

        ctx.fillStyle = "rgb(235,235,235)";
        this._canvas2D.fillRect(new CC.Rect(this._lineNumberWidth - 2, this._element.scrollTop, 1, this.height));

        var firstLine = 0;
        var lastLine = 100;
        
        this.setFontStyle();
        for (var i = firstLine; i < lastLine; ++i) {
            var lineOffset = this._lineToOffset(i);
            this._canvas2D.drawText(i + 1, new CC.Point(0, lineOffset + this.lineHeight / 2));
        }
        
        if (this.selectedRanges.length == 1) {
            var selectedRange = this.selectedRanges[0];
            if (selectedRange.length == 0) {
                this._canvas2D.drawLine();
            }
        }
    },
    _columnToOffset: function(column, lineNumber) {
        var ctx = this._canvas2D.ctx;
        var line = this._textStorage.lines[lineNumber];
        return ctx.measureText(line.substring(0, column)).width;
    },
    _offsetToColumn: function(offset, lineNumber) {
        var ctx = this._canvas2D.ctx;
        var line = this._textModel.line(lineNumber);
        for (var column = 0; column < line.length; ++column) {
            if (ctx.measureText(line.substring(0, column)).width > offset) {
                break;
            }
        }
        return column;
    },
    _lineToOffset: function(lineNumber) {
        return this.lineHeight * lineNumber;
    },
    _offsetToLine: function(offset) {
        return Math.floor(offset / this.lineHeight);
    },
});
