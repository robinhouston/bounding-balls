import encloseWelzl from "./enclose";
import encloseWelzlNoMTF from "./enclose-no-mtf";
import encloseWelzlArray from "./enclose-array";
import encloseMSW from "./enclose-msw";
import encloseMSWNoMTF from "./enclose-msw-no-mtf";
import encloseMSWArray from "./enclose-msw-array";
import encloseMSWIncorrect from "./enclose-msw-incorrect";

const N = 50;

const Benchmark = require("benchmark");

const suite = new Benchmark.Suite;

function randomCircle() {
	return {
		x: Math.random() * 1000,
		y: Math.random() * 1000,
		r: Math.random() * 20,
	};
}

function randomCircles(n) {
	const r = [];
	for (let i = 0; i < n; i++) {
		r.push(randomCircle());
	}
	return r;
}

suite.on("error", function(e) { throw e.target.error; })
.add("Welzl", function() {
	encloseWelzl(randomCircles(N));
})
.add("MSW", function() {
	encloseMSW(randomCircles(N));
})
.add("Welzl (no move-to-front)", function() {
	encloseWelzlNoMTF(randomCircles(N));
})
.add("MSW (no move-to-front)", function() {
	encloseMSWNoMTF(randomCircles(N));
})
.add("Welzl (array)", function() {
	encloseWelzlArray(randomCircles(N));
})
.add("MSW (array)", function() {
	encloseMSWArray(randomCircles(N));
})
.add("MSW (incorrect)", function() {
	encloseMSWIncorrect(randomCircles(N));
})
.on("cycle", function(event) {
	console.log(String(event.target));
})
.on("complete", function() {
	console.log("Fastest is " + this.filter("fastest").map("name"));
})
// run async
.run({ "async": true });
