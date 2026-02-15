import type { IOrderReducerState, IOrderReducerActions } from './Types'

export default function OrderReducer(state: IOrderReducerState, { payload, type }: IOrderReducerActions) {
   switch (type) {
      case 'SET_VEHICLE_BY_NAME':
         return { ...state, vehicleByName: payload }
      case 'SET_TIER_TOGGLE':
         return { ...state, vehicleTierToggle: payload }
      case 'SET_TYPE_TOGGLE':
         return { ...state, vehicleTypesToggle: payload }
      case 'RESET_FILTERS':
         return {
            ...state,
            vehicleByName: null,
            vehicleTierToggle: [],
            vehicleTypesToggle: [],
         }
      default:
         return state
   }
}
