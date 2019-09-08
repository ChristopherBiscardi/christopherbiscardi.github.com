package main

import (
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
    fmt.Println("in handler vvv")
	for _, pair := range os.Environ() {
      fmt.Println(pair)
	}
	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello, World",
	}, nil
}

func main() {
    for _, pair := range os.Environ() {
      fmt.Println(pair)
    }
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
