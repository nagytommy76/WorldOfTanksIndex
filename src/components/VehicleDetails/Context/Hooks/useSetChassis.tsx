import { type ActionDispatch, useEffect } from 'react'
import type { IVehicleContextActions } from '../Types'
import type { ITankData } from '@VehicleTypes/Vehicle'
import type { IChassis } from '@VehicleTypes/Hull'

export default function useSetChassis(
   tankData: ITankData,
   vehicleDispatch: ActionDispatch<[IVehicleContextActions]>
) {
   useEffect(() => {
      if (tankData) {
         const helperObject: { [chassisName: string]: IChassis } = {}
         for (const chassis of tankData.stats.chassis) {
            helperObject[chassis.name] = chassis
         }
         vehicleDispatch({ type: 'SET_CHASSIS', payload: helperObject })

         const vehicleChassisKeys: string[] = Object.keys(helperObject)
         vehicleDispatch({
            type: 'SET_MODULE_NAME_BY_TYPE',
            payload: {
               type: 'vehicleChassis',
               value: helperObject[vehicleChassisKeys[vehicleChassisKeys.length - 1]]?.name || '',
            },
         })
      }
   }, [tankData, vehicleDispatch])
   return null
}
