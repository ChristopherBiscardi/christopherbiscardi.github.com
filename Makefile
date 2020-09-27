MAH_FILES = packages/www/public/web_modules/import-map.json

build: $(MAH_FILES)
	yarn workspace www build
	./scripts/build-sitemap.sh
	# cd netlify-functions/test-streamblitz && yarn
	# GOBIN=${PWD}/netlify-functions go install ./...

packages/www/public/web_modules/import-map.json:
	yarn patch-package
	yarn workspace www breadbox

clean:
	rm -rf packages/www/.cache packages/www/public