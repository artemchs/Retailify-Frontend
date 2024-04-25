import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createVariantFormSchema = z.object({
  size: z.string().min(1, requiredField),
  price: z.coerce.number({
    required_error: requiredField,
  }),
  sale: z.coerce
    .number()
    .transform((val) => val.toFixed(2))
    .optional(),
  saleType: z.enum(['PERCENTAGE', 'FIXED-AMOUNT']).optional(),
  product: z
    .object({
      id: z.string(),
      title: z.string(),
      sku: z.string(),
    })
    .optional(),
})

export type CreateVariantFormSchema = z.infer<typeof createVariantFormSchema>
