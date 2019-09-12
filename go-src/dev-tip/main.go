package main

import (
	"encoding/json"
	"fmt"
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
	fmt.Printf("\n\n data: %v ; simpleAuth: %v", data.SimpleAuth, simpleAuth)
	fmt.Println(request.Body)
	if data.SimpleAuth != simpleAuth {
		fmt.Printf("\n\n data: %v ; simpleAuth: %v", data.SimpleAuth, simpleAuth)
		fmt.Println(request.Body)
		return &events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       "hey, how's it going?",
		}, nil
	}

	return HandleRequest(ev)
}

func main() {
	writeKey, _ := os.LookupEnv("HONEYCOMB_WRITE_KEY")
	libhoney.Init(libhoney.Config{
		WriteKey: writeKey,
		Dataset:      "netlify-serverless",
		// Transmission: &transmission.WriterSender{},
	})
	// Flush any pending calls to Honeycomb before exiting
	defer libhoney.Close()
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
