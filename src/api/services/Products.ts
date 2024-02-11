import { FindAllInfo } from '@/types/FindAllInfo'
import { Product, ProductFindAll } from '@/types/entities/Product'
import { OnSuccess, SetErrorMessage } from './types'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { CreateProductFormSchema } from '@/features/products/types/create-product-form-schema'
import client from '../client'
import { queryClient } from '@/lib/query-client/tanstack-query-client'
import { AxiosError } from 'axios'
import onErrorHandler from './utils/onErrorHandler'
import { ProductsSearchParams } from '@/features/products/types/searchParams'
import { EditProductFormSchema } from '@/features/products/types/edit-product-form-schema'

export type ProductsFindAll = {
  items: ProductFindAll[]
  info: FindAllInfo
}

export type ProductsFindAllInfiniteList = {
  items: Product[]
  nextCursor?: string
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
      mutationKey: ['create-product'],
      mutationFn: async ({ body }: { body: CreateProductFormSchema }) => {
        return await client.post('/products', body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAll: (searchParams: ProductsSearchParams) =>
    useQuery({
      queryKey: ['products', searchParams],
      queryFn: async () => {
        const { data } = await client.get('/products', {
          params: searchParams,
        })

        return data as ProductsFindAll
      },
    }),

  useFindAllInfiniteList: (params: { query?: string }) =>
    useInfiniteQuery({
      queryKey: ['products-infinite-list', params],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get('/products', {
          params: { ...params, cursor: pageParam },
        })

        return data as ProductsFindAllInfiniteList
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOne: ({ id }: { id: string }) =>
    useQuery({
      queryKey: ['product', { id }],
      queryFn: async () => {
        const { data } = await client.get(`/products/${id}`)
        return data as Product
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
      mutationKey: ['edit-product'],
      mutationFn: async ({ body }: { body: EditProductFormSchema }) => {
        return await client.put(`/products/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product', { id }],
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
      mutationKey: ['archive-product'],
      mutationFn: async () => {
        return await client.delete(`/products/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product', { id }],
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
      mutationKey: ['restore-product'],
      mutationFn: async () => {
        return await client.put(`/products/restore/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product', { id }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),
}
