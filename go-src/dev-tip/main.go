package main

import (
	"encoding/json"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/honeycombio/libhoney-go"
	// "github.com/honeycombio/libhoney-go/transmission"
)

type BodyStuff struct {
	SimpleAuth string `json:"simpleAuth"`
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	// This event will be sent regardless of how we exit
	defer libhoney.Flush()
	startTime := time.Now()

	// Create an event, add some data
	ev := libhoney.NewEvent()
	ev.Add(map[string]interface{}{
		"method":       request.HTTPMethod,
		"request_id":   request.RequestContext.RequestID,
		"request_path": request.Path,
		"name":         "devtips",
	})

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

	response, err := HandleRequest(ev)

	ev.Add(map[string]interface{}{
		"duration_ms": time.Since(startTime),
	})

	ev.Send()
	return response, err
}

func main() {
	writeKey, _ := os.LookupEnv("HONEYCOMB_WRITE_KEY")
	libhoney.Init(libhoney.Config{
		WriteKey: writeKey,
		Dataset:  "netlify-serverless",
		// Transmission: &transmission.WriterSender{},
	})
	// Flush any pending calls to Honeycomb before exiting
	defer libhoney.Close()
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
