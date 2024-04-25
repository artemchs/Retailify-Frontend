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
import { DataTableStateBottomControls } from './data-table-state'

type Props = {
  bottomControlsState: DataTableStateBottomControls
  setBottomControlsState: (newValue: DataTableStateBottomControls) => void
  totalPages: number
}

export default function PaginationControlsState({
  bottomControlsState,
  setBottomControlsState,
  totalPages,
}: Props) {
  const handlePrevious = () => {
    if (bottomControlsState.page > 1) {
      setBottomControlsState({
        ...bottomControlsState,
        page: bottomControlsState.page - 1,
      })
    }
  }

  const handleNext = () => {
    if (bottomControlsState.page !== totalPages) {
      setBottomControlsState({
        ...bottomControlsState,
        page: bottomControlsState.page + 1,
      })
    }
  }

  const handleFirst = () => {
    if (bottomControlsState.page !== 1) {
      setBottomControlsState({
        ...bottomControlsState,
        page: 1,
      })
    }
  }

  const handleLast = () => {
    if (bottomControlsState.page !== totalPages) {
      setBottomControlsState({
        ...bottomControlsState,
        page: totalPages,
      })
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
              disabled={bottomControlsState.page <= 1}
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
              disabled={bottomControlsState.page <= 1}
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
              disabled={bottomControlsState.page >= totalPages}
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
              disabled={bottomControlsState.page >= totalPages}
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
