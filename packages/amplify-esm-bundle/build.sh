set -euxo pipefail

yarn build --production
cp ./dist/amplify-esm-bundle.js ../www/static/amplify.js