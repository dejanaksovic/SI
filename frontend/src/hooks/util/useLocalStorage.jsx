import { useEffect, useState } from "react"

const determineInitValue = (key, initValue) => {
   const savedValue = JSON.parse(localStorage.getItem(key))
   
   if(savedValue)
      return savedValue

   return initValue
}

export const useLocalStorage = (key, initValue) => {
   const [state, setState] = useState(determineInitValue(key, initValue))

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state))
   }, [state])

   return [state, setState]
}