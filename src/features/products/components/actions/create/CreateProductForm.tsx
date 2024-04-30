import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Tags } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AlertDestructive } from '@/components/AlertDestructive'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import SaveButton from '@/components/forms/SaveButton'
import { createProductFormSchema } from '@/features/products/types/create-product-form-schema'
import Products from '@/api/services/Products'
import { Label } from '@/components/ui/label'
import UploadMediaInput from '../../shared/form/media/UploadMediaInput'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import TextEditor from '../../shared/form/text-editor/TextEditor'
import SelectSeason from '../../shared/form/SelectSeason'
import SelectGender from '../../shared/form/SelectGender'
import BrandsCombobox from '@/features/brands/components/shared/BrandsCombobox'
import CategoriesCombobox from '@/features/categories/components/shared/CategoriesCombobox'
import DisplayTitle from '../../shared/form/DisplayTitle'
import ColorsCombobox from '@/features/colors/components/shared/ColorsCombobox'
import CharacteristicsInput from '../../shared/form/characteristics/CharacteristicsInput'
import { Input } from '@/components/ui/input'
import VariantsInput from '../../shared/form/variants/VariantsInput'
import ProductTagsCombobox from '@/features/product-tags/components/shared/ProductTagsCombobox'
import { useNavigate } from '@tanstack/react-router'
import AsyncInput from '@/components/forms/AsyncInput'
import { Product } from '@/types/entities/Product'
import transformCharacteristicValues from '../../shared/transformCharacteristicValues'

export default function CreateProductForm({ product }: { product?: Product }) {
  const form = useForm<z.infer<typeof createProductFormSchema>>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      title: product?.title ?? '',
      characteristics: product?.characteristicValues
        ? transformCharacteristicValues(product.characteristicValues)
        : [],
      categoryId: product?.categoryId ?? '',
      colors: product?.colors
        ? product.colors.map(({ colorId, index, color }) => ({
            id: colorId,
            index,
            name: color?.name ?? '',
          }))
        : [],
      variants: product?.variants
        ? product.variants.map(
            ({ id, isArchived, price, sale, size, additionalAttributes }) => ({
              id,
              isArchived,
              price,
              sale: sale ?? undefined,
              size,
              additionalAttributes: additionalAttributes.map(
                ({ additionalAttribute, value }) => ({
                  id: additionalAttribute.id,
                  value,
                })
              ),
            })
          )
        : [],
      description: product?.description ?? '',
      packagingHeight: product?.packagingHeight ?? 0,
      packagingLength: product?.packagingLength ?? 0,
      packagingWeight: product?.packagingWeight ?? 0,
      packagingWidth: product?.packagingWidth ?? 0,
      gender: product?.gender ?? 'UNISEX',
      season: product?.season ?? 'ALL_SEASON',
      brandId: product?.brandId ?? '',
      tags: product?.tags ?? [],
      media: [],
      supplierSku: '',
    },
  })

  useEffect(() => {
    form.reset({
      title: product?.title ?? '',
      characteristics: product?.characteristicValues
        ? transformCharacteristicValues(product.characteristicValues)
        : [],
      categoryId: product?.categoryId ?? '',
      colors: product?.colors
        ? product.colors.map(({ colorId, index, color }) => ({
            id: colorId,
            index,
            name: color?.name ?? '',
          }))
        : [],
      variants: product?.variants
        ? product.variants.map(
            ({ id, isArchived, price, sale, size, additionalAttributes }) => ({
              id,
              isArchived,
              price,
              sale: sale ?? undefined,
              size,
              additionalAttributes: additionalAttributes.map(
                ({ additionalAttribute, value }) => ({
                  id: additionalAttribute.id,
                  value,
                })
              ),
            })
          )
        : [],
      description: product?.description ?? '',
      packagingHeight: product?.packagingHeight ?? 0,
      packagingLength: product?.packagingLength ?? 0,
      packagingWeight: product?.packagingWeight ?? 0,
      packagingWidth: product?.packagingWidth ?? 0,
      gender: product?.gender ?? 'UNISEX',
      season: product?.season ?? 'ALL_SEASON',
      brandId: product?.brandId ?? '',
      tags: product?.tags ?? [],
      media: [],
      supplierSku: '',
    })
  }, [product, form])

  const sku = Products.useGenerateSku()

  const navigate = useNavigate()

  function onSuccess() {
    toast('Новая модель товара была успешно добавлена.', {
      icon: <Tags className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
    navigate({ to: '/products', search: { page: 1, rowsPerPage: 20 } })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Products.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createProductFormSchema>) {
    mutate({
      body: values,
    })
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      {errorMessage && errorMessage.length >= 1 && (
        <AlertDestructive text={errorMessage} />
      )}
      <Form {...form}>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='media'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='mediaInput'>Медиа:</Label>
                <FormControl>
                  <UploadMediaInput field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DisplayTitle
                    field={field}
                    form={form}
                    control={form.control}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Категория' />
                <FormControl>
                  <CategoriesCombobox field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='supplierSku'
            render={({ field }) => (
              <FormItem className='w-full'>
                <Label>Родной артикул:</Label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem className='w-full'>
            <Label>Артикул для магазина (автоматически создан):</Label>
            <FormControl>
              <AsyncInput
                input={<Input disabled value={sku.data} />}
                isError={sku.isError}
                isLoading={sku.isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name='colors'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Цвета' />
                <FormControl>
                  <ColorsCombobox field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Описание' />
                <FormControl>
                  <TextEditor
                    content={field.value}
                    setContent={(newValue) =>
                      form.setValue('description', newValue)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='season'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Сезон' />
                <SelectSeason field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Пол' />
                <SelectGender field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='brandId'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Бренд' />
                <FormControl>
                  <BrandsCombobox field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <Label>Дополнительные теги для модели товара:</Label>
                <FormControl>
                  <ProductTagsCombobox field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='characteristics'
            render={({ field }) => (
              <FormItem>
                <Label>Характеристики модели товара:</Label>
                <FormControl>
                  <CharacteristicsInput
                    control={form.control}
                    field={field}
                    form={form}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='variants'
            render={({ field }) => (
              <FormItem>
                <Label>Размеры товара:</Label>
                <FormControl>
                  <VariantsInput field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='packagingHeight'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Высота упаковки (см)' />
                <FormControl>
                  <Input {...field} type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='packagingLength'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Длина упаковки (см)' />
                <FormControl>
                  <Input {...field} type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='packagingWidth'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Ширина упаковки (см)' />
                <FormControl>
                  <Input {...field} type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='packagingWeight'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabelForRequiredFields text='Вес упаковки (кг)' />
                <FormControl>
                  <Input {...field} type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SaveButton isPending={isPending} form={form} onSubmit={onSubmit} />
        </form>
      </Form>
    </div>
  )
}
