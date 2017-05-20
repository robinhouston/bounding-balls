run: index-script.js
	node "$<"

test: test-script.js
	node "$<"

bench: bench-script.js
	node "$<"

numerics: numerics-script.js
	node "$<"

.PHONY: run test bench numerics

LIBS = enclose.js enclose-no-mtf.js \
	enclose-msw.js enclose-msw-no-mtf.js enclose-msw-array.js \
	list.js permutations.js libenclose.js

%-script.js: %.js $(LIBS)
	rollup -o "$@" -f iife "$<"
