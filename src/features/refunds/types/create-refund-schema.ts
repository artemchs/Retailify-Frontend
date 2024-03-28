import { z } from 'zod'

export const createRefundSchema = z.object({
  orderId: z.string().min(1),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      pricePerItemWithDiscount: z.coerce.number().optional(),
      quantity: z.coerce.number(),
    })
  ),
})

export type CreateRefundSchema = z.infer<typeof createRefundSchema>
