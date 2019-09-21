package main

import (
	"fmt"
	// "os"
	"testing"
	// "fmt"
	// "github.com/honeycombio/libhoney-go"
	// "github.com/honeycombio/libhoney-go/transmission"
	// f "github.com/fauna/faunadb-go/faunadb"
)

func TestGetTips(t *testing.T) {
	test, err := GetDevTipsJson()
	if err != nil {
		t.Error("http req failed", err)
	}

	images, imageErr := FetchDevTipImages(test[1])
	if imageErr != nil {
		t.Error("http req failed", imageErr)
	}
	fmt.Println(images)
}

// func TestGetTipImages(t *testing.T) {

// }

// func TestHandleRequest(t *testing.T) {

// 	libhoney.Init(libhoney.Config{
// 		// WriteKey: "",
// 		Dataset:      "netlify-lambdas",
// 		Transmission: &transmission.WriterSender{},
// 	})
// 	// Flush any pending calls to Honeycomb before exiting
// 	defer libhoney.Close()

// 	ev := libhoney.NewEvent()
// 	// This event will be sent regardless of how we exit
// 	defer ev.Send()

// 	res, err := HandleRequest(ev)
// 	if err != nil {
// 		t.Error(err)
// 	}
// 	fmt.Println(err)
// 	fmt.Println(res)
// }

// func TestFauna(t *testing.T) {
// 	// get collection reference
// 	// use Create to create document
// 	faunaTweet := FaunaTweetResult{
// 		DevTipID:       "somethingtip",
// 		TweetID:        "some tweet id",
// 		TweetContent:   "some tweet",
// 		TweetCreatedAt: "a date",
// 		RetweetCount:   0,
// 		FavoriteCount:  0,
// 	}
// 	faunaToken, _ := os.LookupEnv("FAUNA_TOKEN")
// 	client := f.NewFaunaClient(faunaToken)

// 	newTweetRecord, faunaErr := client.Query(
// 		f.Create(
// 			f.Class("dev-tip-tweets"),
// 			f.Obj{"data": faunaTweet},
// 		)
// 	)
// 	fmt.Println(faunaErr)
// 	fmt.Println(newTweetRecord)

// }
