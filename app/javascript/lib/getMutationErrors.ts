import React from 'react'
import isArray from 'lodash/isArray'
import camelCase from 'lodash/camelCase'
import { FORM_ERROR } from 'final-form'
import { FetchResult } from '@apollo/client'

interface Error {
  key: string | null
  message: string | null
}

interface MutationBody {
  errors: Error[] | null
  [key: string]: unknown
}

interface SubmittedValuesObject {
  [name: string]: unknown
}

type ErrorHash<Obj extends Record<string, unknown>> = {
  [k in keyof Obj | 'FINAL_FORM/form-error']?:
    | string
    | null
    | React.ReactElement
}

function valuesToWhitelist(values: SubmittedValuesObject): string[] {
  return Object.keys(values)
}

export default function getMutationErrors<
  MutationData extends Record<string, any>
>(
  response: FetchResult<MutationData>,
  submittedValues?: Record<string, unknown> | Array<string>
): ErrorHash<MutationBody> | undefined {
  const errorsHash: ErrorHash<MutationBody> = {}
  if (!response.data) {
    const errors: readonly { message: string }[] = response.errors || [
      new Error('Unknown error')
    ]
    errors.forEach((error) => {
      if (errorsHash[FORM_ERROR]) {
        errorsHash[FORM_ERROR] += `. ${error.message}`
      } else {
        errorsHash[FORM_ERROR] = error.message
      }
    })
    return errorsHash
  }
  const data = response.data as { [key: string]: MutationBody | null }
  const key = Object.keys(data)[0]
  const keyData = data[key]
  const mutationData = keyData as MutationBody
  if (!mutationData) return { [FORM_ERROR]: 'Unknown error' }
  if (!mutationData.errors) return undefined
  let whiteList: string[]
  if (isArray(submittedValues)) {
    whiteList = submittedValues as string[]
  } else if (submittedValues) {
    whiteList = valuesToWhitelist(submittedValues as Record<string, unknown>)
  } else {
    whiteList = []
  }
  ;(mutationData.errors || []).forEach((error) => {
    const errorKey = error.key ? camelCase(error.key) : FORM_ERROR
    if (whiteList.includes(errorKey)) {
      errorsHash[errorKey] = error.message
    } else if (errorsHash[FORM_ERROR]) {
      errorsHash[FORM_ERROR] += `. ${error.message}`
    } else {
      errorsHash[FORM_ERROR] = error.message
    }
  })
  return errorsHash
}
