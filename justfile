set shell := ["nu", "-c"]

deploy:
    netlify deploy
watch:
    CDN_PATH="" cargo leptos watch --features serve
build:
    CDN_PATH="" cargo leptos build -r
    CDN_PATH="" ./target/release/cb_site

# watch a post, compiling it into a pdf repeatedly
# accepts the post directory in content/ as the identifier
watch-post post_dir="":
    #!/usr/bin/env nu
    let post_choice = if ("{{post_dir}}" | is-empty) {
        ls content/**/main.typ | get name | path dirname | path basename | to text | sk -i
    } else if ("{{post_dir}}" | path exists) {
        "{{post_dir}}"
    } else {
        error make {msg: "post directory `{{post_dir}}` does not exist"}
    } | str trim;
    typst watch --root . --features html post-wrapper.typ --input post_path=$"content/($post_choice)/main.typ" test.pdf
# Generate PDFs for all posts individually, and one big PDF for all of them
# generate-pdfs:
#     #!/usr/bin/env nu
#     ls content/**/main.typ | get name | path dirname | path basename | to text | sk -i
#     typst
# sk -i -c "fd --type directory --max-depth 1 --exec echo '{/}'";
#     typst compile --root . --features html post-wrapper.typ --input post_path="content/an-introduction-to-wesl/main.typ" test.pdf

# _typst operation book extension:
#     #!/usr/bin/env nu
#     let book_choice = if ("{{book}}" | is-empty) {
#         sk -i -c "fd --type directory --max-depth 1 --exec echo '{/}'";
#     } else if ("{{book}}" | path exists) {
#         "{{book}}"
#     } else {
#         error make {msg: "book directory `{{book}}` does not exist"}
#     } | str trim;
#     typst {{operation}} --features html $"($book_choice)/src/main.typ" $"revisions/($book_choice).{{extension}}"

# codeblocks book:
#     #!/usr/bin/env nu
#     let book_choice = if ("{{book}}" | is-empty) {
#         sk -i -c "fd --type directory --max-depth 1 --exec echo '{/}'";
#     } else if ("{{book}}" | path exists) {
#         "{{book}}"
#     } else {
#         error make {msg: "book directory `{{book}}` does not exist"}
#     } | str trim;
#     typst query $"($book_choice)/src/main.typ" "raw" --target html --features html | from json | where block | get text | save $"revisions/($book_choice).codeblocks.json"


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