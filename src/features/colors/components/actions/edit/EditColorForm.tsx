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
import AsyncInput from '@/components/forms/AsyncInput'
import { Color } from '@/types/entities/Color'
import { editColorFormSchema } from '@/features/colors/types/edit-color-form-schema'
import Colors from '@/api/services/Colors'
import { colorName, color as colorPlaceholder } from '../../shared/placeholders'
import { CreateColorDialogProps } from '../create/CreateColorDialog'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  color?: Color
  id: string
  isLoading: boolean
  isError: boolean
} & CreateColorDialogProps

export default function EditColorForm({
  setIsOpened,
  id,
  isError,
  isLoading,
  color,
  selectedValues,
  setSelectedValues,
}: Props) {
  const form = useForm<z.infer<typeof editColorFormSchema>>({
    resolver: zodResolver(editColorFormSchema),
    defaultValues: {
      name: color?.name,
      color: color?.color,
    },
  })

  function defaultOnSuccess(data: Color) {
    setIsOpened(false)
    toast('Цвет был успешно отредактирован.', {
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
        console.log('Selected!')
        const newArray = selectedValues
        const index = newArray.findIndex((obj) => obj.id === id)
        newArray[index] = { ...newArray[index], name: data.name }
        setSelectedValues(newArray)
      }
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Colors.useEdit({
    setErrorMessage,
    onSuccess: defaultOnSuccess,
    id,
  })

  function onSubmit(values: z.infer<typeof editColorFormSchema>) {
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
                    input={<Input placeholder={colorName} {...field} />}
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
            name='color'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Цвет' />
                <FormControl>
                  <AsyncInput
                    input={
                      <Input
                        type='color'
                        placeholder={colorPlaceholder}
                        {...field}
                      />
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
