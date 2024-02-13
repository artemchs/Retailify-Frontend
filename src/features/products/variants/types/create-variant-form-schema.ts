import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createVariantFormSchema = z.object({
  size: z.string().min(1, requiredField),
  sku: z.string().min(1, requiredField),
  price: z.number({
    required_error: requiredField,
  }),
  sale: z.number().optional(),
})

export type CreateVariantFormSchema = z.infer<typeof createVariantFormSchema>
