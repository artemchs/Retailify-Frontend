import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

const variant = z.object({
  variantToWarehouseId: z.string(),
  quantityChange: z.coerce.number(),
  variantId: z.string(),
  productTitle: z.string().optional(),
  size: z.string().optional(),
  oldQuantity: z.number(),
  newQuantity: z.coerce.number(),
})

export type InventoryAdjustmentVariant = z.infer<typeof variant>

export const createInventoryAdjustmentFormSchema = z.object({
  warehouseId: z.string().min(1, requiredField),
  reasonId: z.string().min(1, requiredField),
  date: z.date({ required_error: requiredField }),
  variants: z.array(variant),
})

export type CreateInventoryAdjustmentFormSchema = z.infer<
  typeof createInventoryAdjustmentFormSchema
>
