import { z } from 'zod'

export const productsSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  orderBy: z
    .object({
      title: z.enum(['asc', 'desc']).optional(),
      createdAt: z.enum(['asc', 'desc']).optional(),
      description: z.enum(['asc', 'desc']).optional(),
      price: z.enum(['asc', 'desc']).optional(),
      sale: z.enum(['asc', 'desc']).optional(),
      packagingLength: z.enum(['asc', 'desc']).optional(),
      packagingWidth: z.enum(['asc', 'desc']).optional(),
      packagingHeight: z.enum(['asc', 'desc']).optional(),
      packagingWeight: z.enum(['asc', 'desc']).optional(),
      totalStock: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  isArchived: z.number().optional(),
})

export type ProductsSearchParams = z.infer<
  typeof productsSearchParamsSchema
>
