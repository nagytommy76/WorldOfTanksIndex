import type { IModuleDetails } from '@/types/VehicleDetails/module'

export type IDetailsContextActions = {
   type: 'SET_VEHICLE_PROFILE'
   payload: IModuleDetails
}

export interface IDetailsReducerState {
   vehicleProfile: IModuleDetails | null
}

export const detailsInitialState: IDetailsReducerState = {
   vehicleProfile: null,
}

// CONTEXT
export interface IDetailsContext {
   vehicleProfileReducer: IDetailsReducerState
   vehicleProfileDispatch: React.Dispatch<IDetailsContextActions>
}
