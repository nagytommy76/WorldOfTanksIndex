import type {
   IChassis,
   IEngines,
   IGuns,
   IRadios,
   ITurrets,
   IShells,
   ITankData,
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

export type ITomatoContextActions =
   | setChassisAction
   | setEnginesAction
   | setRadiosAction
   | setTurretsAction
   | setGunsAction
   | setShellsAction

export interface ITomatoReducerState {
   vehicleChassis: { [moduleName: string]: IChassis }
   vehicleEngine: { [moduleName: string]: IEngines }
   vehicleRadio: { [moduleName: string]: IRadios }
   vehicleTurret: { [moduleName: string]: ITurrets }
   vehicleGun: { [moduleName: string]: IGuns }
   shells: { [shellName: string]: IShells }
}

export const tomatoInitialState: ITomatoReducerState = {
   vehicleChassis: {},
   vehicleEngine: {},
   vehicleRadio: {},
   vehicleTurret: {},
   vehicleGun: {},
   shells: {},
}

// CONTEXT
export interface ITomatoContext {
   tankData: ITankData | undefined
   tomatoReducer: ITomatoReducerState
   tomatoDispatch: React.Dispatch<ITomatoContextActions>
}
