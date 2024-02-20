import Products from '@/api/services/Products'
import { editProductFormSchema } from '@/features/products/types/edit-product-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Tags } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { AlertDestructive } from '@/components/AlertDestructive'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import TitleInput from '../../shared/TitleInput'
import SelectSeason from '../../shared/SelectSeason'
import SelectGender from '../../shared/SelectGender'
import BrandsCombobox from '@/features/brands/components/shared/BrandsCombobox'
import CategoriesCombobox from '@/features/categories/components/shared/CategoriesCombobox'
import ColorsCombobox from '@/features/colors/components/shared/ColorsCombobox'
import { Input } from '@/components/ui/input'
import SaveButton from '@/components/forms/SaveButton'
import CharacteristicsInput from '../../shared/characteristics/CharacteristicsInput'
import TextEditor from '../../shared/text-editor/TextEditor'
import UploadMediaInput from '../../shared/media/UploadMediaInput'
import { Product } from '@/types/entities/Product'
import VariantsInput from '../../shared/variants/VariantsInput'

type Props = {
  productId: string
  product?: Product
}

export default function EditProductForm({ productId, product }: Props) {
  const form = useForm<z.infer<typeof editProductFormSchema>>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      title: product?.title,
      characteristicValues: product?.characteristicValues
        ? product?.characteristicValues.map(({ characteristicId, id }) => ({
            characteristicId: characteristicId ?? undefined,
            id: id ?? undefined,
          }))
        : [],
      categoryId: product?.categoryId ?? '',
      colors: product?.colors
        ? product.colors.map(({ colorId, index, color }) => ({
            id: colorId,
            index,
            name: color?.name,
          }))
        : [],
      variants: product?.variants
        ? product.variants.map(({ id, isArchived, price, sale, size }) => ({
            id,
            isArchived,
            price,
            sale: sale ?? undefined,
            size,
          }))
        : [],
      description: product?.description ? product.description : '',
      media: product?.media ?? [],
      packagingHeight: product?.packagingHeight,
      packagingLength: product?.packagingLength,
      packagingWeight: product?.packagingWeight,
      packagingWidth: product?.packagingWidth,
      gender: product?.gender,
      season: product?.season,
      brandId: product?.brandId ?? '',
    },
  })

  function onSuccess() {
    toast('Модель товара была успешно отредактирована.', {
      icon: <Tags className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Products.useEdit({
    setErrorMessage,
    onSuccess,
    id: productId,
  })

  function onSubmit(values: z.infer<typeof editProductFormSchema>) {
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
        <form className='flex flex-col gap-4'>
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
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <TitleInput
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
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Описание' />
                <FormControl>
                  <TextEditor field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col lg:flex-row gap-4'>
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
          </div>
          <div className='flex flex-col lg:flex-row gap-4'>
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
          </div>
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
            name='characteristicValues'
            render={({ field }) => (
              <FormItem>
                <Label>Характеристики:</Label>
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
          <div className='flex flex-col lg:flex-row gap-4'>
            <FormField
              control={form.control}
              name='packagingHeight'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabelForRequiredFields text='Высота упаковки' />
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
                  <FormLabelForRequiredFields text='Длина упаковки' />
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
                  <FormLabelForRequiredFields text='Ширина упаковки' />
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
                  <FormLabelForRequiredFields text='Вес упаковки' />
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='variants'
            render={({ field }) => (
              <FormItem>
                <Label>Размеры товара:</Label>
                <FormControl>
                  <VariantsInput
                    field={field}
                    form={form}
                    productId={productId}
                  />
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
