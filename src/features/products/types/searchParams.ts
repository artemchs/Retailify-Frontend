import { z } from 'zod'

export const productsSearchParamsSchema = z.object({
    page: z.number().catch(1),
    query: z.string().optional(),
    rowsPerPage: z.number().catch(20),
    colorIds: z.array(z.string()).optional(),
    tagIds: z.array(z.string()).optional(),
    characteristicValueIds: z.array(z.string()).optional(),
    productSeasons: z.array(z.string()).optional(),
    productGenders: z.array(z.string()).optional(),
    categoryIds: z.array(z.string()).optional(),
    brandIds: z.array(z.string()).optional(),
    orderBy: z
        .object({
            title: z.enum(['asc', 'desc']).optional(),
            createdAt: z.enum(['asc', 'desc']).optional(),
            sku: z.enum(['asc', 'desc']).optional(),
            supplierSku: z.enum(['asc', 'desc']).optional(),
            totalReceivedQuantity: z.enum(['asc', 'desc']).optional(),
            totalWarehouseQuantity: z.enum(['asc', 'desc']).optional(),
        })
        .optional(),
    isArchived: z.number().optional(),
})

export type ProductsSearchParams = z.infer<typeof productsSearchParamsSchema>
