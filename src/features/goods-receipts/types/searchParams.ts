import { z } from 'zod'

export const goodsReceiptsSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  orderBy: z
    .object({
      createdAt: z.enum(['asc', 'desc']).optional(),
      updatedAt: z.enum(['asc', 'desc']).optional(),
      name: z.enum(['asc', 'desc']).optional(),
      goodsReceiptDate: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
})

export type GoodsReceiptsSearchParams = z.infer<
  typeof goodsReceiptsSearchParamsSchema
>
