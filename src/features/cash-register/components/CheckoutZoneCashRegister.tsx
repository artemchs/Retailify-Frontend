import { Button } from '@/components/ui/button'
import { CurrencyFormatter } from '@/components/ui/units'
import {
  CashRegisterRowSelectionState,
  CashRegisterSelectedProductState,
} from '@/pages/CashRegister'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ArrowRight, X } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function CheckoutZoneCashRegister({
  selectedProducts,
  setSelectedProducts,
  rowSelection,
  setRowSelection,
}: CashRegisterSelectedProductState & CashRegisterRowSelectionState) {
  return (
    <div className='flex flex-col gap-4 h-full justify-between max-h-full overflow-y-auto'>
      <div className='flex flex-col gap-4 max-h-full overflow-y-auto'>
        <SelectCustomer />
        <div className='max-h-full overflow-y-auto'>
          <ProductsList
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </div>
        <div className='flex items-center justify-between font-medium text-lg'>
          <span>Общая сумма:</span>
          {selectedProducts && selectedProducts.length >= 1 ? (
            <CurrencyFormatter
              value={selectedProducts
                .map(({ price, quantity }) => price * (quantity ?? 1))
                .reduce((prev, curr) => prev + curr)}
            />
          ) : (
            <CurrencyFormatter value={0} />
          )}
        </div>
      </div>
      <CheckoutButton />
    </div>
  )
}

function SelectCustomer() {
  return (
    <Button
      variant='outline'
      role='combobox'
      className='w-full justify-between'
      type='button'
    >
      Выберите клиента...
      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
    </Button>
  )
}

function ProductsList({
  selectedProducts,
  setSelectedProducts,
  rowSelection,
  setRowSelection,
}: CashRegisterSelectedProductState & CashRegisterRowSelectionState) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Размер</TableHead>
          <TableHead className='text-right'>Количество</TableHead>
          <TableHead className='text-right'>Цена</TableHead>
          <TableHead className='text-right'>Убрать</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedProducts.map((variant, i) => (
          <TableRow key={variant.id}>
            <TableCell className='font-medium'>
              {variant.product.title}
            </TableCell>
            <TableCell>{variant.size}</TableCell>
            <TableCell>
              <div className='flex w-full gap-1 items-center justify-center'>
                <Button
                  className='h-8 w-8'
                  size='icon'
                  variant='ghost'
                  disabled={!variant.quantity || variant.quantity === 1}
                  onClick={() => {
                    if (variant.quantity && variant.quantity > 1) {
                      const newArray = [...selectedProducts]
                      newArray[i] = {
                        ...newArray[i],
                        quantity: variant.quantity - 1,
                      }
                      setSelectedProducts(newArray)
                    }
                  }}
                >
                  -
                </Button>
                {variant?.quantity ?? 1}
                <Button
                  className='h-8 w-8'
                  size='icon'
                  variant='ghost'
                  onClick={() => {
                    const newArray = [...selectedProducts]
                    newArray[i] = {
                      ...newArray[i],
                      quantity: (variant.quantity ?? 1) + 1,
                    }
                    setSelectedProducts(newArray)
                  }}
                >
                  +
                </Button>
              </div>
            </TableCell>
            <TableCell className='text-right'>
              <CurrencyFormatter value={variant.price} />
            </TableCell>
            <TableCell>
              <div className='w-full flex items-center justify-end'>
                <Button
                  size='icon'
                  className='h-8 w-8'
                  variant='ghost'
                  onClick={() => {
                    delete rowSelection[variant.id]
                    setRowSelection({ ...rowSelection })
                  }}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function CheckoutButton() {
  return (
    <Button type='button'>
      <ArrowRight className='h-4 w-4 mr-2' />
      Перейти к оплате
    </Button>
  )
}
