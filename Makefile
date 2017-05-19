run: script.js
	node "$<"

test: test-script.js
	node "$<"

bench: bench-script.js
	node "$<"

.PHONY: run test bench

script.js: index.js enclose.js enclose-no-mtf.js enclose-msw.js shuffle.js permutations.js libenclose.js
	rollup -o "$@" -f iife "$<"

test-script.js: test.js enclose.js enclose-no-mtf.js enclose-msw.js shuffle.js permutations.js libenclose.js
	rollup -o "$@" -f iife "$<"

bench-script.js: bench.js enclose.js enclose-no-mtf.js enclose-msw.js shuffle.js permutations.js libenclose.js
	rollup -o "$@" -f iife "$<"
