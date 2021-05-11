import React from 'react'

import { Form, Field  } from 'react-final-form'
import FormSubmitError from "components/FormSubmitError"
import TextField from "components/TextField";
import {useApolloClient, gql} from "@apollo/client";
import getMutationErrors from "lib/getMutationErrors";

type FormValues = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const MUTATION = gql`
  mutation UserSignup($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    userSignup(name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
      user {
        id
      }
      errors {
        key
        message
      }
    }
  }
`

type UserSignup = {
  userSignup: {
    user?: {
      id: number
    }
    errors?: {
      key?: string
      message: string
    }
  }
}

export default function SignupForm() {
  const client = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    const response = await client.mutate<
      UserSignup,
      FormValues
      >({
      mutation: MUTATION,
      variables: values
    })
    const errors = getMutationErrors<UserSignup>(response, values)
    if (errors) {
      console.log(errors)
      return errors
    }
    alert(`Success: ${JSON.stringify(response.data.userSignup.user)}`)
  }

  return (
    <Form<FormValues>
      initialValues={{ name: '', email: '', password: '', passwordConfirmation: ''}}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>User Sign Up</h1>
            <label>
              Name:{" "}
              <Field
                name="name"
                component={TextField}
                type="text"
              />
            </label>
            <label>
              Email:{" "}
              <Field
                name="email"
                component={TextField}
                type="email"
              />
            </label>
            <label>
              Password:{" "}
              <Field
                name="password"
                component={TextField}
                type="password"
              />
            </label>
            <label>
              Password Confirmation:{" "}
              <Field
                name="passwordConfirmation"
                component={TextField}
                type="password"
              />
            </label>
            <FormSubmitError />
            <div>
              <button
                disabled={submitting}
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </Form>
  )
}
