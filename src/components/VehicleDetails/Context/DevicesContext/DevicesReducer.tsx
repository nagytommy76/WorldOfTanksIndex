import type {
   IDevicesReducerState,
   IDevicesContextActions,
   DeviceModifiers,
   BattleBoosterModifiers,
} from './Types'

export default function DevicesReducer(
   state: IDevicesReducerState,
   { payload, type }: IDevicesContextActions,
) {
   switch (type) {
      /**
       * DEVICE MODIFIERS
       */
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
      /**
       * BATTLE BOOSTER MODIFIERS
       */
      case 'SET_BATTLE_BOOSTER_MODIFIER':
         const { name, value, archeType } = payload
         const previousForArchetype = state.appliedBattleBoosterModifiers?.[archeType] ?? []
         const otherModifiersForArchetype = previousForArchetype.filter((m) => m.name !== name)

         return {
            ...state,
            appliedBattleBoosterModifiers: {
               ...state.appliedBattleBoosterModifiers,
               [archeType]: [...otherModifiersForArchetype, { name, value }],
            } as BattleBoosterModifiers,
         }

      case 'REMOVE_BATTLE_BOOSTER_MODIFIER':
         if (!state.appliedBattleBoosterModifiers) return state
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const { [payload.archeType]: _, ...rest } = state.appliedBattleBoosterModifiers
         if (Object.keys(rest).length === 0) {
            return {
               ...state,
               appliedBattleBoosterModifiers: null,
            }
         }
         return {
            ...state,
            appliedBattleBoosterModifiers: rest as BattleBoosterModifiers,
         }

      case 'SET_INCOMPATIBLE_DEVICES': {
         const incompatibleDevices = state.incompatibleDevices ?? []
         return {
            ...state,
            incompatibleDevices: incompatibleDevices.concat(payload) ?? null,
         }
      }
      case 'REMOVE_INCOMPATIBLE_DEVICE': {
         return {
            ...state,
            incompatibleDevices: state.incompatibleDevices?.filter((d) => d !== payload) ?? null,
         }
      }
      default: {
         return state
      }
   }
}
