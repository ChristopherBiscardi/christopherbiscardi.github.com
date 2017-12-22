---
title: "Chaining Emacs Commands Without Elisp"
date: 2017-12-22
tags: [emacs, productivity]
---

tldr; here's a video:

{{< youtube ok-ktap-gNA >}}

# Before and After

As part of splitting a React component into its own file, Let's take this file

```js
import styled from "react-emotion";

class Message extends Component {
  render() {
    return (
      <tr
        onClick={() => {
          this.onMessageSelected(msg.id);
        }}
        key={msg.id}
        className={cx(
          "cabana-meta-messages-list-item",
          this.selectedMessageClass(msg.id)
        )}
      >
        <td>{msg.frame ? msg.frame.name : "undefined"}</td>
        <td>{msg.id}</td>
        <td>{msg.entries.length}</td>
        <td>
          <div className="cabana-meta-messages-list-item-bytes">
            <MessageBytes
              key={msg.id}
              message={msg}
              seekIndex={this.props.seekIndex}
              seekTime={this.props.seekTime}
              live={this.props.live}
            />
          </div>
        </td>
      </tr>
    );
  }
}
```

and remove the `msg.` "namespace" so we can destructure the variables from
`this.props`.

```js
import styled from "react-emotion";

class Message extends Component {
  render() {
    const { id, frame, entries } = this.props;
    return (
      <tr
        onClick={() => {
          this.onMessageSelected(id);
        }}
        key={msg.id}
        className={cx(
          "cabana-meta-messages-list-item",
          this.selectedMessageClass(id)
        )}
      >
        <td>{frame ? frame.name : "undefined"}</td>
        <td>{id}</td>
        <td>{entries.length}</td>
        <td>
          <div className="cabana-meta-messages-list-item-bytes">
            <MessageBytes
              key={id}
              message={msg}
              seekIndex={this.props.seekIndex}
              seekTime={this.props.seekTime}
              live={this.props.live}
            />
          </div>
        </td>
      </tr>
    );
  }
}
```

# Command Explanation

I'm using [ivy](https://github.com/abo-abo/swiper) and
[multiple-cursors](https://github.com/magnars/multiple-cursors.el) to do this.

The command sequence is as such:

```
C-s msg.\w+
C-7 M-<left> M-<del> M-d C-y
C-g M-gg 6
C-o C-o C-o C-o C-o C-o
C-x r y
C-SPC C-p C-p C-p C-p C-p
M-x delete-duplicate-lines
C-r $ <ret> , <ret>
```

Command by command that is:

* `C-s msg.\w+`
  * Use swiper to search for a regex matching `msg.\w+`
* `C-7`
  * With search results, insert a cursor at each match
* `M-<left> M-<del> M-d C-y`
  * delete `msg.` then put the `\w+` part in the kill ring.
* `C-g M-gg 6`
  * Exit multiple-cursors and go to line 6 (where our destructuring will be)
* `C-o C-o C-o C-o C-o C-o`
  * make space so we can yank-rectangle, which otherwise inserts without moving
    other lines around.
* `C-x r y`
  * `yank-rectangle` to put all matches in place
* `C-SPC C-p C-p C-p C-p C-p`
  * select the matches that we just inserted as a region
* `M-x delete-duplicate-lines`
  * unique the list of matches
* `C-r $ <ret> , <ret>`
  * use regex replace to insert a `,` at the end of each line.
* `C-x C-s`
  * save the buffer, which I have set to trigger prettier-js which nicely
    formats the extra space, etc

# Unsolved Problems

#### Multiple Cursors

multiple-cursors only lets you have one cursor per line when using `swiper-mc`,
which means lines like the following will only apply to the first `msg.\w+`
match.

```js
<td>{msg.frame ? msg.frame.name : "undefined"}</td>;
```

This seems to be related to how swiper shows multiple matches on a single line.

If we look at the definition of `swiper-mc`, we see some indication that it
could be the way swiper handles candidates itself, since we create a cursor for
every candidate.

```lisp
(defun swiper-mc ()
  "Create a fake cursor for each `swiper' candidate."
  (interactive)
  (unless (require 'multiple-cursors nil t)
    (error "Multiple-cursors isn't installed"))
  (unless (window-minibuffer-p)
    (error "Call me only from `swiper'"))
  (let ((cands (nreverse ivy--old-cands)))
    (unless (string= ivy-text "")
      (ivy-exit-with-action
       (lambda (_)
         (let (cand)
           (while (setq cand (pop cands))
             (swiper--action cand)
             (when cands
               (mc/create-fake-cursor-at-point))))
         (multiple-cursors-mode 1))))))
```

I'll probably dig into that at some point.

#### C-o & C-p

`C-o` and `C-p` repeatedly are functionally useful but cumbersome. It would be
nice to have a `yank-rectangle` that pushed other content down. Perhaps doable
via transferring a rectangle to the kill-ring instead. This will require elisp
afaict. This would get rid of the excessive `C-o` ing but what I really want is
to not have to think about how many lines are being inserted.

The `C-p` I'm referring to is mostly for expanding regions. I bet there's a
better option somewhere to find but I haven't looked for it yet.

# Fin

All in all I think I refactor enough code to make the investment in writing some
elisp to turn a series of object property accesses into a destructured
expression, but its interesting to note how far we can get without writing any
elisp at all and instead combining assorted existing commands.

Another thing that I learned in this process was `occur-mode` and swiper's occur
functionality. This lets you take all of the results of a swiper search (`C-s`)
and put them in a new buffer and perform actions on them. The default action
seems to be "take me to the place in the buffer where the search result is"
which is hella cool for working through a large codebase tracking function names
down, etc. Thanks for that pointer,
[Avichal](https://twitter.com/_avichalp/status/943801008458625024).
