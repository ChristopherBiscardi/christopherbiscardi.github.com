build:
	git clone https://github.com/ChristopherBiscardi/snowpack.git
	cd snowpack && git checkout webdependency-alias && npm i && npm build
	yarn
	cd packages/www && yarn snowpack
	yarn workspace www shake
	yarn workspace www bake
	cd netlify-functions/test-streamblitz && yarn
	GOBIN=${PWD}/netlify-functions go install ./...