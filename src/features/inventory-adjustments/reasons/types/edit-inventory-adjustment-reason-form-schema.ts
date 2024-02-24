import { z } from 'zod'
import { createInventoryAdjustmentReasonFormSchema } from './create-inventory-adjustment-reason-form-schema'

export const editInventoryAdjustmentReasonFormSchema =
  createInventoryAdjustmentReasonFormSchema

export type EditInventoryAdjustmentReasonFormSchema = z.infer<
  typeof editInventoryAdjustmentReasonFormSchema
>
