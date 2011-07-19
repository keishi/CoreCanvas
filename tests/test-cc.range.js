description("CC.Range")
shouldBe('(new CC.Range(0,2)).intersection(new CC.Range(1, 2))', 'new CC.Range(1, 1)');
shouldBeTrue('(new CC.Range(0,2)).contains(0)');
shouldBeTrue('(new CC.Range(0,2)).contains(1)');
shouldBeFalse('(new CC.Range(0,2)).contains(2)');
shouldBeTrue('(new CC.Range(0,2)).intersects(new CC.Range(0,1))');
shouldBeTrue('(new CC.Range(0,2)).intersects(new CC.Range(1,1))');
shouldBeTrue('(new CC.Range(0,2)).intersects(new CC.Range(2,1))');
shouldBeFalse('(new CC.Range(0,2)).intersects(new CC.Range(3,1))');
// Reverse
shouldBeTrue('(new CC.Range(0,1)).intersects(new CC.Range(0,2))');
shouldBeTrue('(new CC.Range(1,1)).intersects(new CC.Range(0,2))');
shouldBeTrue('(new CC.Range(2,1)).intersects(new CC.Range(0,2))');
shouldBeFalse('(new CC.Range(3,1)).intersects(new CC.Range(0,2))');
