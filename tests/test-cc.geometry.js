description("CC.Point accesors");
shouldBe('(new CC.Point(1,2))[0]', '1');
shouldBe('(new CC.Point(1,2)).x', '1');
shouldBe('(new CC.Point(1,2))[1]', '2');
shouldBe('(new CC.Point(1,2)).y', '2');

description("CC.Size accesors");
shouldBe('(new CC.Size(1,2))[0]', '1');
shouldBe('(new CC.Size(1,2)).x', '1');
shouldBe('(new CC.Size(1,2)).width', '1');
shouldBe('(new CC.Size(1,2))[1]', '2');
shouldBe('(new CC.Size(1,2)).y', '2');
shouldBe('(new CC.Size(1,2)).height', '2');

description("CC.Rect");
shouldBe('(new CC.Rect(1,2,3,4)).origin', 'new CC.Point(1,2)');
shouldBe('(new CC.Rect(1,2,3,4)).size', 'new CC.Size(3,4)');
