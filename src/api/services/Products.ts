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
import { Variant } from '@/types/entities/Variant'
import { VariantsSearchParamsSchema } from '@/features/products/variants/types/findAll-variants-search-params'
import { CreateVariantFormSchema } from '@/features/products/variants/types/create-variant-form-schema'
import { EditVariantFormSchema } from '@/features/products/variants/types/edit-variant-form-schema'
import { BatchEditProductsFormSchema } from '@/features/products/types/batch-edit-products-form-schema'
import { BatchEditVariantsFormSchema } from '@/features/products/variants/types/batch-edit-variants-form-schema'

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

export type VariantsFindAll = {
    items: Variant[]
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
            mutationKey: ['create-product'],
            mutationFn: async ({ body }: { body: CreateProductFormSchema }) => {
                return await client.post('/products', body)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['products'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['products-infinite-list'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['products-generate-sku'],
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

    useGenerateSku: () =>
        useQuery({
            queryKey: ['products-generate-sku'],
            queryFn: async () => {
                const { data } = await client.get('/products/generate-sku')
                return data as string
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

    useFindOne: ({ id }: { id?: string }) =>
        useQuery({
            queryKey: ['product', { id }],
            queryFn: async () => {
                if (!id) return null

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
                queryClient.invalidateQueries({
                    queryKey: ['products-infinite-list'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['products-generate-sku'],
                })
                onSuccess()
            },
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),

    useBatchEdit: ({
        setErrorMessage,
        onSuccess,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: OnSuccess
    }) =>
        useMutation({
            mutationKey: ['edit-products'],
            mutationFn: async ({
                body,
            }: {
                body: BatchEditProductsFormSchema
            }) => {
                return await client.put(`/products`, body)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['products'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['products-infinite-list'],
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
                queryClient.invalidateQueries({
                    queryKey: ['products-infinite-list'],
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
                queryClient.invalidateQueries({
                    queryKey: ['products-infinite-list'],
                })
                onSuccess()
            },
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),

    useCreateVariant: ({
        onSuccess,
        productId,
        setErrorMessage,
    }: {
        onSuccess: OnSuccess
        setErrorMessage: SetErrorMessage
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
                    queryKey: ['products-infinite-list'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variants'],
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
            queryKey: [
                'product-variants-infinite-list',
                { ...params, productId },
            ],
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

    useFindAllInfiniteListVariantForWarehouse: (params: {
        query?: string
        cursor?: string
        warehouseId: string
    }) =>
        useInfiniteQuery({
            queryKey: ['product-variants-infinite-list-for-warehouse', params],
            queryFn: async ({ pageParam }) => {
                const { data } = await client.get(
                    `products/_/variants/for-warehouse`,
                    {
                        params: { ...params, cursor: pageParam },
                    }
                )

                return data as {
                    items: Variant[]
                    nextCursor?: string
                }
            },
            initialPageParam: '',
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }),

    useFindOneVariant: ({
        id,
        productId,
    }: {
        id: string
        productId?: string
    }) =>
        useQuery({
            queryKey: ['product-variant', { id, productId }],
            queryFn: async () => {
                const { data } = await client.get(
                    `/products/${productId}/variants/${id}`
                )
                return data as Variant
            },
        }),

    useFindAllVariants: (searchParams: VariantsSearchParamsSchema) =>
        useQuery({
            queryKey: ['product-variants', searchParams],
            queryFn: async () => {
                const { data } = await client.get(`/products/_/variants`, {
                    params: searchParams,
                })
                return data as VariantsFindAll
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
                return await client.put(
                    `/products/${productId}/variants/${id}`,
                    body
                )
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
                    queryKey: ['product-variants'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variants-infinite-list', { productId }],
                })
                queryClient.invalidateQueries({
                    queryKey: ['products-infinite-list'],
                })
                onSuccess()
            },
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),

    useBatchEditVariants: ({
        setErrorMessage,
        onSuccess,
    }: {
        setErrorMessage: SetErrorMessage
        onSuccess: OnSuccess
    }) =>
        useMutation({
            mutationKey: ['edit-product-variant'],
            mutationFn: async ({
                body,
            }: {
                body: BatchEditVariantsFormSchema
            }) => {
                return await client.put(`/products/_/variants`, body)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['products'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variant'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variants'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variants-infinite-list'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['products-infinite-list'],
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
                return await client.delete(
                    `/products/${productId}/variants/${id}`
                )
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['products'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product', { id: productId }],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variant', { id, productId }],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variants-infinite-list', { productId }],
                })
                queryClient.invalidateQueries({
                    queryKey: ['products-infinite-list'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variants'],
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
                return await client.put(
                    `/products/${productId}/variants/restore/${id}`
                )
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['products'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product', { id: productId }],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variant', { id, productId }],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variants-infinite-list', { productId }],
                })
                queryClient.invalidateQueries({
                    queryKey: ['products-infinite-list'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['product-variants'],
                })
                onSuccess()
            },
            onError: (error: AxiosError) =>
                onErrorHandler({ error, setErrorMessage }),
        }),
}
