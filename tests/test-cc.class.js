description("CC.Class");
shouldThrow('new CC.Class({ $name: "foo.bar.newClass" });', '"CC.Class: Could not find object at foo.bar"');
shouldBe('new CC.Class({ $name: "foo" }); foo.displayName', '"foo"');

description("CC.Class Basic");
new CC.Class({
    $name: "Cat",
    $properties: ["fullName"],
    init: function(name) {
        this.name = name;
    },
    talk: function() { return "Meow"; },
    getFullName: function() { return "Cat " + this.name; },
    setFullName: function(str) { this.name = str.replace(/^Cat /, ""); }
});
shouldBe('(new Cat("Garfield")).talk.displayName', '"Cat.talk"');
shouldBe('(new Cat("Garfield")).name', '"Garfield"');
shouldBe('(new Cat("Garfield")).fullName', '"Cat Garfield"');
shouldBe('a = new Cat("Garfield"); a.fullName = "Cat Tom"; a.name', '"Tom"');

description("CC.Class Inheritance");
new CC.Class({
    $name: "Tiger",
    $prototype: Cat,
    $properties: ["initials"],
    talk: function() { return "Roar"; },
    getFullName: function() { return "Tiger " + this.name; },
    setFullName: function(str) { this.name = str.replace(/^Tiger /, ""); },
    getInitials: function(str) { return "T." + this.name.charAt(0) + "."; }
});
shouldBe('(new Tiger("Hobbes")).talk.displayName', '"Tiger.talk"');
shouldBe('(new Tiger("Hobbes")).name', '"Hobbes"');
shouldBe('(new Tiger("Hobbes")).fullName', '"Tiger Hobbes"');
shouldBe('a = new Tiger("Hobbes"); a.fullName = "Tiger Tigger"; a.name', '"Tigger"');
shouldBe('(new Tiger("Hobbes")).initials', '"T.H."');
