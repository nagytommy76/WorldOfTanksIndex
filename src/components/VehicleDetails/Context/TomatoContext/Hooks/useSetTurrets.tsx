import { type ActionDispatch, useEffect } from 'react'
import type { ITomatoContextActions } from '../Types'
import type { ITurrets, ITankData } from '@/types/VehicleDetails/tomatoGGTankStats'

export default function useSetTurrets(
   tankData: ITankData,
   tomatoDispatch: ActionDispatch<[ITomatoContextActions]>
) {
   useEffect(() => {
      if (tankData) {
         const helperObject: { [chassisName: string]: ITurrets } = {}
         for (const turret of tankData.stats.turrets) {
            helperObject[turret.name] = turret
         }
         tomatoDispatch({ type: 'SET_TURRETS', payload: helperObject })
      }
   }, [tankData, tomatoDispatch])
   return null
}
