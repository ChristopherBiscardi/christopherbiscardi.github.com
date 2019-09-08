package main

import (
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/honeycombio/libhoney-go"
	"github.com/honeycombio/libhoney-go/transmission"
	"github.com/spf13/viper"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
    fmt.Println("in handler vvv")
	for _, pair := range os.Environ() {
      fmt.Println(pair)
    }
	if request.HTTPMethod == "GET" {
		return &events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       "hey, how's it going?",
		}, nil
	}

	simpleAuth := viper.GetString("SIMPLE_AUTH")
	fmt.Println("simpleAuth: " + simpleAuth)

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

	return HandleRequest(ev)
}

func main() {
    for _, pair := range os.Environ() {
      fmt.Println(pair)
    }
	viper.SetEnvPrefix("cb") // will be uppercased automatically
	viper.BindEnv("SIMPLE_AUTH")

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
