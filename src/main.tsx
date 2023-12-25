import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router'

const rootRoute = new RootRoute({
  component: () => <App />,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className='p-2'>
        <h3>Welcome Home!</h3>
      </div>
    )
  },
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
