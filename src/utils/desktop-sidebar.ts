export function expandDesktopSidebar() {
  setState('open')
}

export function collapseDesktopSidebar() {
  setState('closed')
}

export function toggleDesktopSidebar() {
  const element = document.getElementById('sidebar-desktop')
  if (element) {
    const state = element.getAttribute('data-state')

    if (state === 'open') {
      collapseDesktopSidebar()
    } else {
      expandDesktopSidebar()
    }
  }
}

function setState(newState: 'open' | 'closed') {
  const element = document.getElementById('sidebar-desktop')
  if (element) {
    element.setAttribute('data-state', newState)
  }
}
