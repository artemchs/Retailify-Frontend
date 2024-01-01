import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const signUpFormSchema = z.object({
  fullName: z.string().min(1, requiredField),
  email: z.string().email().min(1, requiredField),
  password: z
    .string()
    .min(1, requiredField)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          'Пароль должен содержать не менее 8 символов и включать буквы верхнего и нижнего регистра, цифры и специальные символы.',
      }
    ),
})
