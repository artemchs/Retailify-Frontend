import { z } from 'zod'

export const warehousesSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  orderBy: z
    .object({
      name: z.enum(['asc', 'desc']).optional(),
      address: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  isArchived: z.number().optional(),
})

export type WarehousesSearchParams = z.infer<
  typeof warehousesSearchParamsSchema
>
