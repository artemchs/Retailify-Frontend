import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const signUpFormSchema = z.object({
  fullName: z.string().min(1, requiredField),
  username: z.string().min(1, requiredField),
  password: z.string().min(1, requiredField),
})
