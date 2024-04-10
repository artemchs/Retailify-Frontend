import { z } from 'zod'

export const cashierShiftSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  createdAt: z
    .object({
      from: z
        .date({
          coerce: true,
        })
        .optional(),
      to: z
        .date({
          coerce: true,
        })
        .optional(),
    })
    .optional(),
  closedAt: z
    .object({
      from: z
        .date({
          coerce: true,
        })
        .optional(),
      to: z
        .date({
          coerce: true,
        })
        .optional(),
    })
    .optional(),
  cashierIds: z.array(z.string()).optional(),
  orderBy: z
    .object({
      name: z.enum(['asc', 'desc']).optional(),
      date: z.enum(['asc', 'desc']).optional(),
      createdAt: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  shiftId: z.string().optional(),
  posId: z.string(),
})

export type CashierShiftSearchParamsSchema = z.infer<
  typeof cashierShiftSearchParamsSchema
>
