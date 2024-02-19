import { z } from 'zod'

export const productsBatchEditSearchParams = z.object({
  ids: z.array(z.string()).optional(),
})

export type ProductsBatchEditSearchParams = z.infer<
  typeof productsBatchEditSearchParams
>
