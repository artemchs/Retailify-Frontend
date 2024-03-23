import { z } from 'zod'

export const findAllCashRegisterOrderSeachParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  cashierIds: z.array(z.string()).optional(),
  warehouseIds: z.array(z.string()).optional(),
  customerIds: z.array(z.string()).optional(),
  posIds: z.array(z.string()).optional(),
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
      createdAt: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
})

export type FindAllCashRegisterOrderSeachParamsSchema = z.infer<
  typeof findAllCashRegisterOrderSeachParamsSchema
>
