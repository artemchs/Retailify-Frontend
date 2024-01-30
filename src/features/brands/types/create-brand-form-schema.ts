import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createBrandFormSchema = z.object({
  name: z.string().min(1, requiredField),
})

export type CreateBrandFormSchema = z.infer<typeof createBrandFormSchema>
