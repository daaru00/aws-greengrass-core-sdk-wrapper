# AWS Greengrass SDK Wrapper for JavaScript

This repository is a collection of NPM packages that replace [AWS Greengrass SDK](https://github.com/aws/aws-greengrass-core-sdk-js) packages with mocked functions and classes.

This allow to test Lambda function's NodeJS code locally with incur an error requiring `aws-greengrass-core-sdk` package.

## Current issue

If you create an `handler.js`, include AWS Greengrass SDK
```js
const ggSdk = require('aws-greengrass-core-sdk')
const iotClient = new ggSdk.IotData()
```
and then you'll try to execute it
```bash
nodejs handler.js
```
an error will be raised
```
Cannot find module 'aws-greengrass-ipc-sdk-js'
```

This because AWS Greengrass SDK try to include core's internal modules that does not existing outside Greengrass environment.

## Install wrapper package

Install this package as a developer dependency in order to not deploy to Greengrass (assuming you are excluding this dependencies before deploy)
```bash
npm install aws-greengrass-ipc-sdk-js --save-dev
```

If this wrapper package will be accidentally deployed to Greengrass core an internal check for `AWS_GREENGRASS_GROUP_NAME` environment variable (present only in Greengrass Lambda function) and will load the origin package 'aws-greengrass-ipc-sdk-js' from core.

## Use it

Now running script mentioned above
```js
const ggSdk = require('aws-greengrass-core-sdk')
const iotClient = new ggSdk.IotData()
```
from your local environment
```bash
nodejs handler.js
```
now Lambda will be executed without error

You can add some logics, for example publishing an event on a topic
```js
iotClient.publish({
  topic: 'my/topic/name',
  payload: JSON.stringify({
    myData: 'test'
  })
}, (err) => {
  if (err !== null) {
    console.error(err)
  }
})
```
and execute it locally
```
Publishing message on topic "my/topic/name" with Payload "{"myData":"test"}}"
```

## Supported methods

`aws-greengrass-core-sdk` module include
```js
const ggSdk = require('aws-greengrass-core-sdk')
```

IotData publish event
```js
const iotClient = new ggSdk.IotData()
iotClient.publish()
```
