import React from 'react'
import { FormSpy } from 'react-final-form'

const FormSubmitError = () => {
  return (
    <FormSpy subscription={{ submitError: true, error: true }}>
      {({ submitError, error }) =>
        (submitError ?? error) ? (
          <div style={{ color: 'red' }}>
            Error: { submitError ?? error }
          </div>
        ) : null
      }
    </FormSpy>
  )
}

export default FormSubmitError
