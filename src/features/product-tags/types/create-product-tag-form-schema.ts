import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createProductTagFormSchema = z.object({
  name: z.string().min(1, requiredField),
})

export type CreateProductTagFormSchema = z.infer<
  typeof createProductTagFormSchema
>
