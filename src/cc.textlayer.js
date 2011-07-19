new CC.Class({
    $name: "CC.TextLayerView",
    $properties: ["element", "contentElement"],
    init: function(){
        this._canvas = document.createElement("canvas");
        this.textModel = new CC.TextModel();
    },
    draw: function(rect) {
        if (!rect) {
            rect = new CC.Rect(0, 0, this._canvas.width, this._canvas.height);
        }
        var ctx = CC.currentContext;
        ctx.clearRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        ctx.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    },
});