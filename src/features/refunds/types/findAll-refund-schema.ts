import { z } from 'zod'

export const findAllRefundSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  warehouseIds: z.array(z.string()).optional(),
  customerIds: z.array(z.string()).optional(),
  posIds: z.array(z.string()).optional(),
  orderDate: z
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
  date: z
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
  paymentMethods: z.array(z.enum(['CASH', 'CARD', 'MIXED'])).optional(),
  orderBy: z
    .object({
      name: z.enum(['asc', 'desc']).optional(),
      date: z.enum(['asc', 'desc']).optional(),
      createdAt: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
})

export type FindAllRefundSchema = z.infer<typeof findAllRefundSchema>
