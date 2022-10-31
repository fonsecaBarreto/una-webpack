import { useCallback, useState } from 'react'

const useResize = () => {
  const [width, setWidth] = useState(0)
  const ref:any = useCallback((node:any)=> {
      if (node !== null) {   
          const handleResize = () => {
              const { width } = node.getBoundingClientRect();
              setWidth(width);
          }
          handleResize();
          window.addEventListener('resize', handleResize)
          return () =>  window.removeEventListener('resize', handleResize)
      }
  }, []);
  return [ref, { width }]
}

export default useResize