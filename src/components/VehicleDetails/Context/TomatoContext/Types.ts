import type { ModuleType } from '@/types/VehicleDetails/module'
import type {
   IChassis,
   IEngines,
   IGuns,
   IRadios,
   ITurrets,
   IShells,
   IHull,
   IFuelTank,
   ISpeedLimit,
   ICamo,
} from '@/types/VehicleDetails/tomatoGGTankStats'

interface setChassisAction {
   type: 'SET_CHASSIS'
   payload: { [moduleName: string]: IChassis }
}
interface setEnginesAction {
   type: 'SET_ENGINES'
   payload: { [moduleName: string]: IEngines }
}
interface setRadiosAction {
   type: 'SET_RADIOS'
   payload: { [moduleName: string]: IRadios }
}
interface setTurretsAction {
   type: 'SET_TURRETS'
   payload: { [moduleName: string]: ITurrets }
}
interface setGunsAction {
   type: 'SET_GUNS'
   payload: { [moduleName: string]: IGuns }
}
interface setShellsAction {
   type: 'SET_SHELLS'
   payload: { [shellName: string]: IShells }
}

interface setModuleIdByType {
   type: 'SET_MODULE_NAME_BY_TYPE'
   payload: { type: ModuleType; value: string }
}

export type ITomatoContextActions =
   | setChassisAction
   | setEnginesAction
   | setRadiosAction
   | setTurretsAction
   | setGunsAction
   | setShellsAction
   | setModuleIdByType

export interface ITomatoReducerState {
   moduleGroup: {
      vehicleChassis: { [moduleName: string]: IChassis }
      vehicleEngine: { [moduleName: string]: IEngines }
      vehicleRadio: { [moduleName: string]: IRadios }
      vehicleTurret: { [moduleName: string]: ITurrets }
      vehicleGun: { [moduleName: string]: IGuns }
      shells: { [shellName: string]: IShells }
   }
   selectedModuleNames: {
      [moduleType in ModuleType]: string
   }
}

export const tomatoInitialState: ITomatoReducerState = {
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
}

// CONTEXT
export interface ITomatoContext {
   hull: IHull
   fuelTank: IFuelTank
   speedLimit: ISpeedLimit
   camo: ICamo
   tankCost: number
   tomatoReducer: ITomatoReducerState
   tomatoDispatch: React.Dispatch<ITomatoContextActions>
}
