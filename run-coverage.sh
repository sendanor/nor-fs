#!/bin/sh -x
test -e
if test -d src-inst/; then
	rm -rf src-inst/
fi
jscoverage src/ src-inst/
vows tests/test-*.js --cover-html
if test -d src-inst/; then
	rm -rf src-inst/
fi
