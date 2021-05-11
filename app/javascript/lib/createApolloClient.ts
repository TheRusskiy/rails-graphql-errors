import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

export default createApolloClient
