import { emailField, requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const editProfileDialogFormSchema = z.object({
  email: z.string().email({ message: emailField }).min(1, requiredField),
  fullName: z.string().min(1, requiredField),
  profilePicture: z.any(z.instanceof(File)).optional(),
})
