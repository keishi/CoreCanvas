description("CC.Selection");
var a = new CC.Selection();
shouldBeTrue('a.addRange(new CC.Range(1,0)); a.isCollapsed');
shouldBe('a.addRange(new CC.Range(1,1)); a.rangeCount', '1');
shouldBeFalse('a.isCollapsed');
shouldBe('a.addRange(new CC.Range(3,1)); a.rangeCount', '2');

var b = new CC.Selection();
shouldBeTrue('b.addRange(new CC.Range(1,1)); b.addRange(new CC.Range(3,1)); a.isEqualTo(b)');

shouldBe('var a = new CC.Selection(); a.addRange(new CC.Range(1,2)); a.addRange(new CC.Range(29,2)); a.getRangeAt(1)', 'new CC.Range(29, 2)');
