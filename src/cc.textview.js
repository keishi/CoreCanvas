new CC.Class({
    $name: "CC.TextView",
    $prototype: CC.ScrollView,
    $properties: ["textModel"],
    init: function() {
        this.__proto__.__proto__.init.apply(this);
        this._textLayerView = new CC.TextLayerView();
        this.contentElement.appendChild(this._textLayerView.element);
        document.addEventListener("keydown", this.onKeyDown.bind(this), false);
        this.element.addEventListener("mousedown", this.onMouseDown.bind(this), false);
    },
    getTextModel: function() {
        return this._textLayerView.textModel;
    },
    onScroll: function(e) {
        this.redraw();
    },
    onKeyDown: function(e) {console.log(e.keyIdentifier, e);
        switch (e.keyIdentifier) {
            case "U+0008": // Backspace
            this.backSpace();
            e.preventDefault();
            break;
            case "Down":
            this.moveCursorDown();
            e.preventDefault();
            break;
            case "Right":
            if (e.shiftKey) {
                this.addSelectionRight();
            } else {
                this.moveCursorRight();
            }
            e.preventDefault();
            break;
            case "Up":
            this.moveCursorUp();
            e.preventDefault();
            break;
            case "Left":
            if (e.shiftKey) {
                this.addSelectionLeft();
            } else {
                this.moveCursorLeft();
            }
            e.preventDefault();
            break;
            case "Enter":
            this.replaceSelectionWithText("\n");
            e.preventDefault();
            break;
            default:
            var c = String.fromCharCode(e.keyCode);
            if (!e.shiftKey) {
                c = c.toLowerCase();
            }
            this.replaceSelectionWithText(c);
            e.preventDefault();
            break;
        }
    },
    onMouseDown: function(e) {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        var mouseTextOffset = textModel.positionToTextOffset(new CC.Point(e.offsetX, e.offsetY));
        selection.collapseToStart();
        var cursorRange = selection.getRangeAt(0);
        cursorRange.location = mouseTextOffset;
        this.redraw();
    },
    moveCursorLeft: function() {
        var selection = this._textLayerView.selection;
        if (selection.getRangeCount() == 1 && selection.isCollapsed) {
            var cursorRange = selection.getRangeAt(0);
            if (cursorRange.location > 0) {
                cursorRange.location--;
            }
        } else {
            selection.collapseToStart();
        }
        this.redraw();
    },
    moveCursorRight: function() {
        var selection = this._textLayerView.selection;
        if (selection.getRangeCount() == 1 && selection.isCollapsed) {
            var cursorRange = selection.getRangeAt(0);
            if (cursorRange.location <= this._textLayerView.textModel.textLength) {
                cursorRange.location++;
            }
        } else {
            console.log("a");
            selection.collapseToEnd();
        }
        this.redraw();
    },
    moveCursorUp: function() {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        selection.collapseToStart();
        var cursorRange = selection.getRangeAt(0);
        var cursorPosition = textModel.textOffsetToPosition(cursorRange.location);
        cursorRange.location = textModel.positionToTextOffset(cursorPosition.offseted(0, -textModel.lineHeight));
        this.redraw();
    },
    moveCursorDown: function() {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        selection.collapseToStart();
        var cursorRange = selection.getRangeAt(0);
        var cursorPosition = textModel.textOffsetToPosition(cursorRange.location);
        cursorRange.location = textModel.positionToTextOffset(cursorPosition.offseted(0, textModel.lineHeight));
        this.redraw();
    },
    addSelectionLeft: function() {
        var selection = this._textLayerView.selection;
        var lastRange = selection.getRangeAt(selection.getRangeCount() - 1);
        if (lastRange.length > 0) {
            if (this._textLayerView.textModel.text.length > lastRange.location + lastRange.length) {
                lastRange.length++;
            }
        } else {
            if (0 < lastRange.location + lastRange.length) {
                lastRange.length--;
            }
        }
        this.redraw();
    },
    addSelectionRight: function() {
        var selection = this._textLayerView.selection;
        var firstRange = selection.getRangeAt(0);
        if (firstRange.length > 0) {
            if (firstRange.location > 1) {
                firstRange.location--;
                firstRange.length++;
            }
        } else {
            if (this._textLayerView.textModel.text.length > firstRange.location + firstRange.length) {
                firstRange.location++;
                firstRange.length--;
            }
        }
        this.redraw();
    },
    replaceSelectionWithText: function(text) {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        
        var cursorRange = selection.getRangeAt(0);
        textModel.replaceRange(text, cursorRange);
        
        selection.collapseEachRangeToStart();
        selection.moveEachRangeForward(text.length);
        this.redraw();
    },
    backSpace: function() {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        if (selection.getRangeCount() == 1 && selection.isCollapsed) {
            var cursorRange = selection.getRangeAt(0);
            if (cursorRange.location > 0) {
                cursorRange.location--;
                textModel.deleteRange(new CC.Range(cursorRange.location, 1));
            }
        } else {
            textModel.deleteSelection(selection);
            selection.collapseEachRangeToStart();
        }
        this.redraw();
    },
    redraw: function() {
        var element = this._element;
        this._textLayerView.draw(new CC.Rect(element.scrollLeft, element.scrollTop, element.offsetWidth, element.offsetHeight));
    }
});
