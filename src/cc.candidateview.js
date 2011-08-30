new CC.Class({
    $name: "CC.CandidateView",
    $properties: ["element", "selectedIndex", "selectedCandidate"],
    init: function(element){
        element = element || document.createElement("ol");
        element.className = "cc-candidate-view";
        this._element = element;
        this._selectedIndex = 0;
        this._candidates = 0;
    },
    getElement: function() {
        return this._element;
    },
    setCandidates: function(candidates) {
        var list = this._element;
        while (list.childNodes.length > 0) {
            list.removeChild(list.firstChild);       
        }
        this._candidates = candidates;console.log(this._candidates);
        for (var i = 0; i < candidates.length; i++) {
             var li = document.createElement("li");
             li.appendChild(document.createTextNode(candidates[i]));
             list.appendChild(li);
        }
        this.setSelectedIndex(this.selectedIndex);
    },
    setSelectedIndex: function(i) {
        if (i < 0) {
            i = 0;
        }
        if (i > this._candidates.length - 1) {
            i = this._candidates.length - 1;
        }
        this._element.childNodes[this._selectedIndex].classList.remove("selected");
        this._selectedIndex = i;
        this._element.childNodes[this._selectedIndex].classList.add("selected");
    },
    getSelectedIndex: function(i) {
        return this._selectedIndex;
    },
    getSelectedCandidate: function(i) {
        return this._candidates[this._selectedIndex];
    },
});
