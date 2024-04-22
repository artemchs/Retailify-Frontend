import { AlertDestructive } from '@/components/AlertDestructive'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import SaveButton from '@/components/forms/SaveButton'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import CharacteristicsCombobox from '@/features/characteristics/components/shared/CharacteristicsCombobox'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-dropdown-menu'
import { LibraryBig } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import AsyncInput from '@/components/forms/AsyncInput'
import { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { Characteristic } from '@/types/entities/Characteristic'
import { Category } from '@/types/entities/Category'
import { editCategoryFormSchema } from '@/features/categories/types/edit-category-form-schema'
import CategoryGroupsCombobox from '@/features/category-groups/components/shared/CategoryGroupsCombobox'
import { categoryName, categoryProductName } from '../../shared/placeholders'
import Categories from '@/api/services/Categories'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  category?: Category
  id: string
  isLoading: boolean
  isError: boolean
  characteristics: UseQueryResult<Characteristic[], Error>
}

export default function EditCategoryForm({
  id,
  isError,
  isLoading,
  setIsOpened,
  category,
  characteristics,
}: Props) {
  const form = useForm<z.infer<typeof editCategoryFormSchema>>({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: {
      name: category?.name,
      productName: category?.productName,
      groupId: category?.groupId ? category.groupId : undefined,
      characteristics: characteristics?.data ?? [],
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Категория была успешно отредактироана.', {
      icon: <LibraryBig className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Categories.useEdit({
    setErrorMessage,
    onSuccess,
    id,
  })

  function onSubmit(values: z.infer<typeof editCategoryFormSchema>) {
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <AsyncInput
                    input={<Input placeholder={categoryName} {...field} />}
                    isError={isError}
                    isLoading={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='productName'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название для товара' />
                <FormControl>
                  <AsyncInput
                    input={
                      <Input placeholder={categoryProductName} {...field} />
                    }
                    isError={isError}
                    isLoading={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='groupId'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Группа' />
                <FormControl>
                  <AsyncInput
                    input={<CategoryGroupsCombobox field={field} form={form} />}
                    isError={isError}
                    isLoading={isLoading}
                  />
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
                <Label>Характеристики</Label>
                <AsyncInput
                  input={<CharacteristicsCombobox field={field} form={form} />}
                  isError={characteristics.isError}
                  isLoading={characteristics.isLoading}
                />
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
