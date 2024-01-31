import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createColorFormSchema = z.object({
  name: z.string().min(1, requiredField),
  color: z.string().min(1, requiredField),
})

export type CreateColorFormSchema = z.infer<typeof createColorFormSchema>
