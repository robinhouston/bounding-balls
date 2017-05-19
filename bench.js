import encloseWelzl from "./enclose";
import encloseMSW from "./enclose-msw";

const Benchmark = require("benchmark");

const suite = new Benchmark.Suite;

function randomCircle() {
	return {
		x: Math.random() * 1000,
		y: Math.random() * 1000,
		r: Math.random() * 200,
	};
}

function randomCircles(n) {
	const r = [];
	for (let i = 0; i < n; i++) {
		r.push(randomCircle());
	}
	return r;
}

function randomCircleSets(m, n) {
	const r = [];
	for (let i = 0; i < m; i++) {
		r.push(randomCircles(n));
	}
	return r;
}

const circle_sets = randomCircleSets(1000, 50);

suite.add("Welzl", function() {
	for (var i = 0; i < circle_sets.length; i++) {
		encloseWelzl(circle_sets[i]);
	}
})
.add("MSW", function() {
	for (var i = 0; i < circle_sets.length; i++) {
		encloseMSW(circle_sets[i]);
	}
})
.on("cycle", function(event) {
	console.log(String(event.target));
})
.on("complete", function() {
	console.log("Fastest is " + this.filter("fastest").map("name"));
})
// run async
.run({ "async": true });
