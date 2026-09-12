import { useState } from 'react'

export default function useBlocked() {
   const [isBlocked, setIsBolcked] = useState(true)
   const [isSelected, setISSelected] = useState(true)

   return {
      isBlocked,
      isSelected,
      setIsBolcked,
      setISSelected,
   }
}
