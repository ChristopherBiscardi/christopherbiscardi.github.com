MAH_FILES = snowpack/pkg/package.json packages/www/.cache/your-first-crdt.js

build: $(MAH_FILES)
	yarn workspace www bake
	cd netlify-functions/test-streamblitz && yarn
	GOBIN=${PWD}/netlify-functions go install ./...

public/web_modules/import-map.json: snowpack/pkg/package.json
	cd packages/www && yarn snowpack

packages/www/.cache/your-first-crdt.js: public/web_modules/import-map.json
	yarn workspace www shake

snowpack/pkg/package.json:
	git clone https://github.com/ChristopherBiscardi/snowpack.git > /dev/null
	cd snowpack && git checkout webdependency-alias && npm i && yarn build
	yarn

clean:
	rm -rf packages/www/.cache packages/www/public