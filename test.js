import enclose from "./enclose-msw";
import allPermutationsOf from "./permutations";

const N = 8;

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

function arrayEquals(a, b) {
	if (a.length !== b.length) return false;
	for (var i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

// while(true) enclose(randomCircles());

while(true) {
	let circles = randomCircles();
	let previous_result;
	allPermutationsOf(circles, circles => {
		const result = enclose(circles);
		if (typeof previous_result !== "undefined") {
			if (!arrayEquals(previous_result, result)) {
				console.warn("Inconsistent results!", previous_result, result);
			}
		}
		previous_result = result;
	});
}
