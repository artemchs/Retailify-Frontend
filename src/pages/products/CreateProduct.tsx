import Products from '@/api/services/Products'
import { ErrorPage, LoadingPage } from '@/components/ui/async-page'
import { Label } from '@/components/ui/label'
import PageTitle from '@/components/ui/page-title'
import CreateProductForm from '@/features/products/components/actions/create/CreateProductForm'
import SelectProductsDialog from '@/features/products/components/shared/productsDialog/SelectProductsTable'
import { RowSelectionState } from '@tanstack/react-table'
import { useState } from 'react'

export default function CreateProductPage() {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
  const [copyFromProduct, setCopyFromProduct] = useState<
    | {
        id: string
        sku: string
        title: string
      }
    | undefined
  >()
  const productPreset = Products.useFindOne({ id: copyFromProduct?.id })

  return (
    <div className='container flex flex-col gap-8'>
      <PageTitle title='Добавить новую модель товара' />
      <div className='space-y-2'>
        <Label>Скопировать значения с другой модели товара:</Label>
        <SelectProductsDialog
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          selectedValues={copyFromProduct ? [copyFromProduct] : []}
          setSelectedValues={(newValues) => {
            if (newValues && newValues[0] && newValues[0].id) {
              setCopyFromProduct({
                id: newValues[0].id,
                title: newValues[0].title,
                sku: newValues[0].sku,
              })
            } else {
              setCopyFromProduct(undefined)
              setSelectedRows({})
            }
          }}
          single={true}
        />
      </div>
      {productPreset.isLoading ? (
        <LoadingPage />
      ) : productPreset.isError ? (
        <ErrorPage />
      ) : (
        <CreateProductForm product={productPreset.data ?? undefined} />
      )}
    </div>
  )
}
