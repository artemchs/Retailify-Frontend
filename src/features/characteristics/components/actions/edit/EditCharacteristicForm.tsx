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
import AsyncInput from '@/components/forms/AsyncInput'
import { editCharacteristicFormSchema } from '@/features/characteristics/types/edit-characteristic-form-schema'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  characteristic?: Characteristic
  id: string
  isLoading: boolean
  isError: boolean
  selectedValues?: Characteristic[]
  setSelectedValues?: (newValues?: Characteristic[]) => void
}

export default function EditCharacteristicForm({
  setIsOpened,
  id,
  isError,
  isLoading,
  characteristic,
  selectedValues,
  setSelectedValues,
}: Props) {
  const form = useForm<z.infer<typeof editCharacteristicFormSchema>>({
    resolver: zodResolver(editCharacteristicFormSchema),
    defaultValues: {
      name: characteristic?.name,
    },
  })

  function defaultOnSuccess(data: Characteristic) {
    setIsOpened(false)
    toast('Характеристика была успешно отредактирована.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    if (setSelectedValues && selectedValues && selectedValues.length >= 1) {
      const isSelected = selectedValues.find((obj) => obj.id === id)
      if (isSelected) {
        const newArray = selectedValues
        const index = newArray.findIndex((obj) => obj.id === id)
        newArray[index] = data
        setSelectedValues(newArray)
      }
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Characteristics.useEdit({
    setErrorMessage,
    onSuccess: defaultOnSuccess,
    id,
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
                  <AsyncInput
                    input={
                      <Input placeholder={characteristicName} {...field} />
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
