import { type ActionDispatch, useEffect } from 'react'
import type { ITomatoContextActions } from '../Types'
import type { IEngines, ITankData } from '@/types/VehicleDetails/tomatoGGTankStats'

export default function useSetEngines(
   tankData: ITankData,
   tomatoDispatch: ActionDispatch<[ITomatoContextActions]>
) {
   useEffect(() => {
      if (tankData) {
         const helperObject: { [chassisName: string]: IEngines } = {}
         for (const engine of tankData.stats.engines) {
            helperObject[engine.name] = engine
         }
         tomatoDispatch({ type: 'SET_ENGINES', payload: helperObject })
      }
   }, [tankData, tomatoDispatch])
   return null
}
