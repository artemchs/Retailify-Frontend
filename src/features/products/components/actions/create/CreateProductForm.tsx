import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Tags } from 'lucide-react'
import { useState } from 'react'
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
import UploadMediaInput from '../../shared/media/UploadMediaInput'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import TextEditor from '../../shared/text-editor/TextEditor'
import SelectSeason from '../../shared/SelectSeason'
import SelectGender from '../../shared/SelectGender'
import BrandsCombobox from '@/features/brands/components/shared/BrandsCombobox'
import CategoriesCombobox from '@/features/categories/components/shared/CategoriesCombobox'
import TitleInput from '../../shared/TitleInput'
import ColorsCombobox from '@/features/colors/components/shared/ColorsCombobox'

export default function CreateProductForm() {
  const form = useForm<z.infer<typeof createProductFormSchema>>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      title: '',
      characteristics: [],
      categoryId: '',
      colors: [],
      description: '',
      media: [
        {
          id: 'products/7e5fedd0-9131-48ad-bac3-df4a2e99ad47',
          index: 0,
        },
        {
          id: 'products/9dd14b14-c86e-40a8-9908-c21933646834',
          index: 1,
        },
      ],
      packagingHeight: 0,
      packagingLength: 0,
      packagingWeight: 0,
      packagingWidth: 0,
      gender: 'UNISEX',
      season: 'ALL_SEASON',
    },
  })

  function onSuccess() {
    toast('Новая модель товара была успешно добавлена.', {
      icon: <Tags className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Products.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createProductFormSchema>) {
    mutate({ body: values })
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
            name='description'
            render={({ field }) => (
              <FormItem>
                <Label>Описание:</Label>
                <FormControl>
                  <TextEditor field={field} form={form} />
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
