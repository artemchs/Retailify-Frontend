import { z } from 'zod'

export const inventoryTransfersSearchParamsSchema = z.object({
  page: z.number().catch(1),
  query: z.string().optional(),
  rowsPerPage: z.number().catch(20),
  sourceWarehouseIds: z.array(z.string()).optional(),
  destinationWarehouseIds: z.array(z.string()).optional(),
  reasonIds: z.array(z.string()).optional(),
  date: z
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
  orderBy: z
    .object({
      name: z.enum(['asc', 'desc']).optional(),
      date: z.enum(['asc', 'desc']).optional(),
      createdAt: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  isArchived: z.number().optional(),
})

export type InventoryTransfersSearchParamsSchema = z.infer<
  typeof inventoryTransfersSearchParamsSchema
>
