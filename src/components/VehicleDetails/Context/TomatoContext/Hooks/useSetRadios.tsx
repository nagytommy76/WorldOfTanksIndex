import { type ActionDispatch, useEffect } from 'react'
import type { ITomatoContextActions } from '../Types'
import type { IRadios, ITankData } from '@/types/VehicleDetails/tomatoGGTankStats'

export default function useSetRadios(
   tankData: ITankData,
   tomatoDispatch: ActionDispatch<[ITomatoContextActions]>
) {
   useEffect(() => {
      if (tankData) {
         const helperObject: { [chassisName: string]: IRadios } = {}
         for (const radio of tankData.stats.radios) {
            helperObject[radio.name] = radio
         }
         tomatoDispatch({ type: 'SET_RADIOS', payload: helperObject })
      }
   }, [tankData, tomatoDispatch])
   return null
}
