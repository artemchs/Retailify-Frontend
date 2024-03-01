import { z } from 'zod'
import { createInventoryTransferFormSchema } from './create-inventory-transfer-form-schema'

export const editInventoryTransferFormSchema = createInventoryTransferFormSchema

export type EditInventoryTransferFormSchema = z.infer<
  typeof editInventoryTransferFormSchema
>
