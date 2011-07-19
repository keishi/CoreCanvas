new CC.Class({
    $name: "CC.ScrollView",
    $properties: ["element", "contentElement"],
    init: function(element){
        element = element || document.createElement("div");
        element.style.overflow = "auto";
        this._element = element;
        
        var contentElement = document.createElement("div");
        element.appendChild(contentElement);
        this._contentElement = contentElement;
    },
    getElement: function() {
        return this._element;
    },
    getContentElement: function() {
        return this._contentElement;
    }
});
