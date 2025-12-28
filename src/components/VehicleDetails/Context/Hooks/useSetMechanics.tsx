import { useEffect, useState } from 'react'

export default function useSetMechanics(tankMechanics: unknown) {
   const [mechanics, setMechanics] = useState<Record<string, unknown> | null>(null)
   useEffect(() => {
      if (tankMechanics) {
         const helperObject: Record<string, unknown> = {}
         for (const [name, value] of Object.entries(tankMechanics)) {
            helperObject[name] = value
         }
         setMechanics(helperObject)
      }
   }, [tankMechanics])
   return mechanics
}
