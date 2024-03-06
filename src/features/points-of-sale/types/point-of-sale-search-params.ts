import { z } from 'zod'

export const posSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  productTagIds: z.array(z.string()).optional(),
  cashierIds: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
  categoryGroupIds: z.array(z.string()).optional(),
  warehouseIds: z.array(z.string()).optional(),
  orderBy: z
    .object({
      name: z.enum(['asc', 'desc']).optional(),
      date: z.enum(['asc', 'desc']).optional(),
      createdAt: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  isArchived: z.number().optional(),
})

export type PosSearchParamsSchema = z.infer<typeof posSearchParamsSchema>
