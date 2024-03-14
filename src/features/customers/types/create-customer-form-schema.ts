import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'
import { parsePhoneNumber } from 'libphonenumber-js'

const emailSchema = z.string().refine(
  (value) => {
    // If the value is an empty string or undefined, consider it valid
    if (!value) {
      return true
    }

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },
  { message: 'Пожалуйста, введите правильный адрес электронной почты.' }
)

export const createCustomerFormSchema = z.object({
  firstName: z.string().min(1, requiredField),
  lastName: z.string().min(1, requiredField),
  email: emailSchema.optional(),
  phoneNumber: z
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
})

export type CreateCustomerFormSchema = z.infer<typeof createCustomerFormSchema>
