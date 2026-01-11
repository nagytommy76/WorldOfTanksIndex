import { useEffect, useState } from 'react'
import type {} from '../Types'
import type { IRocketAcceleration } from '@VehicleTypes/Engines'

export default function useSetBooster(rocketAcceleration: IRocketAcceleration | null | undefined) {
   const [rocketBooster, setRocketBooster] = useState<IRocketAcceleration | null>(null)

   useEffect(() => {
      if (rocketAcceleration) {
         setRocketBooster(rocketAcceleration)
      }
   }, [rocketAcceleration])

   return rocketBooster
}
