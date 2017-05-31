run: index-script.js
	node "$<"

test: test-script.js
	node "$<"

bench: bench-script.js
	node "$<"

numerics: numerics-script.js
	node "$<"

t: t-script.js
	node "$<"

.PHONY: run test bench numerics t

ENCLOSE_SCRIPTS = $(wildcard enclose*.js)

LIBS = $(ENCLOSE_SCRIPTS) \
	list.js permutations.js libenclose.js

%-script.js: %.js $(LIBS)
	rollup -o "$@" -f iife "$<"
