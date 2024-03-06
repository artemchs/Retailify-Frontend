import { emailField, requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const editEmployeeFormSchema = z.object({
  fullName: z.string().min(1, requiredField),
  email: z.string().email({ message: emailField }).min(1, requiredField),
  role: z.enum(['CASHIER', 'ECOMMERCE_MANAGER', 'ADMIN']),
})

export type EditEmployeeFormType = z.infer<typeof editEmployeeFormSchema>
