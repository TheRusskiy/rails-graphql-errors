import React, { useMemo } from 'react'
import SignupForm from 'containers/SignupForm'
import { ApolloProvider } from '@apollo/client'
import createApolloClient from 'lib/createApolloClient'

export default function SignupApp() {
  const client = useMemo(() => createApolloClient(), [])
  return (
    <ApolloProvider client={client}>
      <SignupForm />
    </ApolloProvider>
  )
}
