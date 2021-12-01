import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function UseLocationCallBack({callback, ...props}) {
  const location = useLocation()
  useEffect(() => {
    callback(location)
    return () => null
  }, [location]); 
  return null;
}
