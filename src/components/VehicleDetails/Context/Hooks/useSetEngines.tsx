import { type ActionDispatch, useEffect } from 'react'
import type { IVehicleContextActions } from '../Types'
import type { ITankData } from '@VehicleTypes/Vehicle'
import type { IEngines } from '@VehicleTypes/Engines'

export default function useSetEngines(
   tankData: ITankData,
   vehicleDispatch: ActionDispatch<[IVehicleContextActions]>
) {
   useEffect(() => {
      if (tankData) {
         const helperObject: { [engineName: string]: IEngines } = {}
         for (const engine of tankData.stats.engines) {
            helperObject[engine.name] = engine
         }
         vehicleDispatch({ type: 'SET_ENGINES', payload: helperObject })

         const vehicleEngineKeys: string[] = Object.keys(helperObject)
         vehicleDispatch({
            type: 'SET_MODULE_NAME_BY_TYPE',
            payload: {
               type: 'vehicleEngine',
               value: helperObject[vehicleEngineKeys[vehicleEngineKeys.length - 1]]?.name || '',
            },
         })
      }
   }, [tankData, vehicleDispatch])
   return null
}
