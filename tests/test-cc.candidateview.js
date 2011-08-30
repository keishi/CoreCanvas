description("CC.CandidateView")
var view = new CC.CandidateView();
view.setCandidates(["Apple", "Banana", "Cherry"]);
shouldBe('view.selectedIndex = 1; view.selectedCandidate', '"Banana"');
