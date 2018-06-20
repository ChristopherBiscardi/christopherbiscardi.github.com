---
title: Building a Golang CLI
date: 2018-02-19T05:45:49.855Z
tags:
  - go
  - cli
---
go is a nice language for a lot of things and there happens to be a very nice
lib for builing CLI tools. Combined with static builds this makes it a very
attractive tool for building and distributing binaries.

# Bootstrapping a Project

First, since go expects a certain environment to operate in we'll set up a new
`GOPATH` in a new project directory.

```sh
mkdir go
cd go
export GOPATH=`pwd`
go get -u github.com/spf13/cobra/cobra
```

Then use cobra to init a new CLI app namespaced under
`github.com/<username>/<project-name>`.

```sh
> ./bin/cobra init github.com/christopherbiscardi/a-go-cli
Your Cobra application is ready at ./src/github.com/christopherbiscardi/a-go-cli.

Give it a try by going there and running `go run main.go`.
Add commands to it by running `cobra add [cmdname]`.
```

# The Scaffolding

This leaves us with a nice scaffolding to play with. The layout of the
filesystem can be checked with `tree` (`brew install tree` on osx).

```sh
> tree .
.
├── LICENSE
├── cmd
│   └── root.go
└── main.go

1 directory, 3 files
```

`main.go`:

```go
// main.go
package main

import "github.com/christopherbiscardi/a-go-cli/cmd"

func main() {
	cmd.Execute()
}
```

and a `cmd` directory that has a single command (the root command of our CLI).

```go
// cmd/root.go
package cmd

import (
	"fmt"
	"os"

	homedir "github.com/mitchellh/go-homedir"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var cfgFile string

// RootCmd represents the base command when called without any subcommands
var RootCmd = &cobra.Command{
	Use:   "a-go-cli",
	Short: "A brief description of your application",
	Long: `A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	//	Run: func(cmd *cobra.Command, args []string) { },
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := RootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.
	RootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.a-go-cli.yaml)")

	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	RootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		// Find home directory.
		home, err := homedir.Dir()
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		// Search config in home directory with name ".a-go-cli" (without extension).
		viper.AddConfigPath(home)
		viper.SetConfigName(".a-go-cli")
	}

	viper.AutomaticEnv() // read in environment variables that match

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		fmt.Println("Using config file:", viper.ConfigFileUsed())
	}
}
```

One interesting aspect of the cobra scaffolding is that it comes with
[viper][viper] for configuration management and the ability to easily scaffold
out new commands.

> Viper is a complete configuration solution for Go applications including
> 12-Factor apps. It is designed to work within an application, and can handle
> all types of configuration needs and formats.

[cobra]: https://github.com/spf13/cobra
[pq]: https://github.com/lib/pq
[sqlx]: https://github.com/jmoiron/sqlx
[survey]: https://github.com/AlecAivazis/survey
[viper]: https://github.com/spf13/viper
