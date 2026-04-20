import type { IDevicesReducerState, IDevicesContextActions, DeviceModifiers } from './Types'

export default function DevicesReducer(
   state: IDevicesReducerState,
   { payload, type }: IDevicesContextActions,
) {
   switch (type) {
      case 'SET_DEVICE_MODIFIER': {
         const { name, value, archeType } = payload
         const previousForArchetype = state.appliedDevicesModifiers?.[archeType] ?? []
         const otherModifiersForArchetype = previousForArchetype.filter((m) => m.name !== name)
         return {
            ...state,
            appliedDevicesModifiers: {
               ...state.appliedDevicesModifiers,
               [archeType]: [...otherModifiersForArchetype, { name, value }],
            } as DeviceModifiers,
         }
      }
      case 'REMOVE_DEVICE_MODIFIER': {
         const { archeType } = payload
         if (!state.appliedDevicesModifiers) return state
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const { [archeType]: _, ...rest } = state.appliedDevicesModifiers
         if (Object.keys(rest).length === 0) {
            return {
               ...state,
               appliedDevicesModifiers: null,
            }
         }
         return {
            ...state,
            appliedDevicesModifiers: rest as DeviceModifiers,
         }
      }
      case 'SET_INCOMPATIBLE_DEVICES': {
         const incompatibleDevices = state.incompatibleDevices ?? []
         return {
            ...state,
            incompatibleDevices: incompatibleDevices.concat(payload),
         }
      }
      case 'REMOVE_INCOMPATIBLE_DEVICE': {
         return {
            ...state,
            incompatibleDevices: state.incompatibleDevices?.filter((d) => d !== payload),
         }
      }
      default: {
         return state
      }
   }
}
