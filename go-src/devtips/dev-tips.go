package main

import (
	"net/http"
    "time"
	"encoding/json"
)

type DevTip struct {
	Id string `json:id`
	Tweet string `json:tweet`
	Images []string `json:images`
}
// {
//     "id": "1a9401d4-f558-5321-9459-e26707b8f52f",
//     "tweet": "bat (https://github.com/sharkdp/bat) is a cat replacement that includes syntax highlighting, line numbers, and more.",
//     "images": [
//       "dev-tip-images/cli-bat-replaces-cat-0"
//     ]
//   },

func GetDevTipsJson() (error, []DevTip) {
	target := make([]DevTip, 10)

	var myClient = &http.Client{Timeout: 10 * time.Second}
	r, err := myClient.Get("https://christopherbiscardi.com/dev-tips.json")
    if err != nil {
        return err, nil
    }
    defer r.Body.Close()

	decodeErr := json.NewDecoder(r.Body).Decode(&target)

    return decodeErr, target 
}