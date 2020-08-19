# The essence of checkouts

This is prototyping a few concepts:

- checkout formalized as a state machine
- actually using xstate/react to manage the state
- _not_ using xstate/react to manage the state
- drop-in REST and GraphQL APIs for Cart management

## Notes

As a fun side-project, one of the included checkouts implements a fictional "anti-patterns" design library called "brutalism".

This is in opposition to the Grover checkout, which is beautiful and very heavily animated, but has trouble with state management. The brutalist checkout instead handles data perfectly, but has a visually horrible user interface.

## Development setup

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More
