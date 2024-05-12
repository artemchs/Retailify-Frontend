import { z } from 'zod'

const orderBy = z
  .object({
    createdAt: z.enum(['asc', 'desc']).optional(),
    barcode: z.enum(['asc', 'desc']).optional(),
    price: z.enum(['asc', 'desc']).optional(),
    sale: z.enum(['asc', 'desc']).optional(),
    sku: z.enum(['asc', 'desc']).optional(),
    supplierSku: z.enum(['asc', 'desc']).optional(),
    totalReceivedQuantity: z.enum(['asc', 'desc']).optional(),
    totalWarehouseQuantity: z.enum(['asc', 'desc']).optional(),
    size: z.enum(['asc', 'desc']).optional(),
  })
  .optional()

export const variantsSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  productIds: z.array(z.string()).optional(),
  warehouseIds: z.array(z.string()).optional(),
  posId: z.string().optional(),
  orderBy,
  isArchived: z.number().optional(),
  excludeIds: z.array(z.string()).optional(),
})

export type VariantsSearchParamsOrderBy = z.infer<typeof orderBy>

export type VariantsSearchParamsSchema = z.infer<
  typeof variantsSearchParamsSchema
>
