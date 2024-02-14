import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createVariantFormSchema = z.object({
  size: z.string().min(1, requiredField),
  price: z.coerce.number({
    required_error: requiredField,
  }),
  sale: z.coerce.number().optional(),
})

export type CreateVariantFormSchema = z.infer<typeof createVariantFormSchema>
