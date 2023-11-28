import { useEffect, useRef } from 'react'

const useInfiniteScroll = (callback: (page: number) => void) => {
  const pageRef = useRef(2)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop + clientHeight >= scrollHeight) {
        const currentPage = pageRef.current
        callback(currentPage)
        pageRef.current = currentPage + 1
      }
    }

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [callback])
}

export default useInfiniteScroll
