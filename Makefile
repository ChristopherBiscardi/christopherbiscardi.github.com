MAH_FILES = packages/www/public/web_modules/import-map.json

build: $(MAH_FILES)
	yarn workspace www build
	cd netlify-functions/test-streamblitz && yarn
	GOBIN=${PWD}/netlify-functions go install ./...

packages/www/public/web_modules/import-map.json:
	yarn workspace www breadbox --optimize

clean:
	rm -rf packages/www/.cache packages/www/public