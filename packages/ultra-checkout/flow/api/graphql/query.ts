import { initializeApollo } from './client';
import { DocumentNode } from '@apollo/client';
interface QueryParams {
  query?: DocumentNode;
  variables?: any;
}

const apolloClient = initializeApollo();

export const query = async ({ query, variables }: QueryParams) => {
  try {
    const res = await apolloClient.mutate({ mutation: query, variables });
    return res;
  } catch (e) {
    console.error(e);
  }
};
