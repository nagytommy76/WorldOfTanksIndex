import { type ActionDispatch, useEffect, useState } from 'react'
import type { ITomatoContextActions } from '../Types'
import type { ITankData } from '@VehicleTypes/Vehicle'
import type { IGuns } from '@VehicleTypes/Guns'

export default function useSetGuns(
   tankData: ITankData,
   tomatoDispatch: ActionDispatch<[ITomatoContextActions]>,
   selectedTurret: string | null
) {
   const [allGuns, setAllGuns] = useState<{ [gunName: string]: IGuns }>({})
   useEffect(() => {
      if (tankData) {
         const foundSelectedTurret = tankData.stats.turrets.find((turret) => turret.name === selectedTurret)
         if (foundSelectedTurret) {
            const allGuns: { [gunName: string]: IGuns } = {}
            for (const gun of foundSelectedTurret.guns) {
               allGuns[gun.name] = gun
            }
            tomatoDispatch({ type: 'SET_GUNS', payload: allGuns })
            setAllGuns(allGuns)

            const vehicleGunKeys: string[] = Object.keys(allGuns)
            tomatoDispatch({
               type: 'SET_MODULE_NAME_BY_TYPE',
               payload: {
                  type: 'vehicleGun',
                  value: allGuns[vehicleGunKeys[vehicleGunKeys.length - 1]]?.name || '',
               },
            })
         }
      }
   }, [tankData, tomatoDispatch, selectedTurret])
   return allGuns
}
