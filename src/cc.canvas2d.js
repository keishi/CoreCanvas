new CC.Class({
    $name: "CC.Canvas2D",
    $properties: ["canvasElement", "ctx"],
    init: function(canvas) {
        this._canvas = canvas || document.createElement("canvas");
        this._ctx = this._canvas.getContext("2d");
    },
    getCanvasElement: function() {
        return this._canvas;
    },
    getCtx: function() {
        return this._ctx;
    },
    traceXMark: function(position, size) {
        var ctx = this._ctx;
        ctx.save();

        var halfSize = size / 2;
        ctx.translate(position.x, position.y);
        ctx.beginPath();
        ctx.moveTo(-halfSize, -halfSize);
        ctx.lineTo(halfSize, halfSize);
        ctx.moveTo(halfSize, -halfSize);
        ctx.lineTo(-halfSize, halfSize);

        ctx.restore();
    },
    drawXMark: function(position, size) {
        var ctx = this._ctx;
        ctx.save();
        this.traceXMark(position, size);
        ctx.stroke();
        ctx.restore();
    },
    traceLine: function(start, end) {
        var ctx = this._ctx;
        ctx.save();

        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);

        ctx.restore();
    },
    drawLine: function(start, end) {
        var ctx = this._ctx;
        ctx.save();
        this.traceLine(start, end);
        ctx.stroke();
        ctx.restore();
    },
    fillRect: function(rect) {
        this._ctx.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    },
    drawText: function(text, position) {
        var ctx = this._ctx;
        ctx.save();
        
        if (CC.DEBUG) {
            ctx.save();
            ctx.lineWidth = "1px";
            ctx.strokeStyle = "#FF0000";
            var textWidth = ctx.measureText(text).width;
            this.drawLine(new CC.Point(position.x, position.y + 0.5), new CC.Point(position.x + textWidth, position.y + 0.5));
            this.drawXMark(new CC.Point(position.x + 0.5, position.y + 0.5), 5);
            ctx.restore();
        }
        
        ctx.fillText(text, position.x, position.y);
        
        ctx.restore();
    },
    
});
