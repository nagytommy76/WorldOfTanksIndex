import type { IDevicesReducerState, IDevicesContextActions } from './Types'

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
            },
         }
      }
   }
}
