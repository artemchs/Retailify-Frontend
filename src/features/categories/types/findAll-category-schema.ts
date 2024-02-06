import { z } from 'zod'

export const findAllCategorySchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  orderBy: z
    .object({
      name: z.enum(['asc', 'desc']).optional(),
      productName: z.enum(['asc', 'desc']).optional(),
      createdAt: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  isArchived: z.number().optional(),
})

export type FindAllCategorySchema = z.infer<typeof findAllCategorySchema>
