import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'
import { ProductFields } from '../../types/product-fields'
import { PRODUCT_FIELDS } from '../components/shared/product-fields-translation'

const requiredFields = [
    ProductFields.PRODUCT_ID,
    ProductFields.VARIANT_ID,
    ProductFields.PRODUCT_SKU,
    ProductFields.PRODUCT_TITLE,
    ProductFields.VARIANT_PRICE,
    ProductFields.VARIANT_SIZE,
    ProductFields.VARIANT_QUANTITY,
]

const importSourceSchema = z.array(
    z.object({
        incomingFileField: z.string().trim().min(1, requiredField),
        field: z.nativeEnum(ProductFields, {
            required_error: requiredField,
        }),
        isAdditionalField: z.boolean().default(false),
    })
)

export type ImportSourceSchema = z.infer<typeof importSourceSchema>

export const createImportSourceSchema = z
    .object({
        name: z.string({
            required_error: requiredField,
        }),
        schema: importSourceSchema,
    })
    .refine(
        (data) => {
            const definedFields = data.schema.map((item) => item.field)
            const allRequiredFieldsDefined = requiredFields.every((field) =>
                definedFields.includes(field)
            )

            return allRequiredFieldsDefined
        },
        {
            message: `Отсутствуют обязательные поля, включите их в схему. Список обязательных полей: ${requiredFields
                .map((key) => PRODUCT_FIELDS[key])
                .join(', ')}`,
            path: ['schema'],
        }
    )

export type CreateImportSourceSchema = z.infer<typeof createImportSourceSchema>
