import routeNames from '@/lib/router/routeNames'
import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs() {
  const {
    location: { pathname },
  } = useRouterState()

  const segments = pathname.split('/').filter((segment) => segment !== '') // Remove empty segments

  const breadcrumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}` // Build path up to this segment
    const route = Object.keys(routeNames).find((key) => {
      const pattern = key.replace(/\*/g, '([^/]+)') // Replace * with a regex pattern
      return new RegExp(`^${pattern}$`).test(path)
    })

    return {
      // @ts-expect-error idk
      name: routeNames[route] || segment, // Use segment if no route name found
      route,
      value: segment, // Store the segment value for dynamic segments
      path,
    }
  })

  return (
    <div className='flex items-center gap-1'>
      {breadcrumbs.map(({ name, route, value, path }, index) => (
        <div className='flex items-center gap-1' key={route || value}>
          {index > 0 && (
            <ChevronRight className='text-muted-foreground h-4 w-4' />
          )}
          {route ? (
            <Link className='hover:underline' to={path}>
              {name}
            </Link>
          ) : (
            <span className='text-muted-foreground'>{name}</span>
          )}
        </div>
      ))}
    </div>
  )
}
