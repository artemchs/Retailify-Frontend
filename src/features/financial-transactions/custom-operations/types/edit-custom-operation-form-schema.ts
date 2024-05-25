import { z } from 'zod'
import { createCustomOperationFormSchema } from './create-custom-operation-form-schema'

export const editCustomOperationFormSchema = createCustomOperationFormSchema

export type EditCustomOperationFormSchema = z.infer<
    typeof editCustomOperationFormSchema
>
