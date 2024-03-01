import { z } from 'zod'
import { createInventoryTransferReasonFormSchema } from './create-inventory-transfer-reason-form-schema'

export const editInventoryTransferReasonFormSchema =
  createInventoryTransferReasonFormSchema

export type EditInventoryTransferReasonFormSchema = z.infer<
  typeof editInventoryTransferReasonFormSchema
>
