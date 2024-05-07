import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const createGoodsReceiptFormSchema = z.object({
  supplierId: z.string().min(1, requiredField),
  warehouseId: z.string().min(1, requiredField),
  goodsReceiptDate: z.date({ required_error: requiredField }),
  paymentOption: z.enum(['PRIVATE_FUNDS', 'CURRENT_ACCOUNT', 'CASH_REGISTER'], {
    required_error: requiredField,
    invalid_type_error: 'Способ оплаты должен быть выбран из списка',
  }),
  variants: z.array(
    z.object({
      variantId: z.string().min(1, 'Вариант не должен быть пустым'),
      supplierPrice: z.number({
        required_error: 'Цена закупки не должна быть пустой',
      }),
      receivedQuantity: z.number({
        required_error: 'Количество не должно быть пустым',
      }),
      productName: z.string(),
      productId: z.string(),
      size: z.string(),
    }),
    { required_error: 'Товар не выбран' }
  ),
})

export type CreateGoodsReceiptFormSchema = z.infer<
  typeof createGoodsReceiptFormSchema
>
