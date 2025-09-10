import { type ActionDispatch, useEffect } from 'react'
import type { ITomatoContextActions } from '../Types'
import type { ITurrets, ITankData } from '@/types/VehicleDetails/tomatoGGTankStats'

export default function useSetTurrets(
   tankData: ITankData,
   tomatoDispatch: ActionDispatch<[ITomatoContextActions]>
) {
   useEffect(() => {
      if (tankData) {
         const helperObject: { [turretName: string]: ITurrets } = {}
         for (const turret of tankData.stats.turrets) {
            helperObject[turret.name] = turret
         }
         tomatoDispatch({ type: 'SET_TURRETS', payload: helperObject })

         const vehicleTurretKeys: string[] = Object.keys(helperObject)
         tomatoDispatch({
            type: 'SET_MODULE_NAME_BY_TYPE',
            payload: {
               type: 'vehicleTurret',
               value: helperObject[vehicleTurretKeys[vehicleTurretKeys.length - 1]]?.name || '',
            },
         })
      }
   }, [tankData, tomatoDispatch])
   return null
}
