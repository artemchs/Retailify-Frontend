import { DataTable } from '@/components/ui/data-table'
import PageTitle from '@/components/ui/page-title'
import { routeTree } from '@/lib/router/routeTree'
import { RouteIds } from '@tanstack/react-router'
import { ColumnDef, Row } from '@tanstack/react-table'
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
  childrenField?: keyof TData
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement
  getRowCanExpand?: (row: Row<TData>) => boolean
}

export default function CrudLayout<TData, TValue>({
  columns,
  data,
  isError,
  isLoading,
  routeId,
  title,
  topBarElements,
  childrenField,
  renderSubComponent,
  getRowCanExpand,
}: CrudLayoutProps<TData, TValue>) {
  return (
    <>
      <PageTitle title={title} />
      <DataTable
        topBarElements={topBarElements}
        columns={columns}
        data={data?.items ? data.items : []}
        totalPages={data?.info.totalPages ?? 1}
        isLoading={isLoading}
        isError={isError}
        routeId={routeId}
        childrenField={childrenField}
        renderSubComponent={renderSubComponent}
        getRowCanExpand={getRowCanExpand}
      />
    </>
  )
}
