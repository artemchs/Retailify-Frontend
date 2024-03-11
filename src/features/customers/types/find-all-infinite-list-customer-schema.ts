import { z } from 'zod'

export const findAllInfiniteListCustomerSchema = z.object({
  query: z.string().optional(),
  cursor: z.string().optional(),
})

export type FindAllInfiniteListCustomerSchema = z.infer<
  typeof findAllInfiniteListCustomerSchema
>
