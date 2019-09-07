package main 

import (
	"testing"
	// "fmt"

	"github.com/honeycombio/libhoney-go"
	"github.com/honeycombio/libhoney-go/transmission"
)
func TestGetTips(t *testing.T) {
	test, err := GetDevTipsJson()
	if err != nil {
		t.Error("http req failed", err)
	}
	fmt.Println(test)
	
}

func TestGetTipImages(t *testing.T) {
	test, err := FetchDevTipImages(DevTip{
		Id: "nothing",
		Tweet: "some tweet",
		Images: []string{"/dev-tip-images/cli-bat-replaces-cat-0.png"},
	})
	if err != nil {
		t.Error("http req failed", err)
	}
	fmt.Println(len(test))
	
}

func TestHandleRequest(t *testing.T) {

	libhoney.Init(libhoney.Config{
		// WriteKey: "",
		Dataset:      "netlify-lambdas",
		Transmission: &transmission.WriterSender{},
	})
	// Flush any pending calls to Honeycomb before exiting
	defer libhoney.Close()


	ev := libhoney.NewEvent()
	// This event will be sent regardless of how we exit
	defer ev.Send()

	_, err := HandleRequest(ev)
	if err != nil {
		t.Error(err)
	}
}