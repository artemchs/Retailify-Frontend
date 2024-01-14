import { emailField, requiredField } from '@/utils/zodErrorMessages'
import { parsePhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'

export const createSupplierFormSchema = z.object({
  name: z.string().min(1, requiredField),
  contactPerson: z.string().min(1, requiredField),
  email: z.string().email({ message: emailField }).min(1, requiredField),
  phone: z
    .string()
    .min(1, requiredField)
    .refine(
      (value) => {
        try {
          parsePhoneNumber(value, {
            defaultCountry: 'UA',
          })
        } catch (e) {
          return false
        }

        return true
      },
      {
        message: 'Пожалуйста, введите корректный номер телефона.',
      }
    ),
  address: z.string().min(1, requiredField),
})

export type CreateSupplierFormType = z.infer<typeof createSupplierFormSchema>
