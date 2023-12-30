import { useMutation } from '@tanstack/react-query'
import client from '../client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'

type UseSignUpProps = {
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>
  onSuccess(): void
}

type SignUpBody = {
  fullName: string
  username: string
  password: string
}

export default {
  useSignUp: ({ setErrorMessage, onSuccess }: UseSignUpProps) =>
    useMutation({
      mutationKey: ['sign-up'],
      mutationFn: async (data: SignUpBody) => {
        await client.post('/auth/sign-up', data)
      },
      onSuccess: onSuccess,
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
