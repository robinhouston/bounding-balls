import { enclose3, enclosesAll, isBasis } from "./libenclose";

function randomCircle() {
	return {
		x: Math.random() * 1000,
		y: Math.random() * 1000,
		r: Math.random() * 200,
	};
}

function perturb(c) {
	return {
		x: c.x + Math.random() * 10 - 5,
		y: c.y + Math.random() * 10 - 5,
		r: c.r + Math.random() * 20 - 10,
	};
}

let n = 0;
while(true) {
	const a = randomCircle(),
	      b = perturb(a),
	      c = randomCircle();

	const B = enclose3(a, b, c);

	if (isBasis(a,b,c) && !enclosesAll(B, [a,b,c])) {
		throw new Error(JSON.stringify([a,b,c]));
	}

	n += 1;
	if (n == 100000) {
		process.stderr.write(".");
		n = 0;
	}
}
