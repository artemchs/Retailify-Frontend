import { AppProvider } from './providers/AppProvider'
import './assets/index.css'
import { Outlet, ScrollRestoration } from '@tanstack/react-router'

export default function App() {
  return (
    <AppProvider>
      <Outlet />
      <ScrollRestoration />
    </AppProvider>
  )
}
