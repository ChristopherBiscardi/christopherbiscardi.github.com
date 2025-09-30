set shell := ["nu", "-c"]

deploy:
    netlify deploy
watch:
    CDN_PATH="" cargo leptos watch --features serve
build:
    CDN_PATH="" cargo leptos build -r
    CDN_PATH="" ./target/release/cb_site
# lint and fix anything that can be fixed automatically
fix-all: fmt-cargo fix-cargo fix-clippy fmt-leptos

# run cargo fix
fix-cargo:
    cargo fix
    git add -u
    if (git diff --name-only --cached) != "" { git commit -m 'cargo --fix' }
fix-clippy:
    cargo clippy --fix
    git add -u
    if (git diff --name-only --cached) != "" { git commit -m 'cargo clippy --fix' }
fmt-leptos:
    leptosfmt crates/www/src/**/*.rs
    git add -u
    if (git diff --name-only --cached) != "" { git commit -m 'leptosfmt' }
fmt-cargo:
    cargo +nightly fmt
    git add -u
    if (git diff --name-only --cached) != "" { git commit -m 'cargo fmt' }