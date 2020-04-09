import ApolloClient, { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  fetch,
  uri: 'https://yokino-api.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export default client;
