import type { ITomatoContextActions, ITomatoReducerState } from './Types'

export default function TomatoReducer(state: ITomatoReducerState, { payload, type }: ITomatoContextActions) {
   switch (type) {
      case 'SET_CHASSIS':
         return {
            ...state,
            vehicleChassis: payload,
         }
      case 'SET_ENGINES':
         return {
            ...state,
            vehicleEngine: payload,
         }
      case 'SET_GUNS':
         return {
            ...state,
            vehicleGun: payload,
         }
      case 'SET_RADIOS':
         return {
            ...state,
            vehicleRadio: payload,
         }
      case 'SET_TURRETS':
         return {
            ...state,
            vehicleTurret: payload,
         }
      case 'SET_SHELLS':
         return {
            ...state,
            shells: payload,
         }
      default:
         return state
   }
}
