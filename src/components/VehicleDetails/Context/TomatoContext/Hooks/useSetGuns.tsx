import { type ActionDispatch, useEffect } from 'react'
import type { ITomatoContextActions } from '../Types'
import type { IGuns, ITankData } from '@/types/VehicleDetails/tomatoGGTankStats'

export default function useSetGuns(
   tankData: ITankData,
   tomatoDispatch: ActionDispatch<[ITomatoContextActions]>,
   vehicleTurret: string | null
) {
   useEffect(() => {
      if (tankData) {
         const foundSelectedTurret = tankData.stats.turrets.find((turret) => turret.name === vehicleTurret)
         if (foundSelectedTurret) {
            const helperObject: { [gunName: string]: IGuns } = {}
            for (const gun of foundSelectedTurret.guns) {
               helperObject[gun.name] = gun
            }
            tomatoDispatch({ type: 'SET_GUNS', payload: helperObject })

            const vehicleGunKeys: string[] = Object.keys(helperObject)
            tomatoDispatch({
               type: 'SET_MODULE_NAME_BY_TYPE',
               payload: {
                  type: 'vehicleGun',
                  value: helperObject[vehicleGunKeys[vehicleGunKeys.length - 1]]?.name || '',
               },
            })
         }
      }
   }, [tankData, tomatoDispatch, vehicleTurret])
   return null
}
