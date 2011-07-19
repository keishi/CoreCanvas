description("CC.Vec2")
shouldBe('(new CC.Range(0,2)).intersection(new CC.Range(1, 2))', 'new CC.Range(1, 1)');
shouldBeTrue('(new CC.Range(0,2)).isInside(0)');
shouldBeTrue('(new CC.Range(0,2)).isInside(1)');
shouldBeFalse('(new CC.Range(0,2)).isInside(2)');
