import { z } from 'zod'
import { createPosFormSchema } from './create-point-of-sale-form-schema'

export const editPosFormSchema = createPosFormSchema

export type EditPosFormSchema = z.infer<typeof editPosFormSchema>
