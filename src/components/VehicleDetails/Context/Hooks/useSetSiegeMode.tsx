import { type ActionDispatch, useEffect } from 'react'
import type { IVehicleContextActions } from '../Types'
import type { ITankData } from '@VehicleTypes/Vehicle'

export default function useSetSiegeMode(
   tankData: ITankData,
   vehicleDispatch: ActionDispatch<[IVehicleContextActions]>
) {
   useEffect(() => {
      if (tankData && tankData.stats.siegeMode) {
         vehicleDispatch({ type: 'SET_SIEGE_MODE', payload: tankData.stats.siegeMode })
      }
   }, [tankData, vehicleDispatch])

   return null
}
