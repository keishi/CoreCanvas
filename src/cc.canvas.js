CC.canvas = {
    traceLine: function(start, end) {
        var ctx = CC.currentContext;
        ctx.save();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.restore();
    },
    drawLine: function(start, end) {
        var ctx = CC.currentContext;
        ctx.save();
        ctx.beginPath();
        CC.canvas.traceLine(start, end);
        ctx.stroke();
        ctx.restore();
    },
    drawSharpVerticalLine: function(origin, length, lineWidth) {
        var ctx = CC.currentContext;
        ctx.save();
        var halfLineWidth = lineWidth / 2.0;
        var alignedOrigin = new CC.Point(Math.round(origin.x - halfLineWidth) + halfLineWidth, origin.y);
        ctx.beginPath();
        CC.canvas.traceLine(alignedOrigin, alignedOrigin.offseted(0, length));
        ctx.stroke();
        ctx.restore();
    },
    fillRect: function(rect) {
        CC.currentContext.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    },
    traceXMark: function(position, size) {
        var ctx = CC.currentContext;
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
        var ctx = CC.currentContext;
        ctx.save();
        ctx.beginPath();
        CC.canvas.traceXMark(position, size);
        ctx.stroke();
        ctx.restore();
    },
    traceRect: function(rect) {
        var ctx = CC.currentContext;
        ctx.save();
        ctx.moveTo(rect.origin.x, rect.origin.y);
        ctx.lineTo(rect.origin.x, rect.origin.y + rect.size.height);
        ctx.lineTo(rect.origin.x + rect.size.width, rect.origin.y + rect.size.height);
        ctx.lineTo(rect.origin.x + rect.size.width, rect.origin.y);
        ctx.lineTo(rect.origin.x, rect.origin.y);
        ctx.restore();
    },
    fillRect: function(rect) {
        CC.currentContext.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    },
};
