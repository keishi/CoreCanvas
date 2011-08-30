new CC.Class({
    $name: "CC.TextView",
    $prototype: CC.ScrollView,
    $properties: ["textModel"],
    init: function() {
        this.__proto__.__proto__.init.apply(this);
        this._textLayerView = new CC.TextLayerView();
        this._textLayerView.delegate = this;
        this.needsRedraw = false;

        this.contentElement.appendChild(this._textLayerView.element);
        document.addEventListener("keydown", this.onKeyDown.bind(this), false);
        window.addEventListener("mousedown", this.onMouseDown.bind(this), false);
        window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
        window.addEventListener("mouseup", this.onMouseUp.bind(this), false);
        window.addEventListener("paste", this.onPaste.bind(this), false);
        window.addEventListener("copy", this.onCopy.bind(this), false);

        this.clipboardTextarea = document.createElement("textarea");
        this.element.appendChild(this.clipboardTextarea);
        this.clipboardTextarea.style.opacity = "0";
        this.clipboardTextarea.style.width = "0";
        this.clipboardTextarea.style.height = "0";

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
    onCopy: function(e) {
        console.log(this._textLayerView.selection.toString());
        this.clipboardTextarea.value = this.textModel.textInSelection(this._textLayerView.selection);
        this.clipboardTextarea.select();
        console.log("copied", this.clipboardTextarea.value);
    },
    onPaste: function(e) {
        e.clipboardData.items[0].getAsString(function(str) {
            this.replaceSelectionWithText(str);
        }.bind(this));
    },
    onKeyDown: function(e) {console.log(e.keyIdentifier, e);
        if (e.metaKey) {
            switch (e.keyIdentifier) {
                case "U+0041": // S
                this.selectAll();
                e.preventDefault();
                break;
            }
            return;
        }
        switch (e.keyIdentifier) {
            case "U+0008": // Backspace
            this.backSpace();
            e.preventDefault();
            break;
            case "Down":
            if (e.shiftKey) {
                this.addSelectionDown();
            } else {
                this.moveCursorDown();
            }
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
            if (e.shiftKey) {
                this.addSelectionUp();
            } else {
                this.moveCursorUp();
            }
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
        var mouseTextOffset = textModel.positionToCursorTextOffset(new CC.Point(e.offsetX, e.offsetY));
        selection.collapseToStart();
        var cursorRange = selection.getRangeAt(0);
        cursorRange.location = mouseTextOffset;
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
        this.dragSelectAnchorTextOffset = mouseTextOffset;
    },
    onMouseMove: function(e) {
        if (e.which != 1 || this.dragSelectAnchorTextOffset === null) {
            return;
        }
        var textModel = this._textLayerView.textModel;
        if (e.altKey) {
            var selection = new CC.Selection();
            var mousePosition = new CC.Point(e.offsetX, e.offsetY);
            var mouseTextOffset = textModel.positionToCursorTextOffset(mousePosition);
            var startPosition;
            var startTextPosition;
            var endPosition;
            var endTextPosition;
            if (mouseTextOffset < this.dragSelectAnchorTextOffset) {
                startPosition = mousePosition;
                startTextPosition = textModel.positionToTextPosition(startPosition);
                endTextPosition = textModel.textOffsetToTextPosition(this.dragSelectAnchorTextOffset);
                endPosition = textModel.textPositionToPosition(endTextPosition);
            } else {
                startTextPosition = textModel.textOffsetToTextPosition(this.dragSelectAnchorTextOffset);
                startPosition = textModel.textPositionToPosition(startTextPosition);
                endPosition = mousePosition;
                endTextPosition = textModel.positionToTextPosition(endPosition);
            }
            for (var i = startTextPosition.row; i <= endTextPosition.row; i++) {
                var rowOffset = textModel.rowToOffset(i);
                var rangeStartTextOffset = textModel.positionToCursorTextOffset(new CC.Point(startPosition.x, rowOffset));
                var rangeEndTextOffset = textModel.positionToCursorTextOffset(new CC.Point(endPosition.x, rowOffset));
                selection.addRange(new CC.Range(rangeStartTextOffset, rangeEndTextOffset - rangeStartTextOffset));
            }
            this._textLayerView.selection = selection;
            this.needsRedraw = true;
            return;
        }
        var mouseTextOffset = textModel.positionToCursorTextOffset(new CC.Point(e.offsetX, e.offsetY));
        var selection = new CC.Selection();
        var selectionRangeLocation;
        var selectionRangeLength;
        if (mouseTextOffset < this.dragSelectAnchorTextOffset) {
            selectionRangeLocation = mouseTextOffset;
            selectionRangeLength = this.dragSelectAnchorTextOffset - selectionRangeLocation;
        } else {
            selectionRangeLocation = this.dragSelectAnchorTextOffset;
            selectionRangeLength = mouseTextOffset - selectionRangeLocation;
        }
        selection.addRange(new CC.Range(selectionRangeLocation, selectionRangeLength));
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    onMouseUp: function(e) {
        this.dragSelectAnchorTextOffset = null;
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
        var selection = this._textLayerView.selection;
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
    addSelectionUp: function() {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        if (this._textLayerView.selectionDirection == CC.SelectionDirection.NONE) {
            this._textLayerView.selectionDirection = CC.SelectionDirection.BACKWARD;
        }
        var startTextOffset = textModel.textOffsetToPosition(selection.startTextOffset());
        var newStart = textModel.positionToTextOffset(startTextOffset.offseted(0, -textModel.lineHeight));
        var newSelection = new CC.Selection();
        newSelection.addRange(new CC.Range(newStart, selection.endTextOffset() - newStart));
        this._textLayerView.selection = newSelection;
        this.needsRedraw = true;
    },
    addSelectionDown: function() {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        if (this._textLayerView.selectionDirection == CC.SelectionDirection.NONE) {
            this._textLayerView.selectionDirection = CC.SelectionDirection.FORWARD;
        }
        var endTextOffset = textModel.textOffsetToPosition(selection.endTextOffset());
        var newEndTextOffset = textModel.positionToTextOffset(endTextOffset.offseted(0, textModel.lineHeight));
        var newSelection = new CC.Selection();
        var startTextOffset = selection.startTextOffset();
        newSelection.addRange(new CC.Range(startTextOffset, newEndTextOffset - startTextOffset));
        this._textLayerView.selection = newSelection;
        this.needsRedraw = true;
    },
    addSelectionLeft: function() {
        var selection = this._textLayerView.selection;
        if (this._textLayerView.selectionDirection == CC.SelectionDirection.NONE) {
            this._textLayerView.selectionDirection = CC.SelectionDirection.BACKWARD;
        }
        if (this._textLayerView.selectionDirection == CC.SelectionDirection.FORWARD) {
            var lastRange = selection.getRangeAt(selection.getRangeCount() - 1);
            lastRange.length--;
        } else {
            var currentStart = selection.startTextOffset();
            if (currentStart < 1) {
                return;
            }
            var additionalRange = new CC.Range(currentStart - 1, 1);
            selection.addRange(additionalRange);
        }
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    addSelectionRight: function() {
        var selection = this._textLayerView.selection;
        if (this._textLayerView.selectionDirection == CC.SelectionDirection.NONE) {
            this._textLayerView.selectionDirection = CC.SelectionDirection.FORWARD;
        }
        if (this._textLayerView.selectionDirection == CC.SelectionDirection.FORWARD) {
            var currentEnd = selection.endTextOffset();
            if (currentEnd >= this._textLayerView.textModel.textLength - 1) {
                return;
            }
            var additionalRange = new CC.Range(currentEnd, 1);
            selection.addRange(additionalRange);
        } else {
            var firstRange = selection.getRangeAt(0);
            firstRange.length--;
            firstRange.location++;
        }
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    selectAll: function() {
        var selection = new CC.Selection();
        selection.addRange(new CC.Range(0, this.textModel.text.length));
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    replaceSelectionWithText: function(text) {
        var selection = this._textLayerView.selection;
        var textModel = this._textLayerView.textModel;
        
        var offset = 0;
        for (var i = 0; i < selection.getRangeCount(); i++) {
            var range = selection.getRangeAt(i);
            range.offset(offset);
            textModel.replaceRange(range, text);
            offset += text.length - range.length;
        }
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
            this.replaceSelectionWithText("");
            return;
        }
        this._textLayerView.selection = selection;
        this.needsRedraw = true;
    },
    textDidChage: function() {
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
    redraw: function() {
        var element = this._element;
        this._textLayerView.updateSize();
        this._textLayerView._canvas.width = Math.max(element.offsetWidth, this._textLayerView._canvas.width - this.scrollbarWidth);
        this._textLayerView.draw(new CC.Rect(element.scrollLeft, element.scrollTop, element.offsetWidth, element.offsetHeight));
    }
});
