import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createCustomerFormSchema = z.object({
  firstName: z.string().min(1, requiredField),
  lastName: z.string().min(1, requiredField),
  email: z.string().min(1, requiredField).email({
    message: 'Пожалуйста, введите правильный адрес электронной почты.',
  }),
})

export type CreateCustomerFormSchema = z.infer<typeof createCustomerFormSchema>
