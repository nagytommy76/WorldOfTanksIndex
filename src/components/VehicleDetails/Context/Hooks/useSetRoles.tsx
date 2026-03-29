import { useEffect, useState } from 'react'

export default function useSetRoles(supplySlotCategory?: string | null) {
   const [supplyRoles, setSupplyRoles] = useState<string | null>(null)
   useEffect(() => {
      if (supplySlotCategory) {
         setSupplyRoles(supplySlotCategory)
      }
   }, [supplySlotCategory])
   return supplyRoles
}
