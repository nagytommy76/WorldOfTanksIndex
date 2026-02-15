// REDUCER
export type IOrderReducerActions =
   | { type: 'SET_TIER_TOGGLE'; payload: number[] }
   | { type: 'SET_TYPE_TOGGLE'; payload: string[] }
   | { type: 'SET_VEHICLE_BY_NAME'; payload: string | null }
   | { type: 'RESET_FILTERS'; payload: null }

export interface IOrderReducerState {
   vehicleTypesToggle: string[]
   vehicleTierToggle: number[]
   vehicleByName: string | null
}

export const InitialReducerState: IOrderReducerState = {
   vehicleTypesToggle: [],
   vehicleTierToggle: [],
   vehicleByName: null,
}

// CONTEXT
export interface IOrderContext {
   orderReducer: IOrderReducerState
}
export interface IOrderDispatchContext {
   orderDispatch: React.Dispatch<IOrderReducerActions>
}
