import React from 'react'
import ReactDOM from 'react-dom/client'
import { TanstackRouterProvider } from './lib/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TanstackRouterProvider />
  </React.StrictMode>
)
