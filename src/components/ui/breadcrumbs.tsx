import routeNames from '@/lib/router/routeNames'
import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs() {
  const {
    location: { pathname },
  } = useRouterState()

  const breadcrumbs = pathname.split('/').map((_, index, segments) => {
    const currentPath = segments.slice(0, index + 1).join('/')
    const route = (currentPath || '/') as keyof typeof routeNames

    return {
      name: routeNames[route],
      route,
    }
  })

  return (
    <div className='flex items-center gap-1'>
      {breadcrumbs.map(({ name, route }, index) => (
        <div className='flex items-center gap-1' key={route}>
          {index > 0 && (
            <ChevronRight className='text-muted-foreground h-4 w-4' />
          )}
          <Link className='hover:underline' to={route}>
            {name}
          </Link>
        </div>
      ))}
    </div>
  )
}
