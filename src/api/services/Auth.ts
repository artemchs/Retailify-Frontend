import { useMutation } from '@tanstack/react-query'
import client from '../client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { accessToken } from '@/utils/accessToken'
import { OnSuccess, SetErrorMessage } from './types'

type SignUpBody = {
  fullName: string
  email: string
  password: string
}

type LogInBody = {
  email: string
  password: string
}

export default {
  useSignUp: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
  }) =>
    useMutation({
      mutationKey: ['sign-up'],
      mutationFn: async (data: SignUpBody) => {
        return await client.post('/auth/sign-up', data)
      },
      onSuccess: ({ data }: { data: { accessToken: string } }) => {
        accessToken.update(data.accessToken)
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useLogIn: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
  }) =>
    useMutation({
      mutationKey: ['log-in'],
      mutationFn: async (data: LogInBody) => {
        return await client.post('/auth/log-in', data)
      },
      onSuccess: ({ data }: { data: { accessToken: string } }) => {
        accessToken.update(data.accessToken)
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useLogOut: ({ onSuccess }: { onSuccess: OnSuccess }) =>
    useMutation({
      mutationKey: ['log-out'],
      mutationFn: async () => {
        return await client.post('/auth/log-out')
      },
      onSuccess: () => {
        accessToken.update('')
        onSuccess()
      },
    }),
}
