import { useState, useEffect } from 'react'

export default function useHandleTextField() {
   const [inputValue, setInputValue] = useState('')
   const [debouncedInputValue, setDebouncedInputValue] = useState('')
   const [isEnabled, setIsEnabled] = useState(false)

   const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
   }

   useEffect(() => {
      setIsEnabled(false)
      const delayInputTimeoutId = setTimeout(() => {
         if (inputValue === '') return
         setDebouncedInputValue(inputValue)
         setIsEnabled(true)
      }, 750)
      return () => clearTimeout(delayInputTimeoutId)
   }, [inputValue])

   return { inputValue, isEnabled, debouncedInputValue, handleOnChange }
}
