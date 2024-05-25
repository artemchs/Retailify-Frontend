import { CustomFinancialOperation } from '@/types/entities/CustomFinancialOperation'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import client from '../client'
import { CreateCustomOperationFormSchema } from '@/features/financial-transactions/custom-operations/types/create-custom-operation-form-schema'
import { EditCustomOperationFormSchema } from '@/features/financial-transactions/custom-operations/types/edit-custom-operation-form-schema'

const MUTATION_KEYS = {
    CREATE: 'create-custom-financial-operation',
    FIND_ONE: 'custom-financial-operation',
    FIND_ALL: 'custom-financial-operations',
    EDIT: 'edit-custom-financial-operation',
    REMOVE: 'remove-custom-financial-operation',
}

export type CustomFinancialOperationsFindAll = {
    items: CustomFinancialOperation[]
    nextCursor?: string
}

export default {
    useCreate: ({
        setErrorMessage,
        onSuccess,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: (data: CustomFinancialOperation) => void
    }) =>
        useMutation({
            mutationKey: [MUTATION_KEYS.CREATE],
            mutationFn: async ({
                body,
            }: {
                body: CreateCustomOperationFormSchema
            }) => {
                return await client.post('/custom-operations', body)
            },
            onSuccess: ({ data }) => {
                queryClient.invalidateQueries({
                    queryKey: [MUTATION_KEYS.FIND_ALL],
                })
                onSuccess(data)
            },
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),

    useFindAll: (params: { query?: string }) =>
        useInfiniteQuery({
            queryKey: [MUTATION_KEYS.FIND_ALL, params],
            queryFn: async ({ pageParam }) => {
                const { data } = await client.get('/custom-operations', {
                    params: { ...params, cursor: pageParam },
                })

                return data as CustomFinancialOperationsFindAll
            },
            initialPageParam: '',
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }),

    useFindOne: ({ id }: { id: string }) =>
        useQuery({
            queryKey: [MUTATION_KEYS.FIND_ONE, { id }],
            queryFn: async () => {
                if (!id) return null

                const { data } = await client.get(`/custom-operations/${id}`)
                return data as CustomFinancialOperation
            },
        }),

    useEdit: ({
        setErrorMessage,
        onSuccess,
        id,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: (data: CustomFinancialOperation) => void
        id: string
    }) =>
        useMutation({
            mutationKey: [MUTATION_KEYS.EDIT],
            mutationFn: async ({
                body,
            }: {
                body: EditCustomOperationFormSchema
            }) => {
                return await client.put(`/custom-operations/${id}`, body)
            },
            onSuccess: ({ data }) => {
                queryClient.invalidateQueries({
                    queryKey: [MUTATION_KEYS.FIND_ALL],
                })
                queryClient.invalidateQueries({
                    queryKey: [MUTATION_KEYS.FIND_ONE, { id }],
                })
                onSuccess(data)
            },
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),

    useRemove: ({
        setErrorMessage,
        onSuccess,
        id,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: OnSuccess
        id: string
    }) =>
        useMutation({
            mutationKey: [MUTATION_KEYS.REMOVE],
            mutationFn: async () => {
                return await client.delete(`/custom-operations/${id}`)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [MUTATION_KEYS.FIND_ALL],
                })
                queryClient.invalidateQueries({
                    queryKey: [MUTATION_KEYS.FIND_ONE, { id }],
                })
                onSuccess()
            },
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),
}
