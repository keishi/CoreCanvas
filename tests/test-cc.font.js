description("CC.Font")
var canvas = document.createElement("canvas");
CC.currentContext = canvas.getContext("2d");
shouldBe('(new CC.Font("Courier New", 14)).set(); CC.currentContext.font', '"14px \\"Courier New\\""');
shouldBe('var a = new CC.LineMetricsCache(); a.update("lorem"); a.offsets[0]', '8');
shouldBe('var a = new CC.LineMetricsCache(); a.update("lorem"); a.offsets[1]', '16');
shouldBe('var a = new CC.LineMetricsCache(); a.update("lorem"); a.offsets[2]', '24');
