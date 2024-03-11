import { z } from 'zod'
import { createCustomerFormSchema } from './create-customer-form-schema'

export const editCustomerFormSchema = createCustomerFormSchema.partial()

export type EditCustomerFormSchema = z.infer<typeof editCustomerFormSchema>
