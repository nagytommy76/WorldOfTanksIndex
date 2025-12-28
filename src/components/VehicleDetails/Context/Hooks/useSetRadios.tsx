import { type ActionDispatch, useEffect } from 'react'
import type { IVehicleContextActions } from '../Types'
import type { ITankData } from '@VehicleTypes/Vehicle'
import type { IRadios } from '@VehicleTypes/Other'

export default function useSetRadios(
   tankData: ITankData,
   vehicleDispatch: ActionDispatch<[IVehicleContextActions]>
) {
   useEffect(() => {
      if (tankData) {
         const helperObject: { [radioName: string]: IRadios } = {}
         for (const radio of tankData.stats.radios) {
            helperObject[radio.name] = radio
         }
         vehicleDispatch({ type: 'SET_RADIOS', payload: helperObject })

         const vehicleRadioKeys: string[] = Object.keys(helperObject)
         vehicleDispatch({
            type: 'SET_MODULE_NAME_BY_TYPE',
            payload: {
               type: 'vehicleRadio',
               value: helperObject[vehicleRadioKeys[vehicleRadioKeys.length - 1]]?.name || '',
            },
         })
      }
   }, [tankData, vehicleDispatch])
   return null
}
