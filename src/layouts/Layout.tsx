import Navbar from '@/components/nav/Navbar'
import Sidebar from '@/components/nav/Sidebar'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Outlet, useRouterState } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { ImperativePanelHandle } from 'react-resizable-panels'

export default function Layout() {
  const { location } = useRouterState()
  const sidebarRef = useRef<ImperativePanelHandle>(null)
  const [sidebarExpanded, setSidebarExpanded] = useState(
    sidebarRef.current?.isExpanded() ?? true
  )

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel
        defaultSize={17}
        minSize={14}
        collapsible
        collapsedSize={3}
        maxSize={40}
        ref={sidebarRef}
        className='hidden lg:flex lg:w-full lg:h-full'
        onExpand={() => setSidebarExpanded(true)}
        onCollapse={() => setSidebarExpanded(false)}
      >
        <Sidebar sidebarRef={sidebarRef} isExpanded={sidebarExpanded} />
      </ResizablePanel>
      <ResizableHandle withHandle className='hidden lg:flex' />
      <ResizablePanel>
        <div className='w-full h-screen overflow-y-auto overflow-x-hidden flex flex-col relative'>
          <Navbar />
          <div className='p-6 space-y-6'>
            {location.pathname !== '/' && <Breadcrumbs />}
            <Outlet />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
