import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ControllerRenderProps } from 'react-hook-form'
import { Variant } from './ProductVariantsTable'
import { CurrencyFormatter } from '@/components/ui/units'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, 'variants'>
}

export default function DisplayTotalCost({ field }: Props) {
  const variants = field.value as Variant[]
  const totalCost =
    variants.length >= 1
      ? variants
          .map(({ receivedQuantity, supplierPrice }) =>
            !isNaN(receivedQuantity) && !isNaN(supplierPrice)
              ? receivedQuantity * supplierPrice
              : 0
          )
          .reduce((prev, curr) => prev + curr)
      : 0

  return (
    <Card className='rounded-md shadow-sm'>
      <CardHeader>
        <CardTitle>Итоговая стоимость</CardTitle>
        <CardDescription>Общая стоимость всех вариантов товара</CardDescription>
      </CardHeader>
      {/* <CardContent className='flex flex-col gap-2'>
        <span className='font-medium text-sm'>Корректировка затрат:</span>
        <div className='flex w-full items-center justify-between'>
          <span className='text-sm'>Доставка</span>
          <CurrencyFormatter value={0} className='text-sm' />
        </div>
      </CardContent> */}
      <CardFooter>
        <div className='flex items-center justify-between w-full'>
          <span>Стоимость:</span>
          <CurrencyFormatter value={totalCost} className='font-medium' />
        </div>
      </CardFooter>
    </Card>
  )
}
