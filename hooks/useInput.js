import { useCallback, useState } from 'react'

export default (initialValue = null) => {
  const [value, setvalue] = useState(initialValue)
  const handler = useCallback((e) => {
    setvalue(e.target.value)
  },[])
  return [value,handler,setvalue]
}