import React from 'react'
import {FieldRenderProps} from 'react-final-form'

function TextField({
                     input,
                     type = 'text',
                     label,
                     meta: {touched, error: syncError, submitError}
                   }: FieldRenderProps<string, HTMLInputElement>) {
  const error = syncError || submitError
  const showError = (touched || submitError) && !!error
  return (
    <div>
      {label && (
        <label htmlFor={input.name}>
          {label}
        </label>
      )}
      <div>
        <input
          id={input.name}
          name={input.name}
          type={type}
          {...input}
        />
      </div>
      {showError && (
        <div>
          <p style={{color: 'red'}}>
            {error}
          </p>
        </div>
      )}
    </div>
  )
}

export default TextField
