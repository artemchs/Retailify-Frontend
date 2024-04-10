import { FullPointOfSale } from '@/types/entities/PointOfSale'
import { AlertDestructive } from '@/components/AlertDestructive'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
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
import PointsOfSale from '@/api/services/PointsOfSale'
import FormLabelForRequiredFields from '@/components/forms/FormLabelForRequiredFields'
import { Input } from '@/components/ui/input'
import { posAddress, posName } from '../../shared/placeholders'
import ProductTagsCombobox from '@/features/product-tags/components/shared/ProductTagsCombobox'
import { Label } from '@/components/ui/label'
import EmployeesCombobox from '@/features/employees/components/EmployeesCombobox'
import CategoryGroupsComboboxMultiple from '@/features/category-groups/components/shared/CategoryGroupsComboboxMultiple'
import CategoriesComboboxMultiple from '@/features/categories/components/shared/CategoriesComboboxMultiple'
import { editPosFormSchema } from '@/features/points-of-sale/types/edit-point-of-sale-form-schema'
import AsyncInput from '@/components/forms/AsyncInput'
import SelectWarehouse from '@/features/warehouses/components/shared/SelectWarehouse'

type Props = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  data?: FullPointOfSale
  isLoading: boolean
  isError: boolean
}

export default function EditPosForm({
  setIsOpened,
  id,
  isError,
  isLoading,
  data,
}: Props) {
  const form = useForm<z.infer<typeof editPosFormSchema>>({
    resolver: zodResolver(editPosFormSchema),
    defaultValues: {
      name: data?.name,
      address: data?.address,
      cashiers: data?.cashiers ?? [],
      categoryGroups: data?.categoryGroups ?? [],
      categories: data?.categories ?? [],
      productTags: data?.productTags ?? [],
      warehouseId: data?.warehouse?.id,
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Точка продаж была успешно отредактирована.', {
      icon: <Edit className='h-4 w-4' />,
      cancel: {
        label: 'Ок',
        onClick() {
          toast.dismiss
        },
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = PointsOfSale.useEdit({
    setErrorMessage,
    onSuccess,
    id,
  })

  function onSubmit(values: z.infer<typeof editPosFormSchema>) {
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
                  <AsyncInput
                    input={<Input placeholder={posName} {...field} />}
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
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Адрес' />
                <FormControl>
                  <AsyncInput
                    input={<Input placeholder={posAddress} {...field} />}
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
            name='warehouseId'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Склад' />
                <FormControl>
                  <AsyncInput
                    input={
                      <SelectWarehouse
                        field={field}
                        form={form}
                        fieldName='warehouseId'
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
          <FormField
            control={form.control}
            name='cashiers'
            render={({ field }) => (
              <FormItem>
                <FormLabelForRequiredFields text='Кассиры' />
                <FormControl>
                  <AsyncInput
                    input={
                      <EmployeesCombobox
                        field={field}
                        form={form}
                        fieldName='cashiers'
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
                  <AsyncInput
                    input={
                      <ProductTagsCombobox
                        field={field}
                        form={form}
                        formFieldName='productTags'
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
          <FormField
            control={form.control}
            name='categoryGroups'
            render={({ field }) => (
              <FormItem>
                <Label>Группы категорий товара:</Label>
                <FormControl>
                  <AsyncInput
                    input={
                      <CategoryGroupsComboboxMultiple
                        field={field}
                        form={form}
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
          <FormField
            control={form.control}
            name='categories'
            render={({ field }) => (
              <FormItem>
                <Label>Категории товара:</Label>
                <FormControl>
                  <AsyncInput
                    input={
                      <CategoriesComboboxMultiple field={field} form={form} />
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
