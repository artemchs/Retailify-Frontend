import Refunds from '@/api/services/Refunds'
import { AlertDestructive } from '@/components/AlertDestructive'
import SaveButton from '@/components/forms/SaveButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { CurrencyFormatter } from '@/components/ui/units'
import { createRefundSchema } from '@/features/refunds/types/create-refund-schema'
import { FullOrder } from '@/types/entities/Order'
import { zodResolver } from '@hookform/resolvers/zod'
import { Minus, Plus, Undo2 } from 'lucide-react'
import { useState } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  id: string
  data: FullOrder
  shiftId: string
}

export default function CreateRefundDialog({ id, data, shiftId }: Props) {
  const [isOpened, setIsOpened] = useState(false)

  const form = useForm<z.infer<typeof createRefundSchema>>({
    resolver: zodResolver(createRefundSchema),
    defaultValues: {
      orderId: id,
      items: data.items.map(
        ({ id, quantity, vtw, pricePerItemWithDiscount }) => ({
          id,
          quantity,
          pricePerItemWithDiscount: pricePerItemWithDiscount
            ? parseFloat(pricePerItemWithDiscount)
            : 0,
          name: `${vtw?.variant?.product?.title} ${vtw?.variant?.size}`,
        })
      ),
    },
  })

  function onSuccess() {
    setIsOpened(false)
    toast('Возврат товара успешно создан.', {
      cancel: {
        label: 'Ок',
        onClick: toast.dismiss,
      },
    })
  }

  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, isPending } = Refunds.useCreate({
    setErrorMessage,
    onSuccess,
    shiftId,
  })

  function onSubmit(values: z.infer<typeof createRefundSchema>) {
    mutate({ body: values })
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button type='button'>
          <Undo2 className='h-4 w-4 mr-2' />
          Создать возврат
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать возврат на "{data.name}"</DialogTitle>
        </DialogHeader>
        {errorMessage && errorMessage.length >= 1 && (
          <AlertDestructive text={errorMessage} />
        )}
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name='items'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex flex-col h-full'>
                      {field.value.map(
                        ({ id, pricePerItemWithDiscount, quantity, name }) => (
                          <div
                            key={id}
                            className='p-2 border-b border-input flex flex-col h-full'
                          >
                            <span>{name}</span>
                            <div className='flex items-center justify-between w-full text-muted-foreground text-sm'>
                              <div className='flex items-center gap-1'>
                                <span>{quantity}</span>
                                x
                                <CurrencyFormatter
                                  value={pricePerItemWithDiscount ?? 0}
                                />
                              </div>
                              <CurrencyFormatter
                                value={
                                  pricePerItemWithDiscount
                                    ? pricePerItemWithDiscount * quantity
                                    : 0
                                }
                              />
                            </div>
                            <ItemQuantityCounter
                              form={form}
                              id={id}
                              orderQuantity={
                                data.items.find((obj) => obj.id === id)
                                  ?.quantity ?? 0
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <SaveButton form={form} onSubmit={onSubmit} isPending={isPending} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ItemQuantityCounter({
  id,
  form,
  orderQuantity,
}: {
  id: string
  form: UseFormReturn<
    {
      orderId: string
      items: {
        id: string
        quantity: number
        name?: string | undefined
        pricePerItemWithDiscount?: number | undefined
      }[]
    },
    unknown,
    undefined
  >
  orderQuantity: number
}) {
  const item = form.getValues('items').find((item) => item.id === id)

  const setQuantity = (value: number) => {
    const items = form.getValues('items')
    const index = items.findIndex((a) => a.id === id)

    items[index] = {
      ...items[index],
      quantity: value,
    }

    form.setValue('items', items)
  }

  const handleChange = (type: '+' | '-') => {
    if (type === '+' && (item?.quantity ?? 0) < orderQuantity) {
      setQuantity((item?.quantity ?? 0) + 1)
    } else if (type === '-' && (item?.quantity ?? 0) > 0) {
      setQuantity((item?.quantity ?? 0) - 1)
    }
  }

  return (
    <div className='flex w-full items-center justify-between mt-2 h-full'>
      <Button
        type='button'
        onClick={() => handleChange('-')}
        disabled={(item?.quantity ?? 0) === 0}
        className='rounded-r-none'
      >
        <Minus className='h-4 w-4' />
      </Button>
      <div className='border-t border-b border-input h-9 w-full shadow-sm flex items-center justify-center'>
        {item?.quantity ?? 0} шт.
      </div>
      <Button
        type='button'
        onClick={() => handleChange('+')}
        disabled={(item?.quantity ?? 0) === orderQuantity}
        className='rounded-l-none'
      >
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  )
}
