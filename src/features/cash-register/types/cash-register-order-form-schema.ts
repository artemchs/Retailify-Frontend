import { z } from 'zod'

const item = z.object({
  id: z.string(),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  sale: z.coerce.number(),
  product: z
    .object({
      title: z.string(),
    })
    .optional(),
  size: z.string(),
})

export type CashRegisterItem = z.infer<typeof item>

export const cashRegisterOrderFormSchema = z.object({
  customerId: z.string().optional(),
  items: z.array(item),
  paymentMethod: z.enum(['CASH', 'CARD', 'MIXED']),
})

export type CashRegisterOrderFormSchema = z.infer<
  typeof cashRegisterOrderFormSchema
>
