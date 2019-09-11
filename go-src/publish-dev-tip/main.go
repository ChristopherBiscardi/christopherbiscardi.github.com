package main

import (
	"encoding/json"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/honeycombio/libhoney-go"
	"github.com/honeycombio/libhoney-go/transmission"
)

type BodyStuff struct {
	SimpleAuth string `json:"simpleAuth"`
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

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
	// if request.HTTPMethod == "GET" {
	// 	return &events.APIGatewayProxyResponse{
	// 		StatusCode: 404,
	// 		Body:       "hey, how's it going?",
	// 	}, nil
	// }

	data := BodyStuff{}
	decodeErr := json.Unmarshal([]byte(request.Body), &data)

	if decodeErr != nil {
		ev.AddField("error", decodeErr.Error())
		return &events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       "failed to send auth",
		}, nil
	}
	simpleAuth, _ := os.LookupEnv("SIMPLE_AUTH")
	if data.SimpleAuth != simpleAuth {
		return &events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       "hey, how's it going?",
		}, nil
	}

	return HandleRequest(ev)
}

func main() {
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
