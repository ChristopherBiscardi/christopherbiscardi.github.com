MAH_FILES = snowpack/pkg/package.json packages/www/public/web_modules/import-map.json

build: $(MAH_FILES)
	yarn workspace www build
	cd netlify-functions/test-streamblitz && yarn
	GOBIN=${PWD}/netlify-functions go install ./...

packages/www/public/web_modules/import-map.json: snowpack/pkg/package.json
	yarn workspace www snowpack --optimize

snowpack/package.json: 
	git clone https://github.com/ChristopherBiscardi/snowpack.git

snowpack/pkg/package.json: snowpack/package.json
	cd snowpack && git checkout webdependency-alias-object && npm i && yarn build
	yarn

clean:
	rm -rf packages/www/.cache packages/www/public