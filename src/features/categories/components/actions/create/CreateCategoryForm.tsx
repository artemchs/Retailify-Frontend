import { AlertDestructive } from '@/components/AlertDestructive'
import { zodResolver } from '@hookform/resolvers/zod'
import { LibraryBig } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import SaveButton from '@/components/forms/SaveButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CharacteristicsCombobox from '@/features/characteristics/components/shared/CharacteristicsCombobox'
import { createCategoryFormSchema } from '@/features/categories/types/create-category-form-schema'
import { categoryName, categoryProductName } from '../../shared/placeholders'
import CategoryGroupsCombobox from '@/features/category-groups/components/shared/CategoryGroupsCombobox'
import Categories from '@/api/services/Categories'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateCategoryForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createCategoryFormSchema>>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      name: '',
      groupId: '',
      productName: '',
      characteristics: [],
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новая категория была успешно добавлена.', {
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
  const { mutate, isPending } = Categories.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createCategoryFormSchema>) {
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
                  <Input placeholder={categoryName} {...field} />
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
                  <Input placeholder={categoryProductName} {...field} />
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
                  <CategoryGroupsCombobox field={field} form={form} />
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
                <CharacteristicsCombobox field={field} form={form} />
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
