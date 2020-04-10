MAH_FILES = packages/www/public/web_modules/import-map.json

build: $(MAH_FILES)
	ls -l
	yarn workspace www build
	cd netlify-functions/test-streamblitz && yarn
	GOBIN=${PWD}/netlify-functions go install ./...

snowpack/package.json: 
	git clone https://github.com/ChristopherBiscardi/snowpack.git

snowpack/pkg/package.json: snowpack/package.json
	cd snowpack && git checkout webdependency-alias-object && npm i && yarn build
	yarn
	yarn why snowpack

packages/www/public/web_modules/import-map.json: snowpack/pkg/package.json
	ls -l
	yarn workspace www snowpack --optimize

clean:
	rm -rf packages/www/.cache packages/www/public