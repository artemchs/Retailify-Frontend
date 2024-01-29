import { ExpandToggle } from '@/components/ui/data-table'
import { collectionsRoute } from '@/lib/router/routeTree'
import { Collection } from '@/types/entities/Collection'
import { useSearch } from '@tanstack/react-router'
import { Row } from '@tanstack/react-table'
import { Archive, Minus } from 'lucide-react'

export default function RowNameCell({ row }: { row: Row<Collection> }) {
  const { isArchived } = useSearch({
    from: collectionsRoute.id,
  })

  return (
    <div className='flex items-center gap-2'>
      {isArchived ? (
        <Archive className='h-4 w-4 text-muted-foreground' />
      ) : !row.parentId ? (
        <ExpandToggle
          disabled={!row.getCanExpand()}
          isExpanded={row.getIsExpanded()}
          toggle={row.getToggleExpandedHandler()}
        />
      ) : (
        <Minus className='h-4 w-4 text-muted-foreground' />
      )}

      <span className='font-medium'>{row.original.name}</span>
    </div>
  )
}
