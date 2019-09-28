import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  fetch,
  uri: `${process.env.API_ENDPOINT}`,
});

export default client;
