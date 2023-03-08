import { useEffect, useState } from "react"

const useLocalStorage = (name, outsideInitialValue) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(name)) || outsideInitialValue
    } catch (e) {
      return outsideInitialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value))
  }, [name, value])

  return [value, setValue]
}

export default useLocalStorage
