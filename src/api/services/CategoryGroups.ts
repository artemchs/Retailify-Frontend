import { FindAllInfo } from '@/types/FindAllInfo'
import { CategoryGroup } from '@/types/entities/CategoryGroup'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { CreateCategoryGroupFormSchema } from '@/features/category-groups/types/create-category-group-form-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { FindAllCategoryGroupsSchema } from '@/features/category-groups/types/findAll-category-groups-schema'
import { FindAllInfiniteListCategoryGroupsSchema } from '@/features/category-groups/types/findAllInfiniteList-category-groups-schema'
import { EditCategoryGroupFormSchema } from '@/features/category-groups/types/edit-category-group-form-schema'

export type CategoryGroupsFindAll = {
  items: CategoryGroup[]
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
      mutationKey: ['create-category-group'],
      mutationFn: async ({ body }: { body: CreateCategoryGroupFormSchema }) => {
        return await client.post('/category-groups', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['category-groups'],
        })
        queryClient.invalidateQueries({
          queryKey: ['category-groups-infinite-list'],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories'],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories-infinite-list']
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (searchParams: FindAllCategoryGroupsSchema) =>
    useQuery({
      queryKey: ['category-groups', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/category-groups', {
          params: searchParams,
        })

        return data as CategoryGroupsFindAll
      },
    }),

  useFindAllInfiniteList: (
    searchParams: FindAllInfiniteListCategoryGroupsSchema
  ) =>
    useInfiniteQuery({
      queryKey: ['category-groups-infinite-list', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/category-groups/infinite-list', {
          params: searchParams,
        })

        return data as {
          items: CategoryGroup[]
          nextCursor?: string
        }
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['category-group', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/category-groups/${id}`)
        return data as CategoryGroup
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
      mutationKey: ['edit-category-group'],
      mutationFn: async ({ body }: { body: EditCategoryGroupFormSchema }) => {
        return await client.put(`/category-groups/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['category-groups'],
        })
        queryClient.invalidateQueries({
          queryKey: ['category-group', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories'],
        })
        queryClient.invalidateQueries({
          queryKey: ['category'],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories-infinite-list']
        })
        queryClient.invalidateQueries({
          queryKey: ['category-groups-infinite-list'],
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
      mutationKey: ['archive-category-group'],
      mutationFn: async () => {
        return await client.delete(`/category-groups/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['category-groups'],
        })
        queryClient.invalidateQueries({
          queryKey: ['category-group', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories'],
        })
        queryClient.invalidateQueries({
          queryKey: ['category'],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories-infinite-list']
        })
        queryClient.invalidateQueries({
          queryKey: ['category-groups-infinite-list'],
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
      mutationKey: ['restore-category-group'],
      mutationFn: async () => {
        return await client.put(`/category-groups/restore/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['category-groups'],
        })
        queryClient.invalidateQueries({
          queryKey: ['category-group', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories'],
        })
        queryClient.invalidateQueries({
          queryKey: ['category'],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories-infinite-list']
        })
        queryClient.invalidateQueries({
          queryKey: ['category-groups-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
