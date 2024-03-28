import { z } from 'zod'
import { createRefundSchema } from './create-refund-schema'

export const editRefundSchema = createRefundSchema

export type EditRefundSchema = z.infer<typeof editRefundSchema>
