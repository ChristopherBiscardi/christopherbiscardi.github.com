package main

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/ChimeraCoder/anaconda"
	"github.com/aws/aws-lambda-go/events"
	f "github.com/fauna/faunadb-go/faunadb"
	"github.com/honeycombio/libhoney-go"
)

// Devtip matches the JSON output of the gatsby-theme-devtips devtips.json file
type DevTip struct {
	ID     string   `json:"id"`
	Tweet  string   `json:"tweet"`
	Images []string `json:"images"`
}

type FaunaTweetResult struct {
	DevTipID       string `fauna:"devTipId"`
	TweetID        string `fauna:"tweetId"`
	TweetContent   string `fauna:"tweetContent"`
	TweetCreatedAt string `fauna:"tweetCreatedAt"`
	RetweetCount   int    `fauna:"retweetCount"`
	FavoriteCount  int    `fauna:"favoriteCount"`
}

// {
//     "id": "1a9401d4-f558-5321-9459-e26707b8f52f",
//     "tweet": "bat (https://github.com/sharkdp/bat) is a cat replacement that includes syntax highlighting, line numbers, and more.",
//     "images": [
//       "devtip-images/cli-bat-replaces-cat-0"
//     ]
//   },

func GetDevTipsJson() ([]DevTip, error) {
	target := make([]DevTip, 10)

	var myClient = &http.Client{Timeout: 10 * time.Second}
	r, err := myClient.Get("https://christopherbiscardi.com/devtips.json")
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
	for _, imageURL := range tip.Images {
		r, err := myClient.Get("https://christopherbiscardi.com" + imageURL)
		if err != nil {
			return nil, err
		}
		defer r.Body.Close()

		if r.StatusCode == 404 {
			return nil, errors.New("imageURL not found: " + imageURL)
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

// BootstrapTwitterAPI instantiates an anaconda twitter client using
// environment variables. returns an error if can't acces env.
func BootstrapTwitterAPI() (*anaconda.TwitterApi, error) {

	accessToken, ok1 := os.LookupEnv("TWITTER_ACCESS_TOKEN")
	if ok1 == false {
		return nil, fmt.Errorf("TWITTER_ACCESS_TOKEN is not in the environment")
	}
	accessTokenSecret, ok2 := os.LookupEnv("TWITTER_ACCESS_TOKEN_SECRET")
	if ok2 == false {
		return nil, fmt.Errorf("TWITTER_ACCESS_TOKEN_SECRET is not in the environment")
	}
	consumerKey, ok3 := os.LookupEnv("TWITTER_CONSUMER_KEY")
	if ok3 == false {
		return nil, fmt.Errorf("TWITTER_CONSUMER_KEY is not in the environment")
	}
	consumerSecret, ok4 := os.LookupEnv("TWITTER_CONSUMER_SECRET")
	if ok4 == false {
		return nil, fmt.Errorf("TWITTER_CONSUMER_SECRET is not in the environment")
	}

	return anaconda.NewTwitterApiWithCredentials(accessToken, accessTokenSecret, consumerKey, consumerSecret), nil

}

// UploadImages Takes a set of base64 encoded images and uploads them to Twitter
// returning Media objects that can be attached to tweets
func UploadImages(imageUrls []string, api *anaconda.TwitterApi) ([]anaconda.Media, []error) {
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

// HandleRequest yo
func HandleRequest(ev *libhoney.Event) (*events.APIGatewayProxyResponse, error) {
	faunaToken, ok := os.LookupEnv("FAUNA_TOKEN")
	if ok == false {
		ev.AddField("error", fmt.Errorf("FAUNA_TOKEN is not in the environment"))
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to bootstrap fauna",
		}, nil
	}

	client := f.NewFaunaClient(faunaToken)

	var tipsTweetedInLastNDays []string
	results, fErr := client.Query(
		f.Select(
			[]string{"data"},
			f.Map(
				f.Paginate(
					f.Match(f.Index("all_dev-tip-tweets")),
					f.Before(nil),
					f.Size(14),
				),
				f.Lambda("X", f.Select([]string{"data", "devTipId"}, f.Get(f.Var("X")))),
			),
		),
	)
	if fErr != nil {
		ev.AddField("warning", fErr.Error())
		tipsTweetedInLastNDays = []string{}
	} else {
		results.Get(&tipsTweetedInLastNDays)
	}

	tips, err := GetDevTipsJson()
	if err != nil {
		ev.AddField("error", err.Error())
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to get list of dev tips",
		}, nil
	}
	numTips := len(tips)

	// Get a dev tip that hasn't been tweeted in N days
	var tipToTweet *DevTip

	for tipToTweet == nil {
		tipToTweetIndex := rand.Intn(numTips)
		chosenTipWasTweeted := false

		for _, tipID := range tipsTweetedInLastNDays {
			if tipID == tips[tipToTweetIndex].ID {
				chosenTipWasTweeted = true
				break
			}
		}
		if !chosenTipWasTweeted {
			ev.AddField("tip_index_to_tweet", tipToTweetIndex)
			tipToTweet = &tips[tipToTweetIndex]
		}
	}

	ev.Add(map[string]interface{}{
		"num_tips":   numTips,
		"tweet":      tipToTweet.Tweet,
		"num_images": len(tipToTweet.Images),
	})

	images, fetchErr := FetchDevTipImages(*tipToTweet)
	if fetchErr != nil {
		ev.AddField("error", fetchErr.Error())
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to fetch images",
		}, nil
	}

	api, err := BootstrapTwitterAPI()
	if err != nil {
		ev.AddField("error", err.Error())
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to bootstrap",
		}, nil
	}

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

	faunaTweet := FaunaTweetResult{
		DevTipID:       tipToTweet.ID,
		TweetContent:   tipToTweet.Tweet,
		TweetID:        tweet.IdStr,
		TweetCreatedAt: tweet.CreatedAt,
		RetweetCount:   tweet.RetweetCount,
		FavoriteCount:  tweet.FavoriteCount,
	}

	// Class is deprecated, try to use Collection
	_, faunaErr := client.Query(
		f.Create(
			// this gets a collection reference
			f.Class("dev-tip-tweets"),
			// fauna needs things to be keyed on "data".
			// not sure why yet. The struct has tags to
			// work with fauna though, so we're good there.
			f.Obj{"data": faunaTweet},
		),
	)

	if faunaErr != nil {
		ev.AddField("error", faunaErr.Error())
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to save tweet to database",
		}, nil
	}

	ev.AddField("status_code", 200)
	ev.AddField("tweet_id", tweet.IdStr)
	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello, World",
	}, nil
}
