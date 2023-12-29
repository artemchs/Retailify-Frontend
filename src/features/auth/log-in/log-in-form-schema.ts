import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const logInFormSchema = z.object({
  username: z.string().min(1, requiredField),
  password: z.string().min(1, requiredField),
})
