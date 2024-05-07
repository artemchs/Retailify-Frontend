import { productTitle } from './placeholders'
import {
  Control,
  ControllerRenderProps,
  UseFormReturn,
  useWatch,
} from 'react-hook-form'
import Brands from '@/api/services/Brands'
import Categories from '@/api/services/Categories'
import { useEffect } from 'react'
import Colors from '@/api/services/Colors'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'title'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
  sku?: string
}

export default function DisplayTitle({ field, form, control, sku }: Props) {
  const [genderValue, brandId, categoryId, colors] = useWatch({
    control,
    name: ['gender', 'brandId', 'categoryId', 'colors'],
  })

  const gender =
    genderValue === 'MALE'
      ? 'для хлопчиків'
      : genderValue === 'FEMALE'
      ? 'для дівчаток'
      : 'унісекс'
  const brand = Brands.useFindOne({ id: brandId })
  const category = Categories.useFindOne({ id: categoryId })
  const primaryColor = Colors.useFindOne({ id: colors?.[0]?.id })

  const categoryName = category?.data?.productName
    ? category?.data?.productName
    : ''
  const brandName = brand?.data?.name ? brand.data?.name : ''
  const primaryColorName = primaryColor.data?.name ? primaryColor.data.name : ''

  const title = [categoryName, gender, brandName, primaryColorName, sku].join(' ')

  useEffect(() => {
    form.setValue('title', title)
  }, [title, form])

  const isLoading =
    (brand ? brand.isLoading : false) || (category ? category.isLoading : false)
  const isError =
    (brand ? brand.isError : false) || (category ? category.isError : false)

  if (isLoading) {
    return <Skeleton className='w-72 h-7' />
  }

  if (isError) {
    return <span className='text-destructive'>Произошла ошибка :(</span>
  }

  return (
    <div className='flex w-full'>
      {field.value ? (
        <span className='text-lg font-semibold'>{field.value}</span>
      ) : (
        <span className='text-muted-foreground text-lg'>{productTitle}</span>
      )}
    </div>
  )
}
