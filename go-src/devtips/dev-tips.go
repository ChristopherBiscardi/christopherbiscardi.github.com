package main

import (
	"math/rand"
	"strings"
	"net/url"
	"fmt"
	"io/ioutil"
	"net/http"
    "time"
	"encoding/json"
    "encoding/base64"
    "errors"

	"github.com/aws/aws-lambda-go/events"
	"github.com/honeycombio/libhoney-go"
	"github.com/spf13/viper"
	"github.com/ChimeraCoder/anaconda"
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

func GetDevTipsJson() ([]DevTip, error) {
	target := make([]DevTip, 10)

	var myClient = &http.Client{Timeout: 10 * time.Second}
	r, err := myClient.Get("https://christopherbiscardi.com/dev-tips.json")
    if err != nil {
        return nil, err
    }
    defer r.Body.Close()

	decodeErr := json.NewDecoder(r.Body).Decode(&target)

    return target, decodeErr
}

func FetchDevTipImages(tip DevTip) ([]string, error) {
	var myClient = &http.Client{Timeout: 10 * time.Second}

    images := []string{}
    for _, imageUrl := range tip.Images {
		r, err := myClient.Get("https://christopherbiscardi.com" + imageUrl)
	    if err != nil {
	        return nil, err
	    }
	    defer r.Body.Close()

	    if r.StatusCode == 404 {
	    	return nil, errors.New("imageUrl not found: " + imageUrl)
	    }

	    buf, ioErr := ioutil.ReadAll(r.Body)
	    if ioErr != nil {
	        return nil, ioErr
	    }
        // newerr := ioutil.WriteFile("/tmp/run", buf, 0644)
        // if newerr != nil {

        // }
	    b64Image := base64.StdEncoding.EncodeToString(buf)
	    images = append(images, b64Image)
    }

    return images, nil
}

func BootstrapTwitterApi() *anaconda.TwitterApi {

	for _, env := range []string{
		"TWITTER_ACCESS_TOKEN",
		"TWITTER_ACCESS_TOKEN_SECRET",
		"TWITTER_CONSUMER_KEY",
		"TWITTER_CONSUMER_SECRET",
	}{
		viper.BindEnv(env)
		isSet := viper.IsSet(env)
		if isSet == false {
			panic(fmt.Sprintf("%v is not set", env))
		}

	}

	access_token := viper.GetString("TWITTER_ACCESS_TOKEN")
	access_token_secret := viper.GetString("TWITTER_ACCESS_TOKEN_SECRET")
	consumer_key := viper.GetString("TWITTER_CONSUMER_KEY")
	consumer_secret := viper.GetString("TWITTER_CONSUMER_SECRET")

	return anaconda.NewTwitterApiWithCredentials(access_token, access_token_secret, consumer_key, consumer_secret)

}

func UploadImages(imageUrls []string, api *anaconda.TwitterApi) ([]anaconda.Media, []error){
    medias := []anaconda.Media{}
    errors := []error{}
    for _, b64Image := range imageUrls {
	    media, err := api.UploadMedia(b64Image)
	    if err != nil {
			errors = append(errors, err)
	    } else {
		    medias = append(medias, media)
	    }
    }
    return medias, errors
}

func HandleRequest(ev *libhoney.Event) (*events.APIGatewayProxyResponse, error) {

	tips, err := GetDevTipsJson()
	if err != nil {
		ev.AddField("error", err.Error())
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to get list of dev tips",
		}, nil
	}
	numTips := len(tips)
	tipToTweetIndex := rand.Intn(numTips)
	tipToTweet := tips[tipToTweetIndex]

	ev.Add(map[string]interface{}{
		"num_tips":       numTips,
		"tip_index_to_tweet":   tipToTweetIndex,
		"tweet": tipToTweet.Tweet,
		"num_images":         len(tipToTweet.Images),
	})

	images, fetchErr := FetchDevTipImages(tipToTweet)
    if err != nil {
		ev.AddField("error", fetchErr.Error())
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to fetch images",
		}, nil
	}

    api := BootstrapTwitterApi()

    medias, mediaErrs := UploadImages(images, api)
    if len(mediaErrs) > 0 {
    	errorStrings := []string{}

    	for _, theErr := range mediaErrs {
    		errorStrings = append(errorStrings, theErr.Error())
    	}

		ev.AddField("error", strings.Join(errorStrings, "\n\n"))
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to upload images",
		}, nil
    }

    mediaIds := []string{}
    for _, media := range medias {
    	mediaIds = append(mediaIds, media.MediaIDString)
    }

    commaSeparatedIds := strings.Join(mediaIds, ",")
    tweet, err := api.PostTweet(tipToTweet.Tweet, url.Values{
    	"media_ids": []string{commaSeparatedIds},
    })
    if err != nil {
		ev.AddField("error", err.Error())
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to send tweet",
		}, nil
	}

	ev.AddField("status_code", 200)
	ev.AddField("tweet_id", tweet.IdStr)
	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello, World",
	}, nil
}