package main 

import (
	"testing"
	"fmt"

	// "github.com/honeycombio/libhoney-go"
	// "github.com/honeycombio/libhoney-go/transmission"
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

func TestGetTipImages(t *testing.T) {

	
}

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

// 	_, err := HandleRequest(ev)
// 	if err != nil {
// 		t.Error(err)
// 	}
// }