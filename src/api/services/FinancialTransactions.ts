import {
    FinancialTransaction,
    FinancialTransactionFindAll,
} from '@/types/entities/FinancialTransaction'
import { SetErrorMessage } from './types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateFinancialTransactionFormSchema } from '@/features/financial-transactions/types/create-financial-transaction-form-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { FinancialTransactionsSearchParams } from '@/features/financial-transactions/types/financial-transactions-search-params'

const MUTATION_KEYS = {
    CREATE: 'create-financial-transaction',
    FIND_ONE: 'financial-transaction',
    FIND_ALL: 'financial-transactions',
}

export type FinancialTransactionsFindAll = {
    items: FinancialTransactionFindAll[]
    nextCursor?: string
}

export default {
    useCreate: ({
        setErrorMessage,
        onSuccess,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: (data: FinancialTransaction) => void
    }) =>
        useMutation({
            mutationKey: [MUTATION_KEYS.CREATE],
            mutationFn: async ({
                body,
            }: {
                body: CreateFinancialTransactionFormSchema
            }) => {
                return await client.post('/financial-transactions', body)
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

    useFindAll: (searchParams: FinancialTransactionsSearchParams) =>
        useQuery({
            queryKey: [MUTATION_KEYS.FIND_ALL, searchParams],
            queryFn: async () => {
                const { data } = await client.get('/financial-transactions', {
                    params: searchParams,
                })

                return data as FinancialTransactionsFindAll
            },
        }),

    useFindOne: ({ id }: { id?: string }) =>
        useQuery({
            queryKey: [MUTATION_KEYS.FIND_ONE, { id }],
            queryFn: async () => {
                if (!id) return null

                const { data } = await client.get(
                    `/financial-transactions/${id}`
                )
                return data as FinancialTransaction
            },
        }),
}
