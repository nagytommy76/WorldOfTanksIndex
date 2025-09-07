import { type ActionDispatch, useEffect } from 'react'
import type { ITomatoContextActions } from '../Types'
import type { IGuns, ITankData } from '@/types/VehicleDetails/tomatoGGTankStats'

export default function useSetGuns(
   tankData: ITankData,
   tomatoDispatch: ActionDispatch<[ITomatoContextActions]>
) {
   useEffect(() => {
      if (tankData) {
         const helperObject: { [chassisName: string]: IGuns } = {}
         for (const gun of tankData.stats.turrets[tankData.stats.turrets.length - 1].guns) {
            helperObject[gun.name] = gun
         }
         tomatoDispatch({ type: 'SET_GUNS', payload: helperObject })
      }
   }, [tankData, tomatoDispatch])
   return null
}
