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
import { CreateVariantFormSchema } from '@/features/products/variants/types/create-variant-form-schema'
import { Variant } from '@/types/entities/Variant'
import { EditVariantFormSchema } from '@/features/products/variants/types/edit-variant-form-schema'

export type ProductsFindAll = {
  items: ProductFindAll[]
  info: FindAllInfo
}

export type ProductsFindAllInfiniteList = {
  items: Product[]
  nextCursor?: string
}

export type VariantsFindAllInfiniteList = {
  items: Variant[]
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
        const { data } = await client.get('/products/infinite-list', {
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

  useCreateValue: ({
    setErrorMessage,
    onSuccess,
    productId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    productId: string
  }) =>
    useMutation({
      mutationKey: ['create-product-variant', { productId }],
      mutationFn: async ({ body }: { body: CreateVariantFormSchema }) => {
        return await client.post(`products/${productId}/variants`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product', { id: productId }],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants', { id: productId }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useFindAllInfiniteListVariant: (
    params: { query?: string },
    productId: string
  ) =>
    useInfiniteQuery({
      queryKey: ['product-variants-infinite-list', { ...params, productId }],
      queryFn: async ({ pageParam }) => {
        const { data } = await client.get(
          `products/${productId}/variants/infinite-list`,
          {
            params: { ...params, cursor: pageParam },
          }
        )

        return data as VariantsFindAllInfiniteList
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),

  useFindOneVariant: ({ id, productId }: { id: string; productId?: string }) =>
    useQuery({
      queryKey: ['product-variant', { id, productId }],
      queryFn: async () => {
        const { data } = await client.get(
          `/products/${productId}/variants/${id}`
        )
        return data as Variant
      },
    }),

  useEditVariant: ({
    setErrorMessage,
    onSuccess,
    id,
    productId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
    productId: string
  }) =>
    useMutation({
      mutationKey: ['edit-product-variant'],
      mutationFn: async ({ body }: { body: EditVariantFormSchema }) => {
        return await client.put(`/products/${productId}/variants/${id}`, body)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variant', { id, productId }],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants-infinite-list', { productId }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

  useArchiveVariant: ({
    setErrorMessage,
    onSuccess,
    id,
    productId,
  }: {
    setErrorMessage: SetErrorMessage
    onSuccess: OnSuccess
    id: string
    productId: string
  }) =>
    useMutation({
      mutationKey: ['archive-product-variant'],
      mutationFn: async () => {
        return await client.delete(`/products/${productId}/variants/${id}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
        queryClient.invalidateQueries({
          queryKey: ['product', { id }],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variant', { id, productId }],
        })
        queryClient.invalidateQueries({
          queryKey: ['product-variants-infinite-list', { productId }],
        })
        onSuccess()
      },
      onError: (error: AxiosError) =>
        onErrorHandler({ error, setErrorMessage }),
    }),

    useRestoreVariant: ({
      setErrorMessage,
      onSuccess,
      id,
      productId,
    }: {
      setErrorMessage: SetErrorMessage
      onSuccess: OnSuccess
      id: string
      productId: string
    }) =>
      useMutation({
        mutationKey: ['restore-product-variant'],
        mutationFn: async () => {
          return await client.put(`/products/restore/${productId}/variants/${id}`)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['products'],
          })
          queryClient.invalidateQueries({
            queryKey: ['product', { id }],
          })
          queryClient.invalidateQueries({
            queryKey: ['product-variant', { id, productId }],
          })
          queryClient.invalidateQueries({
            queryKey: ['product-variants-infinite-list', { productId }],
          })
          onSuccess()
        },
        onError: (error: AxiosError) =>
          onErrorHandler({ error, setErrorMessage }),
      }),
}
