import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { OnSuccess, SetErrorMessage } from './types'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { refreshTokens } from '@/utils/refreshTokens'

type UpdateMeBody = {
  email: string
  fullName: string
  profilePicture?: File
}

export default {
  useGetMe: () =>
    useQuery({
      queryKey: ['users', 'me'],
      queryFn: async () => {
        const { data } = await client.get<{
          email: string
          fullName: string
          profilePicture: string | null
        }>('/users/me')

        return data
      },
    }),

  useUpdateMe: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
  }) =>
    useMutation({
      mutationKey: ['users/updateMe'],
      mutationFn: async (data: UpdateMeBody) => {
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('fullName', data.fullName)
        if (data.profilePicture) {
          formData.append('profilePicture', data.profilePicture)
        }
        return await client.put('/users/me', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      },
      onSuccess: async () => {
        await refreshTokens()
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
