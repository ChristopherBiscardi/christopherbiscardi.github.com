---
title: "Android RoboSpice with GoogleHttpClient"
date: 2014-01-27
url: "/2014/1/27/android-robospice-with-googlehttpclient/"
---

In this post we will examine an example app in which we make a RoboSpice request
using GoogleHttpClient.

The github repo is
[here](https://github.com/ChristopherBiscardi/robospice-googlehttpclient-example).


## Dependencies

First, we need to grab the RoboSpice dependency JARs from the `repository` repo.

```bash
git clone https://github.com/octo-online/robospice/tree/repository
```

Inside of
[1.4.11/robospice-google-http-client](https://github.com/octo-online/robospice/tree/repository/dependencies/1.4.11/robospice-google-http-client)
are the JARs we need to include in the project. If you are using Eclipse copy
the JARs into your `libs/` folder and add them to the build path in `Project ->
Properties -> Libraries` by clicking `Add JARs`. You may also need to click the
`Order and Export` tab, check their boxes and move the included JARs to the top.

We will also need one JAR from the Google-Http-Lib
[source](https://code.google.com/p/google-http-java-client/wiki/Setup#Download_Library_with_Dependencies).
It is `google-http-client-1.17.0`. Again, if using Eclipse, add it to your
project in the same way.

## Classes

We are going to create a few files:

- [BaseSpiceActivity.java](#spice-base)
- [Reddit*.java](#spice-reddit)
- [SpiceRequestReddit.java](#spice-request-reddit)

#### BaseSpiceActivity

```java
import com.octo.android.robospice.JacksonGoogleHttpClientSpiceService;
import com.octo.android.robospice.SpiceManager;

public class BaseSpiceActivity extends Activity {
	private SpiceManager spiceManager = new SpiceManager(JacksonGoogleHttpClientSpiceService.class);

	@Override
	protected void onStart() {
		spiceManager.start(this);
		super.onStart();
	}

	@Override
	protected void onStop() {
		spiceManager.shouldStop();
		super.onStop();
	}

	protected SpiceManager getSpiceManager() {
		return spiceManager;
	}

}
```

The big thing we’re doing in this file is creating an instance of `SpiceManager`
that will be accessible in the activities that inherit from this base class
(like our `MainActivity.java` will).

We then start `spiceManager` in `onStart()` and stop it in `onStop`. This will
ensure that our activities have a `SpiceManager` accessible when they start and
clean up after themselves when they stop.

The final piece is a getter function (`getSpiceManager()`) so that we have easy
access to the `spiceManager` in our activities.

#### Reddit*.java

We will be getting our data from Reddit, so we first need to examine the
responses we’re going to get. I’ve chosen a subreddit where all the posts are
very similar (/r/Riak). Here is a sample API response:

```javascript
{
   "kind":"Listing",
   "data":{
      "modhash":"3mxugaulcd1f8b500be09",
      "children":[
         {
            "kind":"t3",
            "data":{
               "domain":"github.com",
               "banned_by":null,
               "media_embed":{

               },
               "subreddit":"Riak",
               "selftext_html":null,
               "selftext":"",
               "likes":null,
               "secure_media":null,
               "link_flair_text":null,
               "id":"19v60r",
               "secure_media_embed":{

               },
               "clicked":false,
               "stickied":false,
               "author":"BonzoESC",
               "media":null,
               "score":1,
               "approved_by":null,
               "over_18":false,
               "hidden":false,
               "thumbnail":"",
               "subreddit_id":"t5_2s3vw",
               "edited":false,
               "link_flair_css_class":null,
               "author_flair_css_class":null,
               "downs":0,
               "saved":false,
               "is_self":false,
               "permalink":"/r/Riak..riak/",
               "name":"t3_19v60r",
               "created":1362687827.0,
               "url":"https://github.com/basho/riak_dt",
               "author_flair_text":null,
               "title":"riak_dt: CRDT for Riak",
               "created_utc":1362687827.0,
               "ups":1,
               "num_comments":0,
               "visited":false,
               "num_reports":null,
               "distinguished":null
            }
         }
      ],
      "after":null,
      "before":null
   }
}
```

We will create a few classes to model the data. The first being `Reddit.java`.

In `Reddit.java` we include the keys `kind` and `data` using `@Key`
declarations. Then we declare their types.

```java
package com.christopherbiscardi.robospicetest;

import com.google.api.client.util.Key;

public class Reddit {
	@Key
	private String kind;
	@Key
	private RedditData data;

	public Reddit() {
	}
```

Then define some basic getters for when we are dealing with our request’s
response.

```java
  public String getKind() {
		return this.kind;
	}

	public RedditData getData() {
		return this.data;
	}
```

and override some utility functions:

```java
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ( kind == null ? 0 : kind.hashCode() ) + ( data == null ? 0 : data.hashCode() );
		return result;
	}

	@Override
	public boolean equals( Object obj ) {
		if ( this == obj ) {
			return true;
		}
		if ( obj == null ) {
			return false;
		}
		if ( getClass() != obj.getClass() ) {
			return false;
		}
		Reddit other = (Reddit) obj;
		if ( kind == null ) {
			if ( other.kind != null ) {
				return false;
			}
		} else if ( !kind.equals( other.kind ) ) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "Reddit [kind=" + kind + " " + data + "]";
	}
}
```

The model files will all follow this same format: @Key definitions, getters,
utilities.

Our final model (`RedditListing.java`) is where we are getting the content we
care about. We don’t have to include `@Key` for every key in our JSON response,
so we’ll just grab the ones we care about:

```java
	@Key
	private String domain;
    @Key
	private String author;
    @Key
	private String permalink;
    @Key
	private String title;
```

#### SpiceRequestReddit.java

To finish off our classes, we’ll create a SpiceRequest that takes a string (our
subreddit) and returns a `Reddit`.

```java
package com.christopherbiscardi.robospicetest;

import java.io.IOException;

import roboguice.util.temp.Ln;

import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.json.jackson.JacksonFactory;
import com.octo.android.robospice.request.googlehttpclient.GoogleHttpClientSpiceRequest;

public class SpiceRequestReddit extends GoogleHttpClientSpiceRequest<reddit> {
	private String baseUrl;

    public SpiceRequestReddit( String subreddit ) {
        super( Reddit.class );
        this.baseUrl = String.format( "http://www.reddit.com/r/%s.json", subreddit );
    }

    @Override
    public Reddit loadDataFromNetwork() throws IOException {
        Ln.d( "Call web service " + baseUrl );
        HttpRequest request = getHttpRequestFactory()//
                .buildGetRequest( new GenericUrl( baseUrl ) );
        request.setParser( new JacksonFactory().createJsonObjectParser() );
        return request.execute().parseAs( getResultType() );
    }
}</reddit>
```


## Calling the API

In `MainActivity.java` we need to add some code to execute the request:

We need to extend our `MainActivity` from `BaseSpiceActivity`

```java
public class MainActivity extends BaseSpiceActivity {
```

Add a new `SpiceRequestReddit`

```
java
private SpiceRequestReddit spiceRequestReddit;
```

Instantiate it with the Riak subreddit;

```java
spiceRequestReddit = new SpiceRequestReddit( "Riak" );
```

and implement our ResultHandler class:

```java
public final class RedditSpiceRequestListener implements RequestListener {

		@Override
		public void onRequestFailure( SpiceException spiceException ) {
			Toast.makeText( MainActivity.this, "failure", Toast.LENGTH_SHORT ).show();
		}

		@Override
		public void onRequestSuccess( final Reddit result ) {
			Toast.makeText( MainActivity.this, "success", Toast.LENGTH_SHORT ).show();
			Log.e("TEST",result.getData().toString());
			Log.e("TEST",result.getData().getChildren().get(0).getData().getTitle());
		}
	}
```

We’ve just implemented a simple log to view the data, but we could have added it
to an ArrayAdapter and displayed it in a ListView.

Finally, we override the `onStart()` method to actually make the request.

```java
  @Override
	protected void onStart() {
		super.onStart();

		setProgressBarIndeterminate( false );
		setProgressBarVisibility( true );

		getSpiceManager().execute( spiceRequestReddit, "json", DurationInMillis.ONE_MINUTE, new RedditSpiceRequestListener() );
	}
```


## AndroidManifest.xml

Now that’s all the code we need to write, but we still need to register our
service and permissions in `AndroidManifest.xml`. Notice we’ve added three
`uses-permission` nodes and a `service` node.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.christopherbiscardi.robospicetest"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk
        android:minSdkVersion="8"
        android:targetSdkVersion="17" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name="com.christopherbiscardi.robospicetest.MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name="com.octo.android.robospice.JacksonGoogleHttpClientSpiceService"
            android:exported="false" />
    </application>

</manifest>
```

## Fin

Now we can run the app and see the result (success or failure) pop up as a Toast
as well as viewing the actual data in LogCat.

Check out the github repository
[here](https://github.com/ChristopherBiscardi/robospice-googlehttpclient-example)
