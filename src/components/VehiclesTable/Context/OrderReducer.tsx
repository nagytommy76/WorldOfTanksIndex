import type { IOrderReducerState, IOrderReducerActions } from './Types'

export default function OrderReducer(state: IOrderReducerState, { payload, type }: IOrderReducerActions) {
   switch (type) {
      case 'SET_ORDER_VEHICLES':
         return { ...state, orderVehicles: payload }
      case 'SET_TIER_TOGGLE':
         return { ...state, vehicleTierToggle: payload }
      case 'SET_TYPE_TOGGLE':
         return { ...state, vehicleTypesToggle: payload }
      default:
         return state
   }
}
