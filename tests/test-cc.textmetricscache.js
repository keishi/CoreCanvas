var canvas = document.createElement("canvas");
CC.currentContext = canvas.getContext("2d");

description("CC.LineMetricsCache");
CC.currentContext.font = "14px Courier New"
shouldBe('var a = new CC.LineMetricsCache(); a.update("lorem"); a.offsets[0]', '8');
shouldBe('var a = new CC.LineMetricsCache(); a.update("lorem"); a.offsets[1]', '16');
shouldBe('var a = new CC.LineMetricsCache(); a.update("lorem"); a.offsets[2]', '24');

description("CC.TextMetricsCache invalidate");
shouldBeUndefined('var a = new CC.TextMetricsCache(); a.lines[0] = new CC.LineMetricsCache(); a.invalidateLineAtIndex(0); a.lines[0]');
shouldBeUndefined('var a = new CC.TextMetricsCache(); a.lines[0] = new CC.LineMetricsCache(); a.invalidateAll(); a.lines[0]');
