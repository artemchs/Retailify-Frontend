import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

const variant = z.object({
  variantId: z.string(),
  quantity: z.coerce.number(),
})

export type InventoryTransferVariant = z.infer<typeof variant>

export const createInventoryTransferFormSchema = z.object({
  date: z.date({ required_error: requiredField }),
  transferItems: z.array(variant),
  reasonId: z.string().min(1, requiredField),
  sourceWarehouseId: z.string().min(1, requiredField),
  destinationWarehouseId: z.string().min(1, requiredField),
})

export type CreateInventoryTransferFormSchema = z.infer<
  typeof createInventoryTransferFormSchema
>
