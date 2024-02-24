import { z } from 'zod'
import { createInventoryAdjustmentFormSchema } from './create-inventory-adjustment-form-schema'

export const editInventoryAdjustmentFormSchema =
  createInventoryAdjustmentFormSchema

export type EditInventoryAdjustmentFormSchema = z.infer<
  typeof editInventoryAdjustmentFormSchema
>
