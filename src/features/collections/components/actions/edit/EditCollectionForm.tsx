import Collections from '@/api/services/Collections'
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
import { editCollectionFormSchema } from '@/features/collections/types/edit-collection-form-schema'
import { Collection } from '@/types/entities/Collection'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-dropdown-menu'
import { LibraryBig } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { collectionName } from '../../shared/placeholders'
import AsyncInput from '@/components/forms/AsyncInput'
import { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { Characteristic } from '@/types/entities/Characteristic'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  collection?: Collection
  id: string
  isLoading: boolean
  isError: boolean
  characteristics: UseQueryResult<Characteristic[], Error>
}

export default function EditCollectionForm({
  id,
  isError,
  isLoading,
  setIsOpened,
  collection,
  characteristics,
}: Props) {
  const form = useForm<z.infer<typeof editCollectionFormSchema>>({
    resolver: zodResolver(editCollectionFormSchema),
    defaultValues: {
      name: collection?.name,
      characteristics: characteristics?.data ?? [],
      parentId: collection?.parentId ? collection.parentId : undefined,
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Коллекция была успешно отредактироана.', {
      icon: <LibraryBig className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Collections.useEdit({
    setErrorMessage,
    onSuccess,
    id,
  })

  function onSubmit(values: z.infer<typeof editCollectionFormSchema>) {
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
                    input={<Input placeholder={collectionName} {...field} />}
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
