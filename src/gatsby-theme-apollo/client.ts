import ApolloClient, { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  fetch,
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default client;
