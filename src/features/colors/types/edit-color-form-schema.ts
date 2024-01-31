import { z } from 'zod'
import { createColorFormSchema } from './create-color-form-schema'

export const editColorFormSchema = createColorFormSchema

export type EditColorFormSchema = z.infer<typeof editColorFormSchema>
