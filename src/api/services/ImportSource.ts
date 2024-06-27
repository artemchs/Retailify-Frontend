import { ImportSource } from '@/types/entities/ImportSource'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { OnSuccess, SetErrorMessage } from './types'
import { CreateImportSourceSchema } from '@/features/import/sources/types/create-import-source.schema'
import { FindAllImportSourceSchema } from '@/features/import/sources/types/findAll-import-source.schema'
import { EditImportSourceSchema } from '@/features/import/sources/types/edit-import-source.schema'

const MUTATION_KEYS = {
    CREATE: 'create-import-source',
    FIND_ONE: 'find-import-source',
    FIND_ALL: 'find-all-import-sources',
    EDIT: 'edit-import-source',
    REMOVE: 'remove-import-source',
}

export type ImportSourceFindAll = {
    items: ImportSource[]
    nextCursor?: string
}

export default {
    useCreate: ({
        setErrorMessage,
        onSuccess,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: (data: ImportSource) => void
    }) =>
        useMutation({
            mutationKey: [MUTATION_KEYS.CREATE],
            mutationFn: async ({
                body,
            }: {
                body: CreateImportSourceSchema
            }) => {
                return await client.post('/import/sources', body)
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

    useFindAll: (params: FindAllImportSourceSchema) =>
        useInfiniteQuery({
            queryKey: [MUTATION_KEYS.FIND_ALL, params],
            queryFn: async ({ pageParam }) => {
                const { data } = await client.get('/import/sources', {
                    params: { ...params, cursor: pageParam },
                })

                return data as ImportSourceFindAll
            },
            initialPageParam: '',
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }),

    useFindOne: ({ id }: { id: string }) =>
        useQuery({
            queryKey: [MUTATION_KEYS.FIND_ONE, { id }],
            queryFn: async () => {
                if (!id) return null
                const { data } = await client.get<ImportSource>(
                    `/import/sources/${id}`
                )
                return data
            },
        }),

    useEdit: ({
        setErrorMessage,
        onSuccess,
        id,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: (data: ImportSource) => void
        id: string
    }) =>
        useMutation({
            mutationKey: [MUTATION_KEYS.EDIT],
            mutationFn: async ({ body }: { body: EditImportSourceSchema }) => {
                return await client.put(`/import/sources/${id}`, body)
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
                return await client.delete(`/import/sources/${id}`)
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
