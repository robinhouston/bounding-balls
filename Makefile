run: script.js
	node script.js

script.js: index.js enclose.js enclose-no-mtf.js shuffle.js
	rollup -o script.js -f es index.js

.PHONY: run
