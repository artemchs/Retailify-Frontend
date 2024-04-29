import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Minus, Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ProductVariantsSchema } from '@/features/products/types/create-product-form-schema'
import RestoreVariantAlertDialog from './RestoreVariantAlertDialog'
import ArchiveVariantAlertDialog from './ArchiveVariantAlertDialog'
import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import SelectVariantAdditionalAttribute from '@/features/variant-additional-attributes/components/shared/SelectVariantAdditionalAttribute'
import { toast } from 'sonner'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'variants'>
  productId?: string
}

export default function VariantsInput({ field, form, productId }: Props) {
  const variants = field.value as ProductVariantsSchema
  function setVariants(newVariants: ProductVariantsSchema) {
    form.setValue('variants', newVariants)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (variants && additionalAttributeIds.length === 0) {
      const existingAdditionalAttributeIds = new Set<string>()

      for (const item of variants) {
        if (item.additionalAttributes && item.additionalAttributes.length > 0) {
          for (const attribute of item.additionalAttributes) {
            if (attribute.id) {
              existingAdditionalAttributeIds.add(attribute.id)
            }
          }
        }
      }

      setAdditionalAttributeIds(Array.from(existingAdditionalAttributeIds))
    }
  })

  const [additionalAttributeIds, setAdditionalAttributeIds] = useState<
    string[]
  >([])

  const [displayArchived, setDisplayArchived] = useState(false)

  const addNewVariant = () => {
    const prevVariant = variants?.at(-1)

    setVariants([
      ...(variants ?? []),
      {
        isArchived: false,
        size: '',
        price: prevVariant?.price,
      },
    ])
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='border border-input rounded-md'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='min-w-48'>Размер</TableHead>
              <TableHead className='min-w-48'>Цена продажи (грн)</TableHead>
              {additionalAttributeIds.map((additionalAttributeId, i) => (
                <TableHead>
                  <div className='flex gap-1 items-center w-60'>
                    <SelectVariantAdditionalAttribute
                      selectedValue={additionalAttributeId}
                      setSelectedValue={(id?: string) => {
                        const newArray = [...additionalAttributeIds]
                        const newVariants = variants
                        if (id) {
                          if (!additionalAttributeIds.includes(id)) {
                            setVariants(
                              newVariants?.map((obj) => {
                                const additionalAttributes =
                                  obj.additionalAttributes ?? []
                                additionalAttributes[i] = {
                                  id,
                                  value: '',
                                }

                                return {
                                  ...obj,
                                  additionalAttributes,
                                }
                              })
                            )

                            newArray[i] = id
                          } else {
                            toast.error(
                              'Этот атрибут уже выбран. Пожалуйста выберите другой атирбут или уберите эту колонку.'
                            )
                          }
                        } else {
                          setVariants(
                            newVariants?.map((obj) => {
                              const additionalAttributes =
                                obj.additionalAttributes ?? []
                              additionalAttributes[i] = {
                                id: '',
                                value: '',
                              }

                              return {
                                ...obj,
                                additionalAttributes,
                              }
                            })
                          )

                          newArray[i] = ''
                        }
                        setAdditionalAttributeIds(newArray)
                      }}
                      sm={true}
                    />
                    <Button
                      size='icon'
                      variant='outline'
                      className='h-8 w-8 shrink-0'
                      type='button'
                      onClick={() => {
                        const newArray = [...additionalAttributeIds]
                        const newVariants = variants

                        setVariants(
                          newVariants?.map((obj) => {
                            const additionalAttributes =
                              obj.additionalAttributes ?? []
                            additionalAttributes.splice(i, 1)

                            return {
                              ...obj,
                              additionalAttributes,
                            }
                          })
                        )

                        newArray.splice(i, 1)

                        setAdditionalAttributeIds(newArray)
                      }}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                </TableHead>
              ))}
              <TableHead className='w-8'>
                <Button
                  type='button'
                  size='icon'
                  variant='ghost'
                  onClick={() => {
                    if (
                      additionalAttributeIds.at(-1) ||
                      additionalAttributeIds.length === 0
                    ) {
                      setAdditionalAttributeIds([...additionalAttributeIds, ''])
                    }
                  }}
                  className='h-8 w-8'
                >
                  <Plus className='h-4 w-4' />
                </Button>
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants?.map(
              (v, i) =>
                v.isArchived === displayArchived && (
                  <TableRow key={i}>
                    <TableCell>
                      <Input
                        value={v.size}
                        onChange={(e) => {
                          const newArray = variants
                          newArray[i].size = e.target.value
                          setVariants(newArray)
                        }}
                        className='bg-background'
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={v.price}
                        onChange={(e) => {
                          const newArray = variants
                          newArray[i].price = parseFloat(e.target.value)
                          setVariants(newArray)
                        }}
                        type='number'
                        className='bg-background'
                      />
                    </TableCell>
                    {v.additionalAttributes?.map(
                      ({ id, value }, attributeIndex) => (
                        <TableCell className='w-60'>
                          <Input
                            value={value}
                            onChange={(e) => {
                              const newValue = e.target.value

                              setVariants(
                                variants.map((obj, variantIndex) => {
                                  if (
                                    variantIndex === i &&
                                    obj.additionalAttributes?.[attributeIndex]
                                  ) {
                                    obj.additionalAttributes[attributeIndex] = {
                                      id,
                                      value: newValue,
                                    }
                                  }

                                  return obj
                                })
                              )
                            }}
                            className='bg-background'
                          />
                        </TableCell>
                      )
                    )}
                    <TableCell></TableCell>
                    <TableCell>
                      {v.id ? (
                        productId && v.isArchived ? (
                          <RestoreVariantAlertDialog
                            id={v.id}
                            productId={productId}
                            callback={() => {
                              const newVariants = variants
                              newVariants[i].isArchived = false
                              setVariants(newVariants)
                            }}
                          />
                        ) : (
                          productId && (
                            <ArchiveVariantAlertDialog
                              id={v.id}
                              productId={productId}
                              callback={() => {
                                const newVariants = variants
                                newVariants[i].isArchived = true
                                setVariants(newVariants)
                              }}
                            />
                          )
                        )
                      ) : (
                        <Button
                          size='icon'
                          className='h-8 w-8'
                          variant='secondary'
                          type='button'
                          onClick={() => {
                            const newArray = variants
                            newArray.splice(i)
                            setVariants(newArray)
                          }}
                        >
                          <Minus className='h-4 w-4' />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
            )}
            {variants?.filter(
              ({ isArchived }) => isArchived === displayArchived
            )?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className='h-24 flex items-center justify-center text-muted-foreground'>
                    Тут ничего нет...
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between'>
        <Button type='button' variant='outline' onClick={addNewVariant}>
          <Plus className='h-4 w-4 mr-2' />
          Добавить размер
        </Button>
        <div className='flex items-center gap-2'>
          <Label htmlFor='archived-variants'>Архив</Label>
          <Switch
            onClick={() => setDisplayArchived(!displayArchived)}
            value={String(displayArchived)}
            id='archived-variants'
          />
        </div>
      </div>
    </div>
  )
}
