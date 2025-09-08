import { useEffect, type ActionDispatch } from 'react'
import type { IModules, ModuleType } from '@/types/VehicleDetails/module'
import type { ITomatoContextActions } from '../TomatoContext/Types'

export default function useGroupModules(
   modulesTree: { [module_id: number]: IModules },
   tomatoDispatch: ActionDispatch<[ITomatoContextActions]>
) {
   useEffect(() => {
      const groupedModules: { [moduleType in ModuleType]: IModules[] } = {
         vehicleChassis: [],
         vehicleEngine: [],
         vehicleGun: [],
         vehicleRadio: [],
         vehicleTurret: [],
      }
      Object.values(modulesTree).forEach((module) => {
         groupedModules[module.type].push(module)
      })

      Object.keys(groupedModules).map((key: string) => {
         const moduleType = key as ModuleType
         groupedModules[moduleType].sort((a, b) => a.price_xp - b.price_xp)
      })
      tomatoDispatch({
         type: 'SET_SELECTED_MODULE_NAMES',
         payload: {
            vehicleChassis:
               groupedModules.vehicleChassis[groupedModules.vehicleChassis.length - 1]?.name || '',
            vehicleEngine: groupedModules.vehicleEngine[groupedModules.vehicleEngine.length - 1]?.name || '',
            vehicleGun: groupedModules.vehicleGun[groupedModules.vehicleGun.length - 1]?.name || '',
            vehicleRadio: groupedModules.vehicleRadio[groupedModules.vehicleRadio.length - 1]?.name || '',
            vehicleTurret: groupedModules.vehicleTurret[groupedModules.vehicleTurret.length - 1]?.name || '',
         },
      })
   }, [modulesTree, tomatoDispatch])

   return null
}
