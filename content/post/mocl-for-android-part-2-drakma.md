---
title: "MOCL for Android Part 2: Drakma"
date: 2014-01-16
url: "/2014/1/16/mocl-for-android-part-2-drakma/"
---


In this post we will enable Drakma HTTP support in the Android/MOCL example
code. I have forked the repo [on
Github](https://github.com/ChristopherBiscardi/mocl-example-lisp-contacts-android)
for posterity. The first post is
[here](http://www.christopherbiscardi.com/2014/01/10/common-lisp-on-android-running-the-mocl-android-example/)
and it will get you set up with the Android/MOCL example without Drakma.

First we must download dependencies.

[Drakma](http://weitz.de/drakma/#install)
[USocket](http://common-lisp.net/projects/usocket/releases/)
[Flexi-Streams](http://weitz.de/flexi-streams/)
[Chunga](http://weitz.de/chunga/)
[CL-BASE64](http://www.cliki.net/cl-base64)
[Puri](http://www.cliki.net/puri)

My libs are located in mocl/systems. So I that’s where I place the folders of
code, then link the .asd files. The instructions may change slightly with
different versions of libs.

```bash
cd mocl/systems
ln -s drakma-1.3.7/drakma.asd drakma.asd
ln -s usocket-0.6.1/usocket.asd usocket.asd
git clone https://github.com/edicl/cl-ppcre.git
ln -s cl-ppcre/cl-ppcre.asd cl-ppcre.asd
```

Note that `cl-ppcre-unicode.asd` also exists. Also of note is the version of
`trivial-gray-streams` in use here. As of this writing the current version is
causing issues and the version presented below should be used.

```bash
ln -s flexi-streams-1.0.12/flexi-streams.asd flexi-streams.asd
git clone https://git.gitorious.org/trivial-gray-streams/wukix-trivial-gray-streams.git
ln -s wukix-trivial-gray-streams/trivial-gray-streams.asd trivial-gray-streams.asd
ln -s chunga-1.1.5/chunga.asd chunga.asd
ln -s cl-base64-3.3.3/cl-base64.asd cl-base64.asd
ln -s puri-1.5.5/puri.asd puri.asd
```

So after doing the linking dance we can uncomment the Drakma code in app.lisp (5
lines):

```lisp
(pushnew :drakma-no-ssl *features*)
   (require :drakma)
```

```lisp
(declaim (call-in net-test))
(defun net-test ()
  (print (drakma:http-request "http://wukix.com")))
```

but we have to change out `http://wukix.com` because as of this writing wukix
has changed their site to redirect to https, and drakma can’t use ssl yet. In my
case I changed it to `http://www.cliki.net/` because it currently accepts over
http.

and add `net_test` to our `MainActivity.java`. In this case we just log out the
result

```java
CL.cl_init();
try {
    String dataDir = getDataDir();
    CL.set_temp_dir(dataDir);
    CL.set_doc_dir(dataDir);
    CL.set_font_path(getAssetPath("DejaVuSans.ttf"));
    CL.load_contacts();
} catch (Exception e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}

Log.e("CL",CL.net_test());
```

and run:

```bash
cd mocl-example-lisp-contacts-android
mocl --android LispContacts app.lisp
cd LispContacts/jni
ndk-build
```

Then simply debug the project in ADK and watch the logcat output. The result
should show up as an error, since we used `Log.e("","")`, with a tag of CL.

[![CBLogo_2014_transparent](http://res.cloudinary.com/diqzbm8lz/image/upload/h_300,w_300/v1428611521/CBLogo_2014_transparent_swcmig.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611521/CBLogo_2014_transparent_swcmig.png)
