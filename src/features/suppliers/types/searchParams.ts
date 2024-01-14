import { z } from 'zod'

export const suppliersSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  orderBy: z
    .object({
      name: z.enum(['asc', 'desc']).optional(),
      contactPerson: z.enum(['asc', 'desc']).optional(),
      email: z.enum(['asc', 'desc']).optional(),
      phone: z.enum(['asc', 'desc']).optional(),
      address: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  isArchived: z.number().optional(),
})

export type SuppliersSearchParams = z.infer<typeof suppliersSearchParamsSchema>
