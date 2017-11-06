---
title: "Cool Stuff You Can Do With fzf"
date: 2017-11-05
tags: [cli]
---

[fzf][fzf] is an awesome tool for filtering and selecting lists of
things on the command line.

# kill

```shell
kill <tab>
```

![fzf-kill-autocomplete](/img/fzf-kill-autocomplete.png)

# Generalizing kill

In addition to the autocomplete for `kill`, we can use `fzf` to pick
from other lists as well. We can roughly reconstruct the behavior with
a chain of other commands.

```shell
ps aux | fzf -m | awk '{print $2}' | xargs kill
```

![fzf-multi-kill](/img/fzf-multi-kill.gif)

# kubectl

Let's do something a bit more fun. We can boot up a kube cluster using
GKE, then interactively select a pod to exec into. First let's create
a cluster and start a sample pod.

```shell
gcloud container clusters create test-cluster
gcloud container clusters get-credentials test-cluster
kubectl create -f https://k8s.io/docs/tasks/debug-application-cluster/shell-demo.yaml
```

We can check to make sure the pod is running by getting the pods.

```shell
➜ kubectl get pods
NAME         READY     STATUS    RESTARTS   AGE
shell-demo   1/1       Running   0          22m
```

Now, with `fzf`, we can construct a command which will let us
interactively pick a pod to exec into.

```shell
kubectl get pods --no-headers \
  | fzf | awk '{print $1}' \
  | xargs -o -I % kubectl exec -it % bash
```

Pick the pod (of which there's only one for us right now).

![shell-demo-picker](/img/shell-demo-picker.png)

This will get you a shell in a pod something like this, which you can
then use and exit.

```
root@shell-demo:/# ls
bin   dev  home  lib64	mnt  proc  run	 srv  tmp  var
boot  etc  lib	 media	opt  root  sbin  sys  usr
root@shell-demo:/# exit
exit
```


#### xargs

The `xargs` arguments are pretty crucial here. `-I %` allows us to use
`%` in our command at any arbitrary point. `%` will get replaced with
the pod name.

If we didn't use `-o`, `kubectl` would error out complaining about not
having a tty.

```shell
-o      Reopen stdin as /dev/tty in the child process 
        before executing the command.  This is useful 
        if you want xargs to run an interactive application.
```

[fzf]: https://github.com/junegunn/fzf
