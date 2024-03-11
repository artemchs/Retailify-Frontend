import { z } from 'zod'

export const cashRegisterSearchParams = z.object({
  shiftId: z.string().optional(),
  posId: z.string().min(1),
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  productIds: z.array(z.string()).optional(),
  orderBy: z
    .object({
      size: z.enum(['asc', 'desc']).optional(),
      price: z.enum(['asc', 'desc']).optional(),
      sale: z.enum(['asc', 'desc']).optional(),
      createdAt: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
})

export type CashRegisterSearchParams = z.infer<typeof cashRegisterSearchParams>
