import '../styles/globals.css';

import { useApollo } from '../flow/api/graphql/client';

function MyApp({ Component, pageProps }) {
  const { withGraphql } = pageProps;
  if (!withGraphql) return <Component {...pageProps} />;
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
