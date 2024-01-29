import { z } from 'zod'

// query?: string
// cursor?: string
// parentId?: string

export const collectionFindAllInfiniteListParams = z.object({
  query: z.string().optional(),
  cursor: z.string().optional(),
  parentId: z.string().optional(),
})

export type CollectionFindAllInfiniteListParams = z.infer<
  typeof collectionFindAllInfiniteListParams
>
