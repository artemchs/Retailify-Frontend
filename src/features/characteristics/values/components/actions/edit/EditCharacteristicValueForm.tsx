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
import { CharacteristicValue } from '@/types/entities/Characteristic'
import AsyncInput from '@/components/forms/AsyncInput'
import { editCharacteristicValueFormSchema } from '../../../types/edit-characteristic-value-form-schema'
import { characteristicValue } from '../../shared/placeholders'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  value?: CharacteristicValue
  id: string
  isLoading: boolean
  isError: boolean
  characteristicId: string
}

export default function EditCharacteristicValueForm({
  setIsOpened,
  id,
  isError,
  isLoading,
  characteristicId,
  value,
}: Props) {
  const form = useForm<z.infer<typeof editCharacteristicValueFormSchema>>({
    resolver: zodResolver(editCharacteristicValueFormSchema),
    defaultValues: {
      value: value?.value,
    },
  })

  function defaultOnSuccess() {
    setIsOpened(false)
    toast('Значение характеристики было успешно отредактировано.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Characteristics.useEditValue({
    setErrorMessage,
    onSuccess: defaultOnSuccess,
    id,
    characteristicId,
  })

  function onSubmit(values: z.infer<typeof editCharacteristicValueFormSchema>) {
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
                  <AsyncInput
                    input={
                      <Input placeholder={characteristicValue} {...field} />
                    }
                    isError={isError}
                    isLoading={isLoading}
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
