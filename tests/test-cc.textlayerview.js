description("CC.TextLayerView");
var selection = new CC.Selection();
selection.addRange(new CC.Range(1, 2));
shouldBe('var v = new CC.TextLayerView(); v.selection = selection; v.selection', 'selection');