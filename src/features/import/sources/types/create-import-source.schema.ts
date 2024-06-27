import { requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'
import { ProductFields } from '../../types'

const requiredFields = [
    ProductFields.PRODUCT_ID,
    ProductFields.VARIANT_ID,
    ProductFields.PRODUCT_SKU,
    ProductFields.PRODUCT_TITLE,
    ProductFields.VARIANT_PRICE,
    ProductFields.VARIANT_SIZE,
    ProductFields.VARIANT_QUANTITY,
]

export const createImportSourceSchema = z
    .object({
        name: z.string({
            required_error: requiredField,
        }),
        schema: z.array(
            z.object({
                incomingFileField: z.string({
                    required_error: requiredField,
                }),
                field: z.nativeEnum(ProductFields, {
                    required_error: requiredField,
                }),
                isAdditionalField: z.boolean().default(false),
            })
        ),
    })
    .refine(
        (data) => {
            const definedFields = data.schema.map((item) => item.field)
            const allRequiredFieldsDefined = requiredFields.every((field) =>
                definedFields.includes(field)
            )

            const allRequiredFieldsHaveIncomingValue = requiredFields.every(
                (field) => {
                    const schemaItem = data.schema.find(
                        (item) => item.field === field
                    )
                    return (
                        schemaItem && schemaItem.incomingFileField.trim() !== ''
                    )
                }
            )

            return (
                allRequiredFieldsDefined && allRequiredFieldsHaveIncomingValue
            )
        },
        {
            message: `Отсутствуют обязательные поля или значения полей входящих файлов. Пожалуйста, включите поля схемы с непустыми значениями полей входящих файлов: ${requiredFields.join(
                ', '
            )}`,
            path: ['schema'],
        }
    )

export type CreateImportSourceSchema = z.infer<typeof createImportSourceSchema>
