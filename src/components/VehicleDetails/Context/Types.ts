import type { IModifiersReducerState, IModifiersContextActions } from './ModifiersTypes'
import type { ModuleType } from '@VehicleTypes/module'
import type { IRadios, IFuelTank, ISpeedLimit, ICamo, ISiegeMode, VehicleTypes } from '@VehicleTypes/Other'
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
      [K in keyof ModuleTypeMap]: { [moduleName: string]: ModuleTypeMap[K] } | null
   }
   selectedModuleNames: {
      [moduleType in ModuleType]: string
   }
}

export type ReadyVehicleReducerState = Omit<IVehicleReducerState, 'moduleGroup'> & {
   moduleGroup: IVehicleReducerState['moduleGroup'] & {
      vehicleChassis: NonNullable<IVehicleReducerState['moduleGroup']['vehicleChassis']>
      vehicleEngine: NonNullable<IVehicleReducerState['moduleGroup']['vehicleEngine']>
      vehicleGun: NonNullable<IVehicleReducerState['moduleGroup']['vehicleGun']>
      vehicleRadio: NonNullable<IVehicleReducerState['moduleGroup']['vehicleRadio']>
      vehicleTurret: NonNullable<IVehicleReducerState['moduleGroup']['vehicleTurret']>
      shells: NonNullable<IVehicleReducerState['moduleGroup']['shells']>
   }
}

export function isVehicleReady(state: IVehicleReducerState): state is ReadyVehicleReducerState {
   return (
      state.moduleGroup.vehicleChassis !== null &&
      state.moduleGroup.vehicleEngine !== null &&
      state.moduleGroup.vehicleGun !== null &&
      state.moduleGroup.vehicleRadio !== null &&
      state.moduleGroup.vehicleTurret !== null &&
      state.moduleGroup.shells !== null
   )
}

export const InitialState: IVehicleReducerState = {
   moduleGroup: {
      vehicleChassis: null,
      vehicleEngine: null,
      vehicleRadio: null,
      vehicleTurret: null,
      vehicleGun: null,
      shells: null,
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
   nation: string
   vehicleName: string
   hull: IHull
   fuelTank: IFuelTank[]
   speedLimit: ISpeedLimit
   camo: ICamo
   tankCost: number | { gold: number }
   provisions: string[]
   vehicleType: VehicleTypes
   vehicleTier: number
   supplySlotCategory?: string | null
   customRoleSlotOptions?: string[] | null
   /**
    * @description Mechanics for TIER XI tanks
    */
   mechanics?: Record<string, unknown> | null
   rocketAcceleration: IRocketAcceleration | null
   vehicleReducer: ReadyVehicleReducerState
   vehicleDispatch: React.Dispatch<IVehicleContextActions>
   modifiersReducer: IModifiersReducerState
   modifiersDispatch: React.Dispatch<IModifiersContextActions>
}
