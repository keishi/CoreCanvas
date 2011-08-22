new CC.Class({
    $name: "CC.SpriteVideoView",
    $properties: ["element"],
    init: function(video, rect) {
        this.video = video;
        this.rect = rect;
        this._canvas = document.createElement("canvas");
        this._canvas.width = this.rect.size.width;
        this._canvas.height = this.rect.size.height;
    },
    getElement: function() {
        return this._canvas;
    },
    draw: function() {
        CC.currentContext = this._canvas.getContext("2d");
        var ctx = CC.currentContext;
        ctx.drawImage(this.video, -this.rect.origin.x, -this.rect.origin.y);
    }
});
