description("CC.Kanna");
shouldBe('CC.Kanna.romajiToHiragana("a")', '"あ"');
shouldBe('CC.Kanna.romajiToHiragana("indo")', '"いんど"');
shouldBe('CC.Kanna.romajiToHiragana("potto")', '"ぽっと"');
shouldBe('CC.Kanna.romajiToHiragana("google")', '"ごおgぇ"');
shouldBe('CC.Kanna.romajiToHiragana("chotto")', '"ちょっと"');
shouldBe('CC.Kanna.romajiToHiragana("atttt")', '"あっっっt"');
