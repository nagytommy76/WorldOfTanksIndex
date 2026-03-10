import { useEffect, useState } from 'react'

export default function useSetProvisions(tankDetailProvisions: string[] | undefined) {
   const [provisions, setProvisions] = useState<string[]>([])
   useEffect(() => {
      if (tankDetailProvisions && tankDetailProvisions.length > 0) {
         setProvisions(tankDetailProvisions)
      }
   }, [tankDetailProvisions])
   return provisions
}
