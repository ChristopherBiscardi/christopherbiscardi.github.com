package main

import (
	"math/rand"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/honeycombio/libhoney-go"
	"github.com/honeycombio/libhoney-go/transmission"
	"github.com/spf13/viper"
	"github.com/ChimeraCoder/anaconda"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	if request.HTTPMethod == "GET" {
		return &events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       "hey, how's it going?",
		}, nil
	}
	simpleAuth := viper.GetString("simple_auth")
	if request.Headers["X-Simple-Auth"] != simpleAuth {
		return &events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       "hey, how's it going?",
		}, nil
	}
	// Create an event, add some data
	ev := libhoney.NewEvent()
	ev.Add(map[string]interface{}{
		"method":       request.HTTPMethod,
		"request_id":   request.RequestContext.RequestID,
		"request_path": request.Path,
		"name":         "devtips",
	})

	// This event will be sent regardless of how we exit
	defer ev.Send()
	
	err, tips := GetDevTipsJson()
	if err != nil {
		ev.AddField("error", err)
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

	api := anaconda.NewTwitterApiWithCredentials(viper.GetString("TWITTER_ACCESS_TOKEN"), viper.GetString("TWITTER_ACCESS_TOKEN_SECRET"), viper.GetString("TWITTER_CONSUMER_KEY"), viper.GetString("TWITTER_CONSUMER_SECRET"))
    fmt.Println(api)

    err, images := FetchDevTipImages(tipToTweet)
    if err != nil {
		ev.AddField("error", err)
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to fetch images",
		}, nil
	}

    medias := []anaconda.Media{}
    for _, b64Image := range images {
	    media, err := api.UploadMedia(b64Image)
	    if err != nil {
			ev.AddField("error", err)
			return &events.APIGatewayProxyResponse{
				StatusCode: 500,
				Body:       "Failed to upload images",
			}, nil
	    }
	    medias = append(medias, media)
    }

	ev.AddField("status_code", 200)
	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello, World",
	}, nil
}

func main() {
	viper.SetEnvPrefix("cb") // will be uppercased automatically
	viper.BindEnv("SIMPLE_AUTH")
	viper.BindEnv("TWITTER_ACCESS_TOKEN")
	viper.BindEnv("TWITTER_ACCESS_TOKEN_SECRET")
	viper.BindEnv("TWITTER_CONSUMER_KEY")
	viper.BindEnv("TWITTER_CONSUMER_SECRET")

	libhoney.Init(libhoney.Config{
		// WriteKey: "",
		Dataset:      "netlify-lambdas",
		Transmission: &transmission.WriterSender{},
	})
	// Flush any pending calls to Honeycomb before exiting
	defer libhoney.Close()
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
