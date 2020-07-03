find ./packages/www/public -name '*.html' |
sed -e 's,^\./packages/www/public/,,' |
awk -F'.' '{print "https://christopherbiscardi.com/"$1}' |
npx sitemap > ./packages/www/public/sitemap.xml