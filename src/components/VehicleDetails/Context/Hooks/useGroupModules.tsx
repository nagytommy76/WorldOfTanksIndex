import { useEffect, type ActionDispatch } from 'react'
import type { IModules, ModuleType } from '@/types/VehicleDetails/module'
import type { IModuleContextActions } from '@/ModuleContext/Types'

export default function useGroupModules(
   modulesTree: { [module_id: number]: IModules },
   modulesDispatch: ActionDispatch<[IModuleContextActions]>
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

      modulesDispatch({ type: 'SET_MODULE_GROUP', payload: groupedModules })
      modulesDispatch({
         type: 'SET_SELECTED_MODULE_IDS',
         payload: {
            vehicleChassis:
               groupedModules.vehicleChassis[groupedModules.vehicleChassis.length - 1]?.module_id || 0,
            vehicleEngine:
               groupedModules.vehicleEngine[groupedModules.vehicleEngine.length - 1]?.module_id || 0,
            vehicleGun: groupedModules.vehicleGun[groupedModules.vehicleGun.length - 1]?.module_id || 0,
            vehicleRadio: groupedModules.vehicleRadio[groupedModules.vehicleRadio.length - 1]?.module_id || 0,
            vehicleTurret:
               groupedModules.vehicleTurret[groupedModules.vehicleTurret.length - 1]?.module_id || 0,
         },
      })
   }, [modulesTree, modulesDispatch])

   return null
}
