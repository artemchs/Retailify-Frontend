import Characteristics from '@/api/services/Characteristics'
import SaveButton from '@/components/forms/SaveButton'
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
import { createCharacteristicValueFormSchema } from '../../../types/create-characteristic-value-form-schema'
import { characteristicValue } from '../../shared/placeholders'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  characteristicId: string
}

export default function CreateCharacteristicValueForm({
  setIsOpened,
  characteristicId,
}: Props) {
  const form = useForm<z.infer<typeof createCharacteristicValueFormSchema>>({
    resolver: zodResolver(createCharacteristicValueFormSchema),
    defaultValues: {
      value: '',
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новое значени характеристики было успешно добавлено.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Characteristics.useCreateValue({
    setErrorMessage,
    onSuccess,
    characteristicId,
  })

  function onSubmit(
    values: z.infer<typeof createCharacteristicValueFormSchema>
  ) {
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
            name='value'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Значение' />
                <FormControl>
                  <Input placeholder={characteristicValue} {...field} />
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
