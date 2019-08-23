package main

import (
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/honeycombio/libhoney-go"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	log.Println("handler")
	// Create an event, add some data
	ev := libhoney.NewEvent()
	ev.Add(map[string]interface{}{
		"method":       request.HTTPMethod,
		"hostname":     request.Resource,
		"request_path": request.Path,
	})

	// This event will be sent regardless of how we exit
	defer ev.Send()

	ev.AddField("status_code", 200)
	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello, World",
	}, nil
}

func main() {
	log.Println("init")
	libhoney.Init(libhoney.Config{
		// WriteKey: "",
		// Dataset:  "",
	})
	// Flush any pending calls to Honeycomb before exiting
	defer libhoney.Close()
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
