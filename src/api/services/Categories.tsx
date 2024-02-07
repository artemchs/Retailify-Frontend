import { FindAllInfo } from '@/types/FindAllInfo'
import { Category } from '@/types/entities/Category'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { CreateCategoryFormSchema } from '@/features/categories/types/create-category-form-schema'
import { FindAllCategorySchema } from '@/features/categories/types/findAll-category-schema'
import { FindAllInfiniteListCategorySchema } from '@/features/categories/types/findAllInfiniteList-category-schema'
import { editCategoryFormSchema } from '@/features/categories/types/edit-category-form-schema'

export type CategoriesFindAll = {
  items: Category[]
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
      mutationKey: ['create-category'],
      mutationFn: async ({ body }: { body: CreateCategoryFormSchema }) => {
        return await client.post('/categories', body)
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
          queryKey: ['characteristics-for-category'],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories-infinite-list'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (searchParams: FindAllCategorySchema) =>
    useQuery({
      queryKey: ['categories', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/categories', {
          params: searchParams,
        })

        return data as CategoriesFindAll
      },
    }),

  useFindAllInfiniteList: (searchParams: FindAllInfiniteListCategorySchema) =>
    useInfiniteQuery({
      queryKey: ['categories-infinite-list', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/categories/infinite-list', {
          params: searchParams,
        })

        return data as {
          items: Category[]
          nextCursor?: string
        }
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['category', { id }],
      queryFn: async () => {
        if (!id) return null

        const { data } = await client.get(`/categories/${id}`)
        return data as Category
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
      mutationKey: ['edit-category'],
      mutationFn: async ({ body }: { body: editCategoryFormSchema }) => {
        return await client.put(`/categories/${id}`, body)
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
          queryKey: ['category', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['characteristics-for-category'],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories-infinite-list'],
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
      mutationKey: ['archive-category'],
      mutationFn: async () => {
        return await client.delete(`/categories/${id}`)
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
          queryKey: ['category', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories-infinite-list'],
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
      mutationKey: ['restore-category'],
      mutationFn: async () => {
        return await client.put(`/categories/restore/${id}`)
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
          queryKey: ['category', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['categories-infinite-list'],
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
