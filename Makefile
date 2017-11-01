.PHONY: test clean


dev:
	webpack --watch

build:
	NODE_ENV=production webpack

test-umd:
	webpack --config test/webpack.test.js --watch

deploy:
	sh deploy.sh

publish: build
	npm publish