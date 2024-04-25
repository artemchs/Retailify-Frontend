import { z } from 'zod'

export const variantsSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  productIds: z.array(z.string()).optional(),
  posId: z.string().optional(),
  orderBy: z
    .object({
      size: z.enum(['asc', 'desc']).optional(),
      createdAt: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  isArchived: z.number().optional(),
})

export type VariantsSearchParamsSchema = z.infer<
  typeof variantsSearchParamsSchema
>
