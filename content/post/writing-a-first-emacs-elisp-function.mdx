---
title: "Writing A First Emacs Elisp Function"
date: 2014-02-04
url: "/2014/2/4/writing-a-first-emacs-elisp-function/"
---

So today I tried to write my first fully custom Emacs Lisp code. Here are some
things I learned (along with the code for a `region-to-gist` function).

[Here](https://gist.github.com/anonymous/8812412) is my final product, uploaded
straight from Emacs.

The final script looks like this at the bottom of my `.emacs` file:

```lisp
;;; Region to Gist
(defun region-to-gist ()
  "Sends region to Gist"
  (interactive)
  (if (region-active-p)
      (gist-req (buffer-substring-no-properties (region-beginning) (region-end))))
  nil)

(defun gist-test (buf)
  (message "%S" `(:content ,buf)))

(defun gist-req (buf)
  (request
       "https://api.github.com/gists"
       :type "POST"
       :data (json-encode `(:description "Created with Christopher Biscardi's region-to-gist"
                            :public t
                            :files (:example.el (:content ,buf))))
       ;; :data "key=value&key2=value2"  ; this is equivalent
       :parser 'json-read
       :success (function*
                 (lambda (&key data &allow-other-keys)
                   (message "I sent: %S" (assoc-default 'html_url data)))))
  nil)
```

It is used by setting a mark `C-SPC`, selecting a region (arrow keys work to
expand the region) then typing `M-x region-to-gist`. The Function then runs and
outputs either an error message (hopefully not) or this to the message buffer:

```shell
I sent: "https://gist.github.com/8812412"
```

The most important part here is the `(interactive)` which allows you to use `M-x region-to-gist` to execute the function. There are a couple different modes you
can enable with this.

`region-active-p` basically returns true if there’s a region selection (The
`C-SPC` and arrows stuff).

`gist-test` is a function I used to replace the `gist-req` call so I could test
whether or not the region was actually being sent and resolve some formatting
issues. This function can be wholly deleted with no ramifications.

`buffer-substring-no-properties` returns undecorated strings from your buffers.
Use this is you’re trying to handle a string (such as in JSON) and use
`buffer-substring` if you’re trying to put something in the kill-ring, etc.

I’m using [request.el](http://tkf.github.io/emacs-request/) to make my request.
It tries to use `curl` if available.

The biggest part of the request code is the `:success` function. In this case we
grab the key `html_url` from the [Gist API
Response](http://developer.github.com/v3/gists/#create-a-gist)`data`.

The backtick here:

```
`(:description "Created with Christopher Biscardi's
region-to-gist" :public t :files (:example.el (:content ,buf)))
```

means we have to use the `,` for `,buf` to get the value of `buf`.

Oh, and also, this function should probably be called `gist-region` as per other
region functions. oops.
