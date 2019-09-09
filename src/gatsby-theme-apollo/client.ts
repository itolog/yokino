import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  fetch,
  uri: 'https://yokino-api.herokuapp.com/graphql/',
});

export default client;
