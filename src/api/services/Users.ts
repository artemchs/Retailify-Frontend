import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { OnSuccess, SetErrorMessage } from './types'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { refreshTokens } from '@/utils/refreshTokens'
import { accessToken } from '@/utils/accessToken'
import { PointOfSaleWithLatestCashierShift } from '@/types/entities/PointOfSale'
import { queryClient } from '@/lib/query-client/tanstack-query-client'

type UpdateMeBody = {
    email: string
    fullName: string
    profilePicture?: File
}

type UpdatePasswordBody = {
    password: string
    passwordConfirm: string
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

    useFindMyPointsOfSale: () =>
        useQuery({
            queryKey: ['my-points-of-sale'],
            queryFn: async () => {
                const { data } = await client.get<
                    PointOfSaleWithLatestCashierShift[]
                >('/users/my-points-of-sale')

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
            mutationKey: ['users', 'updateMe'],
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
                queryClient.invalidateQueries({
                    queryKey: ['users', 'me'],
                })
                onSuccess()
            },
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),

    useUpdatePassword: ({
        setErrorMessage,
        onSuccess,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: OnSuccess
    }) =>
        useMutation({
            mutationKey: ['users', 'updatePassword'],
            mutationFn: async (data: UpdatePasswordBody) => {
                return await client.put('/users/me/password', data)
            },
            onSuccess: async () => {
                accessToken.update('')
                onSuccess()
            },
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),
}
