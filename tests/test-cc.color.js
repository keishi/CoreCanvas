description("CC.Color")
var canvas = document.createElement("canvas");
CC.currentContext = canvas.getContext("2d");
shouldBe('(new CC.Color(1,2,3)).red', '1');
shouldBe('(new CC.Color(1,2,3)).green', '2');
shouldBe('(new CC.Color(1,2,3)).blue', '3');
shouldBe('CC.Color.white.setFill(); CC.currentContext.fillStyle', '"#ffffff"');
