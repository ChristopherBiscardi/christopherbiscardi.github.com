---
title: "Handling Taps on List/Grid Items with ViewPagers (GestureDetector)"
date: 2014-04-09
url: "/2014/4/9/handling-taps-on-listgrid-items-with-viewpagers-gesture/"
---


When placing a ViewPager inside of a GridView recently I ran into the issue of
the ViewPager stealing the GridView Items’ click event. I had lost my click
event, but the ViewPager was still scrolling fine.

With the following GridView:

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <GridView
        android:id="@+id/bar_gridview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:verticalSpacing="0dp"
        android:horizontalSpacing="0dp"
        android:stretchMode="columnWidth"
        android:numColumns="1" />
</FrameLayout>
```

and a grid item view with a ViewPager (reduced for simplicity):

```xml
<com.christopherbiscardi.grid.MyGridItemFrame xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/grid_item_frame"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

    <com.christopherbiscardi.grid.MyViewPager
        android:id="@+id/my_pager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</com.christopherbiscardi.grid.MyGridItemFrame>
```

We can intercept the touch event on MyGridItemFrame, which sits between the
GridView and the ViewPager by extending
`GestureDetector.SimpleOnGestureListener` and overriding
`onInterceptTouchEvent`. In this case all we care about is handling the tap
(`onSingleTapUp`) and we will let the scroll pass through to the ViewPager.

```java
package com.christopherbiscardi.grid;

public class MyGridItemFrame extends FrameLayout {

	final GestureDetector mGestureDetector = new GestureDetector(new MyGestureListener());

	@Override
	public boolean onInterceptTouchEvent(MotionEvent event) {
		return mGestureDetector.onTouchEvent(event);
	}


	class MyGestureListener extends GestureDetector.SimpleOnGestureListener {

		@Override
		public boolean onSingleTapUp(MotionEvent event) {
			Toast.makeText(getContext(), "clicked Grid Item", Toast.LENGTH_SHORT).show();
			return true;
		}
	}
}
```
