import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Tags } from 'lucide-react'
import { useState } from 'react'
import { AlertDestructive } from '@/components/AlertDestructive'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import SaveButton from '@/components/forms/SaveButton'
import { createProductFormSchema } from '@/features/products/types/create-product-form-schema'
import Products from '@/api/services/Products'
import { Label } from '@/components/ui/label'
import UploadMediaInput from '../../media/UploadMediaInput'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateProductForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createProductFormSchema>>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      title: '',
      characteristics: [],
      collectionId: '',
      colors: [],
      description: '',
      media: [
        {
          id: 'products/7e5fedd0-9131-48ad-bac3-df4a2e99ad47',
          index: 0,
        },
        {
          id: 'products/9dd14b14-c86e-40a8-9908-c21933646834',
          index: 1,
        },
      ],
      packagingHeight: 0,
      packagingLength: 0,
      packagingWeight: 0,
      packagingWidth: 0,
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новая модель товара была успешно добавлена.', {
      icon: <Tags className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Products.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createProductFormSchema>) {
    mutate({ body: values })
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
            name='media'
            render={({ field }) => (
              <FormItem>
                <Label htmlFor='mediaInput'>Медиа:</Label>
                <FormControl>
                  <UploadMediaInput field={field} form={form} />
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
