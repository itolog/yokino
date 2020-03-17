import ApolloClient, { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  fetch,
  uri: `${process.env.API_ENDPOINT}`,
  cache: new InMemoryCache(),
});

export default client;
