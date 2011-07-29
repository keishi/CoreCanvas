new CC.Class({
    $name: "CC.ScrollView",
    $properties: ["element", "contentElement"],
    init: function(element){
        element = element || document.createElement("div");
        element.style.overflow = "auto";
        this._element = element;
        this._element.addEventListener("scroll", this.onScroll.bind(this));
        
        var contentElement = document.createElement("div");
        element.appendChild(contentElement);
        this._contentElement = contentElement;
    },
    getElement: function() {
        return this._element;
    },
    getContentElement: function() {
        return this._contentElement;
    },
    onScroll: function() {
    }
});
