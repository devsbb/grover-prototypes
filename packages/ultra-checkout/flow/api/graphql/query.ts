import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

interface QueryParams {
  query?: object;
  variables?: string;
}

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://mix-cart-staging.grover.com/graphql'
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({}),
  });
}
export const query = async ({ query, variables }: QueryParams) => {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return res.json();
};
