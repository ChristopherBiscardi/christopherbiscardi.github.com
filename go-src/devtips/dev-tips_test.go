package main 

import (
	"testing"
	"fmt"
)
func TestGetTips(t *testing.T) {
	err, test := GetDevTipsJson()
	if err != nil {
		t.Error("http req failed", err)
	}
	fmt.Println(test)
	
}