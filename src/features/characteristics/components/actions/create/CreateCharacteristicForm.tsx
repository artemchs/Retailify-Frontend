import Characteristics from '@/api/services/Characteristics'
import SaveButton from '@/components/forms/SaveButton'
import { createCharacteristicFormSchema } from '@/features/characteristics/types/create-characteristic-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { AlertDestructive } from '@/components/AlertDestructive'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import { characteristicName } from '@/features/characteristics/placeholders'
import { Characteristic } from '@/types/entities/Characteristic'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  selectedValues?: Characteristic[]
  setSelectedValues?: (newValues: Characteristic[]) => void
}

export default function CreateCharacteristicForm({
  setIsOpened,
  selectedValues,
  setSelectedValues,
}: Props) {
  const form = useForm<z.infer<typeof createCharacteristicFormSchema>>({
    resolver: zodResolver(createCharacteristicFormSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSuccess(data: Characteristic) {
    setIsOpened(false)
    toast('Новая характеристика была успешно добавлена.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    if (setSelectedValues) {
      const newArray = selectedValues ?? []
      newArray.push(data)
      setSelectedValues(newArray)
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Characteristics.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createCharacteristicFormSchema>) {
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
                  <Input placeholder={characteristicName} {...field} />
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
