description("CC.TextModel accesors");
shouldBe('(new CC.TextModel()).text', '""');
shouldBe('(new CC.TextModel("lorem")).text', '"lorem"');
shouldBe('(new CC.TextModel("lorem\\nipsum")).text', '"lorem\\nipsum"');
shouldBe('(new CC.TextModel("lorem\\nipsum")).lines', '["lorem", "ipsum"]');
shouldBe('(new CC.TextModel("lorem\\nipsum")).lines.length', '2');

description("CC.TextModel text position");
shouldBe('(new CC.TextModel("lorem\\nipsum")).textPositionToTextOffset(new CC.TextPosition(0, 0))', '0');
shouldBe('(new CC.TextModel("lorem\\nipsum")).textPositionToTextOffset(new CC.TextPosition(4, 0))', '4');
shouldBe('(new CC.TextModel("lorem\\nipsum")).textPositionToTextOffset(new CC.TextPosition(0, 1))', '6');
shouldBe('(new CC.TextModel("lorem\\nipsum")).textPositionToTextOffset(new CC.TextPosition(4, 1))', '10');
shouldBe('(new CC.TextModel("lorem\\nipsum")).textOffsetToTextPosition(10)', 'new CC.TextPosition(4, 1)');
shouldBe('(new CC.TextModel("lorem\\nipsum")).textOffsetToTextPosition(5)', 'new CC.TextPosition(5, 0)');
shouldBe('(new CC.TextModel("lorem\\nipsum")).textOffsetToTextPosition(1000)', 'null');

description("CC.TextModel text manipulation");
shouldBe('a = new CC.TextModel("lorem\\nipsum"); a.deleteRange(new CC.Range(0, 2)); a.text', '"rem\\nipsum"');
shouldBe('a = new CC.TextModel("lorem\\nipsum"); a.insertTextAt(" LOREM", 5); a.text', '"lorem LOREM\\nipsum"');
shouldBe('a = new CC.TextModel("lorem\\nipsum"); a.replaceRange("LOREM", new CC.Range(0, 2)); a.text', '"LOREMrem\\nipsum"');
