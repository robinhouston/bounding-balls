run: script.js
	node "$<"

test: test-script.js
	node "$<"

.PHONY: run test

script.js: index.js enclose.js enclose-no-mtf.js enclose-msw.js shuffle.js
	rollup -o "$@" -f es "$<"

test-script.js: test.js enclose.js enclose-no-mtf.js enclose-msw.js shuffle.js
	rollup -o "$@" -f es "$<"
