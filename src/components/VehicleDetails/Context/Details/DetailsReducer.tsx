import { IDetailsReducerState, IDetailsContextActions } from './DetailsType'
export default function DetailsReducer(
   state: IDetailsReducerState,
   { payload, type }: IDetailsContextActions
) {
   switch (type) {
      case 'SET_VEHICLE_PROFILE':
         return {
            ...state,
            vehicleProfile: payload,
         }
      default:
         return state
   }
}
