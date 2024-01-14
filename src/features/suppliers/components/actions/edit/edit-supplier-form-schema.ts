import { z } from 'zod'
import { createSupplierFormSchema } from '../create/create-supplier-form-schema'

export const editSupplierFormSchema = createSupplierFormSchema

export type EditSupplierFormType = z.infer<typeof editSupplierFormSchema>
