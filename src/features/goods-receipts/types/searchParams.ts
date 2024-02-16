import { paymentOptions, paymentTerms } from '@/types/entities/GoodsReceipt'
import { z } from 'zod'

const paymentOptionsSchema = z.enum(
  Object.keys(paymentOptions) as unknown as readonly [string, ...string[]]
)

const paymentTermsSchema = z.enum(
  Object.keys(paymentTerms) as unknown as readonly [string, ...string[]]
)

export const goodsReceiptsSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  warehouseIds: z.array(z.string()).optional(),
  supplierIds: z.array(z.string()).optional(),
  paymentOptions: z.array(paymentOptionsSchema).optional(),
  paymentTerms: z.array(paymentTermsSchema).optional(),
  goodsReceiptDate: z
    .object({
      from: z
        .date({
          coerce: true,
        })
        .optional(),
      to: z
        .date({
          coerce: true,
        })
        .optional(),
    })
    .optional(),
  totalCost: z
    .object({
      from: z
        .number({
          coerce: true,
        })
        .optional(),
      to: z
        .number({
          coerce: true,
        })
        .optional(),
    })
    .optional(),
  orderBy: z
    .object({
      createdAt: z.enum(['asc', 'desc']).optional(),
      updatedAt: z.enum(['asc', 'desc']).optional(),
      name: z.enum(['asc', 'desc']).optional(),
      goodsReceiptDate: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  isArchived: z.number().optional(),
})

export type GoodsReceiptsSearchParams = z.infer<
  typeof goodsReceiptsSearchParamsSchema
>
