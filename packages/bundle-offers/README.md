## Description

Built on top of the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

Populate an env file based on the example provided in the [.env.template]('./.env.template'). Run the app with staging credentials in watch mode.

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Background

The main app module for the prototype is a wrapper around a Kafka client subscriber. A subscriber implementation is decorated with the [topic decorator](./src/subscriber/topic.decorator.ts) to process events received on a given topic. 

The current official (experimental) support for the Kafka transport in Nest microservices assumes the use of a message pattern, while we just need a consumer and to talk to other APIs and services and categorically don't want to create a reply topic or maintain a producer in this case.

## Test

Tests are in progress: out of the box it's configured to run with coverage and unit tests.


## Credit

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
