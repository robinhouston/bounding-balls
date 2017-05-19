import encloseMSW from "./enclose-msw";
import encloseD3 from "./enclose";
import allPermutationsOf from "./permutations";

const N = 8,
      EPS = 1e-6;

function randomCircle() {
	return {
		x: Math.random() * 1000,
		y: Math.random() * 1000,
		r: Math.random() * 200,
	};
}

function randomCircles() {
	const r = [];
	for (var i = 0; i < N; i++) {
		r.push(randomCircle());
	}
	return r;
}

function circlesEqual(a, b) {
	return Math.abs(a.x-b.x) <= EPS && Math.abs(a.y-b.y) <= EPS && Math.abs(a.r-b.r) <= EPS;
}

// while(true) enclose(randomCircles());

while(true) {
	let circles = randomCircles();
	let previous_result;
	allPermutationsOf(circles, circles => {
		const result = encloseMSW(circles);
		if (typeof previous_result !== "undefined") {
			if (!circlesEqual(previous_result, result)) {
				console.warn("Inconsistent results!", previous_result, result);
				console.warn("D3 thinks the answer is", encloseD3(circles));
			}
		}
		previous_result = result;
	});
}
