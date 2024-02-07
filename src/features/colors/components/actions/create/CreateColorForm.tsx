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
import { createColorFormSchema } from '@/features/colors/types/create-color-form-schema'
import Colors from '@/api/services/Colors'
import { color, colorName } from '../../shared/placeholders'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateColorForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createColorFormSchema>>({
    resolver: zodResolver(createColorFormSchema),
    defaultValues: {
      name: '',
      color: '#000000',
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новый цвет был успешно добавлен.', {
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Colors.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createColorFormSchema>) {
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
                  <Input placeholder={colorName} {...field} />
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
                  <Input type='color' placeholder={color} {...field} />
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
