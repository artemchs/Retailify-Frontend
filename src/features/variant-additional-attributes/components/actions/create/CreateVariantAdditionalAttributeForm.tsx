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
import { zodResolver } from '@hookform/resolvers/zod'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import SaveButton from '@/components/forms/SaveButton'
import { ProductTag } from '@/types/entities/ProductTag'
import { CreateVariantAdditionalAttributeDialogProps } from './CreateVariantAdditionalAttributeDialog'
import { createVariantAdditionalAttributeFormSchema } from '@/features/variant-additional-attributes/types/create-variant-additiona-attribute-form-schema'
import VariantAdditionalAttributes from '@/api/services/VariantAdditionalAttributes'
import { variantAdditionalAttributeName } from '../../shared/placeholders'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
} & CreateVariantAdditionalAttributeDialogProps

export default function CreateVariantAdditionalAttributeForm({
  setIsOpened,
  selectedValue,
  setSelectedValue,
}: Props) {
  const form = useForm<
    z.infer<typeof createVariantAdditionalAttributeFormSchema>
  >({
    resolver: zodResolver(createVariantAdditionalAttributeFormSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSuccess(data: ProductTag) {
    setIsOpened(false)
    toast('Новый атрибут варианта был успешно добавлен.', {
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })

    if (setSelectedValue && (!selectedValue || selectedValue === '')) {
      setSelectedValue(data.id)
    }
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = VariantAdditionalAttributes().useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(
    values: z.infer<typeof createVariantAdditionalAttributeFormSchema>
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
                  <Input
                    placeholder={variantAdditionalAttributeName}
                    {...field}
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
