import { FindAllProductImportSchema } from '@/features/import/types/find-all-product-import.schema'
import { FindAllInfo } from '@/types/FindAllInfo'
import { Import } from '@/types/entities/Import'
import { useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { OnSuccess, SetErrorMessage } from './types'
import { CreateProductImportSchema } from '@/features/import/types/create-product-import.schema'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import onErrorHandler from './utils/onErrorHandler'
import { AxiosError } from 'axios'

const MUTATION_KEYS = {
    CREATE: 'create-product-import',
    FIND_ONE: 'find-product-import',
    FIND_ALL: 'find-all-product-imports',
    FIND_LAST: 'find-last-product-import',
}

export type ProductImportFindAll = {
    items: Import[]
    info: FindAllInfo
}

export default {
    useFindAll: (searchParams: FindAllProductImportSchema) =>
        useQuery({
            queryKey: [MUTATION_KEYS.FIND_ALL, { ...searchParams }],
            queryFn: async () => {
                const { data } = await client.get('/import/products', {
                    params: {
                        ...searchParams,
                    },
                })

                return data as ProductImportFindAll
            },
        }),

    useCreate: ({
        setErrorMessage,
        onSuccess,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: OnSuccess
    }) =>
        useMutation({
            mutationKey: [MUTATION_KEYS.CREATE],
            mutationFn: async ({
                body,
            }: {
                body: CreateProductImportSchema
            }) => {
                return await client.post('/import/products', body)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [MUTATION_KEYS.FIND_ALL],
                })
                queryClient.invalidateQueries({
                    queryKey: [MUTATION_KEYS.FIND_LAST],
                })
                onSuccess()
            },
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),

    useFindOne: ({ id }: { id: string | null }) =>
        useQuery({
            queryKey: [MUTATION_KEYS.FIND_ONE, { id }],
            queryFn: async () => {
                if (!id) return

                const { data } = await client.get(`/import/products/${id}`)
                return data as Import
            },
        }),

    useFindLast: () =>
        useQuery({
            queryKey: [MUTATION_KEYS.FIND_LAST],
            queryFn: async () => {
                const { data } = await client.get('/import/products/last')
                return data as Import
            },
        }),
}
