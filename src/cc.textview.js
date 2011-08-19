new CC.Class({
    $name: "CC.TextView",
    $prototype: CC.ScrollView,
    $properties: ["textModel"],
    init: function() {
        this.__proto__.__proto__.init.apply(this);
        this._textLayerView = new CC.TextLayerView();
        this.needsRedraw = false;

        this.contentElement.appendChild(this._textLayerView.element);
        document.addEventListener("keydown", this.onKeyDown.bind(this), false);
        this.element.addEventListener("mousedown", this.onMouseDown.bind(this), false);

        // TODO: remove to manager object.
        this.needsRedraw = true;
        this.redrawIfNeededBound = this.redrawIfNeeded.bind(this);
        window.requestAnimationFrame(this.redrawIfNeededBound);
    },
    getTextModel: function() {
        return this._textLayerView.textModel;
    },
    onScroll: function(e) {
        this.needsRedraw = true;
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
            if (!/[\s\w]/.test(c)) {
                break;
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
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
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
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    moveCursorRight: function() {
        var selection = this._textLayerView.selection;console.log(selection.toString());
        if (selection.getRangeCount() == 1 && selection.isCollapsed) {
            var cursorRange = selection.getRangeAt(0);
            if (cursorRange.location <= this._textLayerView.textModel.textLength) {
                cursorRange.location++;
            }
        } else {
            selection.collapseToEnd();
        }
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    moveCursorUp: function() {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        selection.collapseToStart();
        var cursorRange = selection.getRangeAt(0);
        var cursorPosition = textModel.textOffsetToPosition(cursorRange.location);
        cursorRange.location = textModel.positionToTextOffset(cursorPosition.offseted(0, -textModel.lineHeight));
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    moveCursorDown: function() {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        selection.collapseToStart();
        var cursorRange = selection.getRangeAt(0);
        var cursorPosition = textModel.textOffsetToPosition(cursorRange.location);
        cursorRange.location = textModel.positionToTextOffset(cursorPosition.offseted(0, textModel.lineHeight));
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    addSelectionLeft: function() {
        var selection = this._textLayerView.selection;
        if (selection.direction == CC.SelectionDirection.NONE) {
            selection.direction = CC.SelectionDirection.BACKWARD;
        }
        console.log(selection.direction);
        if (selection.direction == CC.SelectionDirection.FORWARD) {
            var lastRange = selection.getRangeAt(selection.getRangeCount() - 1);
            lastRange.length--;
        } else {
            var firstRange = selection.getRangeAt(0);
            firstRange.length++;
            firstRange.location--;
        }
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    addSelectionRight: function() {
        var selection = this._textLayerView.selection;
        if (selection.direction == CC.SelectionDirection.NONE) {
            selection.direction = CC.SelectionDirection.FORWARD;
        }
        if (selection.direction == CC.SelectionDirection.FORWARD) {
            var lastRange = selection.getRangeAt(selection.getRangeCount() - 1);
            lastRange.length++;
        } else {
            var firstRange = selection.getRangeAt(0);
            firstRange.length--;
            firstRange.location++;
        }
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    replaceSelectionWithText: function(text) {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        
        var cursorRange = selection.getRangeAt(0);
        textModel.replaceRange(text, cursorRange);
        
        selection.collapseEachRangeToStart();
        selection.moveEachRangeForward(text.length);
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
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
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    redrawIfNeeded: function() {
        if (!this.needsRedraw && !this._textLayerView.needsRedraw) {
            window.requestAnimationFrame(this.redrawIfNeededBound);
            return;
        }
        this.redraw();
        this.needsRedraw = false;
        this._textLayerView.needsRedraw = false;
        window.requestAnimationFrame(this.redrawIfNeededBound);
    },
    redraw: function() {console.log("redraw");
        var element = this._element;
        this._textLayerView.draw(new CC.Rect(element.scrollLeft, element.scrollTop, element.offsetWidth, element.offsetHeight));
    }
});
