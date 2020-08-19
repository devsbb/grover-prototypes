import { initializeApollo } from './client';
import { DocumentNode } from '@apollo/client';
interface QueryParams {
  query?: DocumentNode;
  variables?: any;
}

const apolloClient = initializeApollo();

export const query = async ({ query, variables }: QueryParams) => {
  const res = await apolloClient.query({ query, variables });
  console.log(res);
  return res;
};
