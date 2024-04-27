import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createVariantAdditionalAttributeFormSchema = z.object({
  name: z.string().min(1, requiredField),
})

export type CreateVariantAdditionalAttributeFormSchema = z.infer<
  typeof createVariantAdditionalAttributeFormSchema
>
