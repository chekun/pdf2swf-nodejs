TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 10000
JSCOVERAGE = /usr/local/bin/jscover

install:
	@npm install

test:
	@NODE_ENV=test /usr/local/bin/mocha \
    		--reporter $(REPORTER) \
    		--timeout $(TIMEOUT) \
		--require should \
    		$(TESTS)

test-cov: lib-cov
	@URLRAR_COV=1 $(MAKE) test
	@URLRAR_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@rm -rf $@
	@$(JSCOVERAGE) lib $@

.PHONY: install test test-cov lib-cov