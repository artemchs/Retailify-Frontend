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
import { CategoryGroup } from '@/types/entities/CategoryGroup'
import { editCategoryGroupFormSchema } from '@/features/category-groups/types/edit-category-group-form-schema'
import { categoryGroupName } from '../../shared/placeholders'
import CategoryGroups from '@/api/services/CategoryGroups'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  categoryGroup?: CategoryGroup
  id: string
  isLoading: boolean
  isError: boolean
  characteristics: UseQueryResult<Characteristic[], Error>
}

export default function EditCategoryGroupForm({
  id,
  isError,
  isLoading,
  setIsOpened,
  categoryGroup,
  characteristics,
}: Props) {
  const form = useForm<z.infer<typeof editCategoryGroupFormSchema>>({
    resolver: zodResolver(editCategoryGroupFormSchema),
    defaultValues: {
      name: categoryGroup?.name,
      characteristics: characteristics?.data ?? [],
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Группа категорий была успешно отредактироана.', {
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
  const { mutate, isPending } = CategoryGroups.useEdit({
    setErrorMessage,
    onSuccess,
    id,
  })

  function onSubmit(values: z.infer<typeof editCategoryGroupFormSchema>) {
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <AsyncInput
                    input={<Input placeholder={categoryGroupName} {...field} />}
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
