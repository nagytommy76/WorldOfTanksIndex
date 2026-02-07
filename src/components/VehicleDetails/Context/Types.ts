import type { ModuleType } from '@VehicleTypes/module'
import type { IRadios, IFuelTank, ISpeedLimit, ICamo, ISiegeMode } from '@VehicleTypes/Other'
import type { ITurrets } from '@VehicleTypes/Turrets'
import type { IEngines, IRocketAcceleration } from '@VehicleTypes/Engines'
import type { IChassis, IHull } from '@VehicleTypes/Hull'
import type { IGuns } from '@VehicleTypes/Guns'
import type { IShells } from '@VehicleTypes/Shells'

export type ModuleTypeMap = {
   vehicleChassis: IChassis
   vehicleEngine: IEngines
   vehicleRadio: IRadios
   vehicleTurret: ITurrets
   vehicleGun: IGuns
   shells: IShells
}

export type IVehicleContextActions =
   | { type: 'SET_CHASSIS'; payload: { [moduleName: string]: IChassis } }
   | { type: 'SET_ENGINES'; payload: { [moduleName: string]: IEngines } }
   | { type: 'SET_RADIOS'; payload: { [moduleName: string]: IRadios } }
   | { type: 'SET_TURRETS'; payload: { [moduleName: string]: ITurrets } }
   | { type: 'SET_GUNS'; payload: { [moduleName: string]: IGuns } }
   | { type: 'SET_SHELLS'; payload: { [shellName: string]: IShells } }
   | { type: 'SET_SIEGE_MODE'; payload: Partial<ISiegeMode> | null }
   | { type: 'SET_MODULE_NAME_BY_TYPE'; payload: { type: ModuleType; value: string } }

export interface IVehicleReducerState {
   siegeMode: Partial<ISiegeMode> | null
   moduleGroup: {
      [K in keyof ModuleTypeMap]: { [moduleName: string]: ModuleTypeMap[K] }
   }
   selectedModuleNames: {
      [moduleType in ModuleType]: string
   }
}

export const InitialState: IVehicleReducerState = {
   moduleGroup: {
      vehicleChassis: {},
      vehicleEngine: {},
      vehicleRadio: {},
      vehicleTurret: {},
      vehicleGun: {},
      shells: {},
   },
   selectedModuleNames: {
      vehicleChassis: '',
      vehicleEngine: '',
      vehicleGun: '',
      vehicleRadio: '',
      vehicleTurret: '',
      shells: '',
   },
   siegeMode: null,
}

// CONTEXT
export interface IVehicleContext {
   vehicleName: string
   hull: IHull
   fuelTank: IFuelTank[]
   speedLimit: ISpeedLimit
   camo: ICamo
   tankCost: number | { gold: number }
   /**
    * @description Mechanics for TIER XI tanks
    */
   mechanics?: Record<string, unknown> | null
   rocketAcceleration: IRocketAcceleration | null
   vehicleReducer: IVehicleReducerState
   vehicleDispatch: React.Dispatch<IVehicleContextActions>
}
