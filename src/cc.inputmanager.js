new CC.Class({
    $name: "CC.InputManager",
    $properties: [],
    init: function(){
        this._rawText = "";
        this.isConverting = false;
    },
    onKeyDown: function() {
        this._rawText += c;
        this.searchAndShowCands();
    }
});
