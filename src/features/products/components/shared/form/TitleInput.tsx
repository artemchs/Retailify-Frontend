import { Input } from '@/components/ui/input'
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
import AsyncInput from '@/components/forms/AsyncInput'
import Colors from '@/api/services/Colors'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'title'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
}

export default function TitleInput({ field, form, control }: Props) {
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

  const title = [categoryName, gender, brandName, primaryColorName].join(' ')

  useEffect(() => {
    form.setValue('title', title)
  }, [title, form])

  const isLoading =
    (brand ? brand.isLoading : false) || (category ? category.isLoading : false)
  const isError =
    (brand ? brand.isError : false) || (category ? category.isError : false)

  return (
    <AsyncInput
      input={<Input placeholder={productTitle} {...field} readOnly />}
      isLoading={isLoading}
      isError={isError}
    />
  )
}
