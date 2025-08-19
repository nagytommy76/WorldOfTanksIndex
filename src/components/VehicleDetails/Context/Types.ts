import type { IModules, ModuleType } from '@/types/VehicleDetails/module'

export type IModuleAction = { type: 'SET_MODULE_GROUP'; payload: IModules }

export interface IModulesReducerState {
   moduleGroup: { [moduleType in ModuleType]: IModules[] }
}

export const moduleInitialState: IModulesReducerState = {
   moduleGroup: {
      vehicleChassis: [],
      vehicleEngine: [],
      vehicleGun: [],
      vehicleRadio: [],
      vehicleTurret: [],
   },
}
