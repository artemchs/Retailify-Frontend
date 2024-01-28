import Collections from '@/api/services/Collections'
import { AlertDestructive } from '@/components/AlertDestructive'
import { createCollectionFormSchema } from '@/features/collections/types/create-collection-form-schema'
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
import { collectionName } from '../../shared/placeholders'
import { Label } from '@/components/ui/label'
import CharacteristicsCombobox from '@/features/characteristics/components/shared/CharacteristicsCombobox'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  parentId?: string
}

export default function CreateCollectionForm({ setIsOpened, parentId }: Props) {
  const form = useForm<z.infer<typeof createCollectionFormSchema>>({
    resolver: zodResolver(createCollectionFormSchema),
    defaultValues: {
      name: '',
      characteristics: [],
      parentId,
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новая коллекция была успешно добавлена.', {
      icon: <LibraryBig className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Collections.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createCollectionFormSchema>) {
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
                  <Input placeholder={collectionName} {...field} />
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
