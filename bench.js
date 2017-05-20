import encloseWelzl from "./enclose";
import encloseWelzlNoMTF from "./enclose-no-mtf";
import encloseMSW from "./enclose-msw";
import encloseMSWNoMTF from "./enclose-msw-no-mtf";
import encloseMSWArray from "./enclose-msw-array";

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

suite.add("Welzl", function() {
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
.add("MSW (array)", function() {
	encloseMSWArray(randomCircles(N));
})
.on("cycle", function(event) {
	console.log(String(event.target));
})
.on("complete", function() {
	console.log("Fastest is " + this.filter("fastest").map("name"));
})
// run async
.run({ "async": true });
