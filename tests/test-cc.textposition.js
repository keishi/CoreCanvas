description("CC.TextPosition accesors");
shouldBe('(new CC.TextPosition(1,2)).col', '1');
shouldBe('(new CC.TextPosition(1,2)).row', '2');
shouldBe('(new CC.TextPosition(1,2)).lineNumber', '3');
