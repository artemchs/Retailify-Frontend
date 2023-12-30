import { useMutation } from '@tanstack/react-query'
import client from '../client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { accessToken } from '@/utils/accessToken'

type MutationProps = {
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>
  onSuccess(): void
}

type SignUpBody = {
  fullName: string
  username: string
  password: string
}

type LogInBody = {
  username: string
  password: string
}

export default {
  useSignUp: ({ setErrorMessage, onSuccess }: MutationProps) =>
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

  useLogIn: ({ setErrorMessage, onSuccess }: MutationProps) =>
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
}
