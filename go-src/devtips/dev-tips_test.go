package main 

import (
	"testing"
	"fmt"
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
		Images: []string{"/dev-tip-images/cli-bat-replaces-cat-0/png"},
	})
	if err != nil {
		t.Error("http req failed", err)
	}
	fmt.Println(test)
	
}