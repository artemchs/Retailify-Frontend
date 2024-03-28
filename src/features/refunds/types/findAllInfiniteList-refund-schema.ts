import { z } from 'zod'

export const findAllInfiniteListRefundSchema = z.object({
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
  query: z.string().optional(),
  cursor: z.string().optional(),
})

export type FindAllInfiniteListRefundSchema = z.infer<
  typeof findAllInfiniteListRefundSchema
>
