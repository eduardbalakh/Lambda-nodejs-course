# Simple data-driven architecture on the AWS basis

This application uses Lambda, SQS, SES, Kinesis.

## Set the environment

Installing serverless:

```bash
npm install -g serverless
```

Initializing serverless:

```bash
serverless config credentials --provider aws --key [ACCESS_KEY] --secret [SECRET_KEY]
```

```bash
serverless create --template aws-nodejs --name [PROJECT_NAME]
```

All templates are available on [Serverless web site](https://www.serverless.com/framework/docs/providers/aws/cli-reference/create#available-templates)

```bash
npm init -y
```

if necessary serverless-pseudo-parameters plugin can be installed:

```bash
npm install serverless-pseudo-parameters --save
```

## Deploying application

```bash
sls deploy
```

## Get application logs

```bash
sls logs -f [LAMBDA_SERVICE_NAME]
```

## Remove application

```bash
sls remove
```

