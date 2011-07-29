String.prototype.drawAtPoint = function(position) {
    var ctx = CC.currentContext;
    ctx.save();
    ctx.fillText(this, position.x, position.y);
    ctx.restore();
};
