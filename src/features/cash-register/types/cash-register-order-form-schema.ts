import { z } from 'zod'

const item = z.object({
  id: z.string(),
  quantity: z.coerce.number().catch(1),
  price: z.coerce.number(),
  sale: z.coerce.number(),
  product: z
    .object({
      title: z.string(),
    })
    .optional(),
  size: z.string(),
  customSalePercentage: z.coerce.number().optional(),
  customSaleFixedAmount: z.coerce.number().optional(),
  customSaleType: z.enum(['FIXED-AMOUNT', 'PERCENTAGE']).optional(),
})

export type CashRegisterItem = z.infer<typeof item>

export const cashRegisterOrderFormSchema = z.object({
  customerId: z.string().optional(),
  items: z.array(item),
  paymentMethod: z.enum(['CASH', 'CARD', 'MIXED']),
  customBulkDiscountType: z.enum(['FIXED-AMOUNT', 'PERCENTAGE']).optional(),
  customBulkDiscountFixedAmount: z.coerce.number().optional(),
  customBulkDiscountPercentage: z.coerce.number().optional(),
  totalCashAmount: z.coerce.number().optional(),
  totalCardAmount: z.coerce.number().optional(),
  posId: z.string().optional(),
})

export type CashRegisterOrderFormSchema = z.infer<
  typeof cashRegisterOrderFormSchema
>
