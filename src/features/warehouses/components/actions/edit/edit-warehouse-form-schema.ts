import { z } from 'zod'
import { createWarehouseFormSchema } from '../create/create-warehouse-form-schema'

export const editWarehouseFormSchema = createWarehouseFormSchema

export type EditWarehouseFormSchema = z.infer<typeof editWarehouseFormSchema>
