import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const logInFormSchema = z.object({
  email: z.string().email().min(1, requiredField),
  password: z.string().min(1, requiredField),
})
