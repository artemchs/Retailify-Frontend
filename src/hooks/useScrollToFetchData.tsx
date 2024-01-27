import { useCallback, useLayoutEffect } from 'react'

export const useScrollToFetchData = (
  fetchData: () => void,
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  observerTarget: HTMLDivElement | null
) => {
  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (hasNextPage && !isFetchingNextPage) {
            fetchData()
          }
        }
      })
    },
    [fetchData, hasNextPage, isFetchingNextPage]
  )

  useLayoutEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    }

    const observer = new IntersectionObserver(handleIntersect, options)

    if (observerTarget) {
      observer.observe(observerTarget)
    }

    return () => {
      if (observerTarget) {
        observer.unobserve(observerTarget)
      }
    }
  }, [observerTarget, handleIntersect])
}
