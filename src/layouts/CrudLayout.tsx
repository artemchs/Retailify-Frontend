
import { DataTable } from '@/components/ui/data-table'
import { routeTree } from '@/lib/router/routeTree'
import { RouteIds } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

export interface FindAll<TData> {
  items: TData[]
  info: {
    totalPages: number
    totalItems: number
  }
}

interface CrudLayoutProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: FindAll<TData> | undefined
  isLoading: boolean
  isError: boolean
  routeId: RouteIds<typeof routeTree>
  topBarElements: React.ReactNode
  title: string
}

export default function CrudLayout<TData, TValue>({
  columns,
  data,
  isError,
  isLoading,
  routeId,
  title,
  topBarElements,
}: CrudLayoutProps<TData, TValue>) {
  return (
    <>
      <h1 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>
        {title}
      </h1>
      <DataTable
        topBarElements={topBarElements}
        columns={columns}
        data={data?.items ? data.items : []}
        totalPages={data?.info.totalPages ?? 1}
        isLoading={isLoading}
        isError={isError}
        routeId={routeId}
      />
    </>
  )
}
