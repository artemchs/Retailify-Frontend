import { routeTree } from '@/lib/router/routeTree'
import { RouteIds, useNavigate, useSearch } from '@tanstack/react-router'
import { Button } from './button'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type Props = {
  routeId: RouteIds<typeof routeTree>
  totalPages: number
}

export default function PaginationControls({ routeId, totalPages }: Props) {
  // @ts-expect-error Not all routes have the "page" search param, and it is not intended to use this component in those routes.
  const { page } = useSearch({
    from: routeId,
  })

  const navigate = useNavigate()

  const handlePrevious = () => {
    if (page > 1) {
      navigate({ search: (prev) => ({ ...prev, page: page - 1 }) })
    }
  }

  const handleNext = () => {
    if (page !== totalPages) {
      navigate({ search: (prev) => ({ ...prev, page: page + 1 }) })
    }
  }

  const handleFirst = () => {
    if (page !== 1) {
      navigate({ search: (prev) => ({ ...prev, page: 1 }) })
    }
  }

  const handleLast = () => {
    if (page !== totalPages) {
      navigate({ search: (prev) => ({ ...prev, page: totalPages }) })
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size='icon'
              variant='outline'
              onClick={() => handleFirst()}
              disabled={page <= 1}
            >
              <ChevronsLeft className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Перейти на первую страницу</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size='icon'
              variant='outline'
              onClick={() => handlePrevious()}
              disabled={page <= 1}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Перейти на предыдущую страницу</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size='icon'
              variant='outline'
              onClick={() => handleNext()}
              disabled={page >= totalPages}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Перейти на следующую страницу</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size='icon'
              variant='outline'
              onClick={() => handleLast()}
              disabled={page >= totalPages}
            >
              <ChevronsRight className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Перейти на последнюю страницу</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
