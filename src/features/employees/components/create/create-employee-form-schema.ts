import { emailField, requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createEmployeeFormSchema = z.object({
  fullName: z.string().min(1, requiredField),
  email: z.string().email({ message: emailField }).min(1, requiredField),
  role: z.enum(['CASHIER', 'ECOMMERCE_MANAGER', 'ADMIN']),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]).{8,}$/.test(
          value
        ),
      'Пожалуйста, убедитесь, что пароль сотрудника состоит как минимум из 8 символов, включает 2 заглавные буквы, 3 строчные буквы, 2 цифры (0-9) и 1 специальный символ (!@#$&*).'
    ),
})

export type CreateEmployeeFormType = z.infer<typeof createEmployeeFormSchema>
