import { useState, useEffect } from 'react'
import type { IModules, ModuleType } from '@/types/VehicleDetails/module'

export default function useGroupModules(modulesTree: { [module_id: number]: IModules }) {
   const [moduleTree, setModuleTree] = useState<{ [moduleType in ModuleType]: IModules[] }>({
      vehicleChassis: [],
      vehicleEngine: [],
      vehicleGun: [],
      vehicleRadio: [],
      vehicleTurret: [],
   })
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
      setModuleTree(groupedModules)
   }, [modulesTree])

   return { moduleTree }
}
