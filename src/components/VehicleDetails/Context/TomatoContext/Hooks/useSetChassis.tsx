import { type ActionDispatch, useEffect } from 'react'
import type { ITomatoContextActions } from '../Types'
import type { IChassis, ITankData } from '@/types/VehicleDetails/tomatoGGTankStats'

export default function useSetChassis(
   tankData: ITankData,
   tomatoDispatch: ActionDispatch<[ITomatoContextActions]>
) {
   useEffect(() => {
      if (tankData) {
         const helperObject: { [chassisName: string]: IChassis } = {}
         for (const chassis of tankData.stats.chassis) {
            helperObject[chassis.name] = chassis
         }
         tomatoDispatch({ type: 'SET_CHASSIS', payload: helperObject })
      }
   }, [tankData, tomatoDispatch])
   return null
}
