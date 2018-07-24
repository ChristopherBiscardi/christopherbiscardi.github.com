---
title: "Emacs Command Frequency 2017"
date: 2017-12-22
tags: [emacs,productivity]
---

I use [keyfreq][keyfreq] to record the commands I use in emacs and periodically
check the log to see what I should rebind, etc. here's a list of every command I
used that has more than 100 uses (which hilariously to me, is almost 100
commands).

[keyfreq][keyfreq] stores its content in a file (which sometimes I've had
conflict issues with in the past so consider this output "sampled" in terms of
absolute number). The output records what mode I'm in and the command used as
well as a number (presumably uses?).

```lisp
(((emacs-lisp-mode . mouse-set-point) . 77)
((minibuffer-inactive-mode . swiper) . 718)
((emacs-lisp-mode . eval-buffer) . 33)
((emacs-lisp-mode . paredit-backward-kill-word) . 12)
((emacs-lisp-mode . paredit-backward-delete) . 818)
((emacs-lisp-mode . org-edit-src-save) . 171)
((minibuffer-inactive-mode . org-edit-src-save) . 23)
((special-mode . mouse-drag-region) . 1)
((special-mode . mouse-set-region) . 1)
((fundamental-mode . kill-line) . 45)
```

The first two on my list are deletions. The first is a normal press of the
delete key. The second is more interesting. It's a function from
[smartparens][smartparens] that I didn't even know I was calling. It makes sense
though because I've been using it in strict mode since I redid my emacs config
and that makes me keep all parens balanced all the time (or use `C-q` to insert
one-offs).

```
  16079    9.25%  delete-backward-char                         DEL
  11720    6.74%  sp-backward-delete-char
```

if I `ack` my keyfreq file for `sp-backward` I end up with a ton of matches. I
didn't expect there to be so many `sp-backward` commands. It turns out this one
mostly comes from `go-mode` and secondarily from `web-mode`. This makes sense
since I mostly write go and JavaScript these days (as opposed to Haskell and
JavaScript in the past).

```lisp
((go-mode . sp-backward-delete-char) . 5308)
((web-mode . sp-backward-delete-char) . 6095)
```

There are actually a bunch more `sp-` commands that I use without even realizing
it, such as `sp-kill-hybrid-sexp`. I gleaned a uniqued list using some `ack`.
Smartparens seems to have some cool features so I should definitely look into
the other commands it offers.
[andohwowijustdiscoveredithasslurpingandbarfing](https://ebzzry.io/en/emacs-pairs/#unwrapping)
(I'm excited about wrapping/slurping/etc)

```shell
➜ ack -o "\ sp-[\w-]*" ~/.emacs.keyfreq | sort | uniq
 sp-backward-delete-char
 sp-backward-kill-word
 sp-delete-char
 sp-forward-barf-sexp
 sp-kill-hybrid-sexp
 sp-kill-region
 sp-kill-word
 sp-remove-active-pair-overlay
```

# Saving

duh; save early, save often or perish. I might be mixing my phrases here...

```
   9206    5.30%  save-buffer                                  s-s, C-x C-s, <menu-bar> <file> <save-buffer>
```

# Movement

I should put more effort into avoiding the arrow keys when I'm hands-on-keyboard
since `C-f/b` do the same thing

```
   9105    5.24%  left-char                                    <left>
   7590    4.37%  right-char                                   <right>
   6037    3.47%  move-end-of-line
   4662    2.68%  move-beginning-of-line
   5203    2.99%  newline
   4426    2.55%  backward-word                                M-b
   3451    1.99%  forward-word                                 M-f
   2231    1.28%  backward-char                                C-b
```

# "Focus the emacs application with the mouse so I can use it"

Yeah, I don't use a mouse in emacs, but I _do_ use a mouse to swap applications
because I'm on OSX and don't have a tiling window manager or something cool like
that.

```
   8761    5.04%  mouse-drag-region                            <down-mouse-1>
   8464    4.87%  mouse-set-point
```

# markdown

I honestly have no idea why this one is getting called so often. I write a lot
of markdown (blog posts, READMEs, etc) but feel like its getting called by
something connected to one of the delete functions I use so much.

```
   7681    4.42%  markdown-outdent-or-delete
```

# isearch

Something to do with incrementally searching printing characters. Not super sure
but I do search _a lot_ so I'd expect stuff related to searching or ivy/swiper
at this point.

```
   5167    2.97%  isearch-printing-char
   2071    1.19%  isearch-repeat-forward                       s-g
```

# Operating on Regions

indenting, adding a character to the beginning of a set of lines, regex
replacement, etc. Everything needs a region to operate on.

```
   3760    2.16%  set-mark-command                             C-@, C-SPC
```

# Completion

Completion, in the minibuffer. [AKA `<tab>`
completion](https://www.gnu.org/software/emacs/manual/html_node/elisp/Completion.html)

```
   2754    1.58%  minibuffer-complete
```

And a bunch of other stuff that's less interesting.

```
   1908    1.10%  markdown-enter-key
   1726    0.99%  find-file                                    <open>, <menu-bar> <file> <new-file>
   1604    0.92%  undo                                         <menu-bar> <edit> <undo>, C-_, s-z, <undo>, C-/, C-x u
   1572    0.90%  simpleclip-paste                             <S-insertchar>, <S-insert>, s-v, <menu-bar> <edit> <paste>
   1468    0.84%  handle-switch-frame                          <switch-frame>
   1450    0.83%  undo-tree-undo
   1441    0.83%  yank
   1378    0.79%  kill-line                                    <deleteline>
   1346    0.77%  beginning-of-buffer                          <menu-bar> <edit> <goto> <beg-of-buf>, <kp-home>, <begin>, <C-home>, <home>, M-<
   1288    0.74%  ivy-backward-delete-char
   1270    0.73%  org-self-insert-command                      SPC..~, ..�
   1257    0.72%  dabbrev-expand                               M-/
   1211    0.70%  yaml-electric-backspace
   1198    0.69%  mwheel-scroll                                <C-wheel-down>, <S-wheel-down>, <wheel-down>, <C-wheel-up>, <S-wheel-up>, <wheel-up>
   1177    0.68%  company-ignore                               <company-dummy-event>
   1044    0.60%  delete-forward-char                          <deletechar>
   1024    0.59%  sp-kill-region
    991    0.57%  ivy-done
    970    0.56%  open-line                                    C-o, <insertline>
    903    0.52%  isearch-forward                              <menu-bar> <edit> <search> <i-search> <isearch-forward>, s-f
    889    0.51%  paredit-backward-delete
    873    0.50%  ivy-next-line
    838    0.48%  end-of-buffer                                <menu-bar> <edit> <goto> <end-of-buf>, <kp-end>, <C-end>, <end>, M->
    821    0.47%  delete-horizontal-space                      M-\
    785    0.45%  electric-newline-and-maybe-indent
    770    0.44%  sp-kill-hybrid-sexp
    752    0.43%  backward-kill-word                           <C-backspace>, M-DEL
    749    0.43%  ivy-next-line-or-history
    740    0.43%  kill-word                                    <C-delete>, M-d
    726    0.42%  swiper                                       C-s
    722    0.42%  backward-delete-char-untabify
    719    0.41%  ivy-previous-line
    678    0.39%  vr/replace                                   C-c r
    674    0.39%  windmove-right
    666    0.38%  scroll-up-command                            C-v, <kp-next>, <next>
    642    0.37%  keyboard-quit                                C-g
    638    0.37%  sp-backward-kill-word
    637    0.37%  exit-minibuffer
    631    0.36%  forward-char                                 C-f
    622    0.36%  sp-delete-char
    602    0.35%  ivy-partial-or-done
    558    0.32%  kill-region                                  C-w
    537    0.31%  sp-kill-word
    513    0.30%  delete-window                                C-x 0
    508    0.29%  counsel-find-file                            C-x C-f
    501    0.29%  windmove-down
    482    0.28%  dired-next-line
    465    0.27%  scroll-down-command                          <kp-prior>, <prior>, M-v
    464    0.27%  minibuffer-keyboard-quit
    456    0.26%  org-cycle                                    <mouse-1>, <tab>, TAB, <menu-bar> <Tbl> <Next Field>, <menu-bar> <Org> <Show/Hide> <Cycle Visibility>
    421    0.24%  smex
    359    0.21%  split-window-right                           C-x 3, <menu-bar> <file> <new-window-on-right>
    352    0.20%  windmove-left
    347    0.20%  simpleclip-copy                              <C-insertchar>, <C-insert>, s-c, <menu-bar> <edit> <copy>
    343    0.20%  org-delete-backward-char                     DEL
    301    0.17%  split-window-below                           C-x 2, <menu-bar> <file> <new-window-below>
    292    0.17%  server-edit                                  C-x #
    272    0.16%  mouse-set-region                             <drag-mouse-1>
    252    0.15%  windmove-up
    248    0.14%  previous-buffer                              <XF86Back>, C-x <C-left>, C-x <left>, <menu-bar> <buffer> <previous-buffer>
    238    0.14%  quoted-insert                                C-q
    225    0.13%  yaml-electric-dash-and-dot
    220    0.13%  Buffer-menu-delete
    202    0.12%  balance-windows                              C-x +
    194    0.11%  org-edit-src-save
    192    0.11%  other-frame                                  s-`, C-x 5 o
    182    0.10%  simpleclip-cut                               <S-delete>, s-x, <menu-bar> <edit> <cut>
    178    0.10%  next-buffer                                  <XF86Forward>, C-x <C-right>, C-x <right>, <menu-bar> <buffer> <next-buffer>
    166    0.10%  dired-previous-line
    156    0.09%  org-beginning-of-line                        C-a
    142    0.08%  isearch-delete-char
    138    0.08%  maximize-window
    135    0.08%  markdown-electric-backquote
    129    0.07%  avy-goto-line                                M-g g
    125    0.07%  dired-find-file
    124    0.07%  indent-for-tab-command
    121    0.07%  org-edit-special                             C-c ', <menu-bar> <Org> <Editing> <Edit Source Example>, <menu-bar> <Tbl> <Calculate> <Edit Formulas>
    105    0.06%  org-end-of-line                              C-e
    101    0.06%  capitalize-word                              M-c
    100    0.06%  org-edit-src-exit
```

# fin

I see a bunch of commands that I've replaced or recently switched to so I think
I'll delete the file and see how Q1 2018 goes.

[keyfreq]: https://github.com/dacap/keyfreq
[smartparens]: https://github.com/Fuco1/smartparens
