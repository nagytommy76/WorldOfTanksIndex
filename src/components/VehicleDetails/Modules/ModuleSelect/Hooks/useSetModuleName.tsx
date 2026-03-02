import { Dispatch } from 'react'

import type { IVehicleContextActions } from '@/VehicleContext/Types'
import type { ModuleType } from '@/types/VehicleDetails/module'

export default function useSetModuleName(vehicleDispatch: Dispatch<IVehicleContextActions>) {
   function setModuleName(moduleName: string): string {
      return moduleName.toString().split('_').join(' ')
   }

   function setModuleNameByType(moduleType: ModuleType, moduleName: string) {
      vehicleDispatch({
         type: 'SET_MODULE_NAME_BY_TYPE',
         payload: { type: moduleType, value: moduleName },
      })
   }

   return { setModuleName, setModuleNameByType }
}
