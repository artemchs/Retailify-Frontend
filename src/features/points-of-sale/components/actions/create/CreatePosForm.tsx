import { AlertDestructive } from '@/components/AlertDestructive'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
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
import SaveButton from '@/components/forms/SaveButton'
import { createPosFormSchema } from '@/features/points-of-sale/types/create-point-of-sale-form-schema'
import PointsOfSale from '@/api/services/PointsOfSale'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import { posAddress, posName } from '../../shared/placeholders'
import ProductTagsCombobox from '@/features/product-tags/components/shared/ProductTagsCombobox'
import { Label } from '@/components/ui/label'
import EmployeesCombobox from '@/features/employees/components/EmployeesCombobox'
import CategoryGroupsComboboxMultiple from '@/features/category-groups/components/shared/CategoryGroupsComboboxMultiple'
import CategoriesComboboxMultiple from '@/features/categories/components/shared/CategoriesComboboxMultiple'
import SelectWarehouse from '@/features/warehouses/components/shared/SelectWarehouse'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreatePosForm({ setIsOpened }: Props) {
  const form = useForm<z.infer<typeof createPosFormSchema>>({
    resolver: zodResolver(createPosFormSchema),
    defaultValues: {
      name: '',
      address: '',
      cashiers: [],
      categoryGroups: [],
      categories: [],
      productTags: [],
      warehouseId: '',
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Новая точка продаж была успешно добавлена.', {
      icon: <Plus className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = PointsOfSale.useCreate({
    setErrorMessage,
    onSuccess,
  })

  function onSubmit(values: z.infer<typeof createPosFormSchema>) {
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Название' />
                <FormControl>
                  <Input placeholder={posName} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Адрес' />
                <FormControl>
                  <Input placeholder={posAddress} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='warehouseId'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Склад' />
                <FormControl>
                  <SelectWarehouse
                    field={field}
                    form={form}
                    fieldName='warehouseId'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cashiers'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Кассиры' />
                <FormControl>
                  <EmployeesCombobox
                    field={field}
                    form={form}
                    fieldName='cashiers'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col'>
            <h3 className='font-medium'>Дополнительные фильтры товара</h3>
            <p className='text-muted-foreground text-sm'>
              Оставьте инпут пустым, что-бы не делать фильтровку по нему.
            </p>
          </div>
          <FormField
            control={form.control}
            name='productTags'
            render={({ field }) => (
              <FormItem>
                <Label>Теги товара:</Label>
                <FormControl>
                  <ProductTagsCombobox
                    field={field}
                    form={form}
                    formFieldName='productTags'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='categoryGroups'
            render={({ field }) => (
              <FormItem>
                <Label>Группы категорий товара:</Label>
                <FormControl>
                  <CategoryGroupsComboboxMultiple field={field} form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='categories'
            render={({ field }) => (
              <FormItem>
                <Label>Категории товара:</Label>
                <FormControl>
                  <CategoriesComboboxMultiple field={field} form={form} />
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
