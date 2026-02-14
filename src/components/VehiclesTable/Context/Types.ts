import type { CardTanksType } from '@/types/VehicleDetails/Vehicle'

// REDUCER
export type IOrderReducerActions =
   | { type: 'SET_ORDER_VEHICLES'; payload: CardTanksType[] }
   | { type: 'SET_TIER_TOGGLE'; payload: number[] }
   | { type: 'SET_TYPE_TOGGLE'; payload: string[] }

export interface IOrderReducerState {
   orderVehicles: CardTanksType[]
   vehicleTypesToggle: string[]
   vehicleTierToggle: number[]
}

export const InitialReducerState: IOrderReducerState = {
   orderVehicles: [],
   vehicleTypesToggle: [],
   vehicleTierToggle: [],
}

// CONTEXT
export interface IOrderContext {
   orderReducer: IOrderReducerState
   orderDispatch: React.Dispatch<IOrderReducerActions>
}
