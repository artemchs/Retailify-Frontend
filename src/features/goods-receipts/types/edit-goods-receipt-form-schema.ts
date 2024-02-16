import { z } from 'zod'
import { createGoodsReceiptFormSchema } from './create-goods-receipt-form-schema'

export const editGoodsReceiptFormSchema = createGoodsReceiptFormSchema

export type EditGoodsReceiptFormSchema = z.infer<
  typeof editGoodsReceiptFormSchema
>
