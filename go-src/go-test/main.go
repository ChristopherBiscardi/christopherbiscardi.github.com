package main

import (
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/honeycombio/libhoney-go"
	"github.com/spf13/viper"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	fmt.Println("in handler vvv")
	simpleAuth := viper.GetString("SIMPLE_AUTH")
	fmt.Println("simpleAuth: " + simpleAuth)

	for _, pair := range os.Environ() {
		fmt.Println(pair)
	}
	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello, World",
	}, nil
}

func main() {
	viper.SetEnvPrefix("cb") // will be uppercased automatically
	viper.BindEnv("SIMPLE_AUTH")

	libhoney.Init(libhoney.Config{
		// WriteKey: "",
		Dataset: "netlify-lambdas",
		// Transmission: &transmission.WriterSender{},
	})
	// Flush any pending calls to Honeycomb before exiting
	defer libhoney.Close()
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
