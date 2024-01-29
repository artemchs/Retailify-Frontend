import { FindAllInfo } from '@/types/FindAllInfo'
import { Collection } from '@/types/entities/Collection'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { CreateCollectionFormSchema } from '@/features/collections/types/create-collection-form-schema'
import { CollectionsSearchParams } from '@/features/collections/types/searchParams'
import { EditCollectionFormSchema } from '@/features/collections/types/edit-collection-form-schema'
import { CollectionFindAllInfiniteListParams } from '@/features/collections/types/infiniteListParams'

export type CollectionsFindAll = {
  items: Collection[]
  info: FindAllInfo
}

export default {
  useCreate: ({
    setErrorMessage,
    onSuccess,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
  }) =>
    useMutation({
      mutationKey: ['create-collection'],
      mutationFn: async ({ body }: { body: CreateCollectionFormSchema }) => {
        return await client.post('/collections', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['collections'],
        })
        queryClient.invalidateQueries({
          queryKey: ['collections-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (searchParams: CollectionsSearchParams) =>
    useQuery({
      queryKey: ['collections', { ...searchParams }],
      queryFn: async () => {
        const { data } = await client.get('/collections', {
          params: searchParams,
        })

        return data as CollectionsFindAll
      },
    }),

  useFindAllInfiniteList: (searchParams: CollectionFindAllInfiniteListParams) =>
    useInfiniteQuery({
      queryKey: ['collections-infinite-list', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/collections', {
          params: searchParams,
        })

        return data as {
          items: Collection[]
          nextCursor?: string
        }
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['collection', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/collections/${id}`)
        return data as Collection
      },
    }),

  useEdit: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['edit-collection'],
      mutationFn: async ({ body }: { body: EditCollectionFormSchema }) => {
        return await client.put(`/collections/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['collections'],
        })
        queryClient.invalidateQueries({
          queryKey: ['collection', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristics'],
        })
        queryClient.invalidateQueries({
          queryKey: ['collections-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useArchive: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['archive-collection'],
      mutationFn: async () => {
        return await client.delete(`/collections/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['collections'],
        })
        queryClient.invalidateQueries({
          queryKey: ['collection', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['collections-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useRestore: ({
    setErrorMessage,
    onSuccess,
    id,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
  }) =>
    useMutation({
      mutationKey: ['restore-collection'],
      mutationFn: async () => {
        return await client.put(`/collections/restore/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['collections'],
        })
        queryClient.invalidateQueries({
          queryKey: ['collection', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['collections-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
