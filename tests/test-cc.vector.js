description("CC.Vec2")
shouldBe('a = new CC.Vec2(1,2); a[0]', '1');
shouldBe('a = new CC.Vec2(1,2); a[1]', '2');

shouldBe('(new CC.Vec2(4, 6)).length', '2');

shouldBeTrue('(new CC.Vec2(4, 6)).isEqualTo(new CC.Vec2(4, 6))');
shouldBeFalse('(new CC.Vec2(4, 6)).isEqualTo(new CC.Vec2(1, 6))');
shouldBeFalse('(new CC.Vec2(4, 6)).isEqualTo(new CC.Vec2(4, 1))');

var a = new CC.Vec2(1,2);
var b = new CC.Vec2(3,4);
shouldBe('a.add(b)', 'new CC.Vec2(4, 6)');

var a = new CC.Vec2(1,2);
var b = new CC.Vec2(3,4);
shouldBe('a.subtract(b)', 'new CC.Vec2(-2, -2)');

shouldBe('(new CC.Vec2(4, 6)).invert()', 'new CC.Vec2(-4, -6)');

shouldBe('(new CC.Vec2(1, 2)).normSquared()', '5');

shouldBe('(new CC.Vec2(3, 4)).norm()', '5');

shouldBe('(new CC.Vec2(3, 4)).multiply(2)', 'new CC.Vec2(6, 8)');

var a = new CC.Vec2(1,2);
var b = new CC.Vec2(3,4);
shouldBe('a.dot(b)', '11');

shouldBe('(new CC.Vec2(4, 6)).toString()', '"(4,6)"');

var a = new CC.Vec2(1,2);
var b = new CC.Vec2(3,4);
shouldBe('CC.Vec2.add(a, b)', 'new CC.Vec2(4, 6)');
shouldBe('CC.Vec2.subtract(a, b)', 'new CC.Vec2(-2, -2)');
