import { useState } from 'react'

export default function useBlocked(isBlockedProp: boolean = true) {
   const [isBlocked, setIsBolcked] = useState(isBlockedProp)
   const [isSelected, setISSelected] = useState(true)

   return {
      isBlocked,
      isSelected,
      setIsBolcked,
      setISSelected,
   }
}
