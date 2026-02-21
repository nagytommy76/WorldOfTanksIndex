import type { IFieldDifferences, ShellComparableField, ShellDiffMap } from '@/types/VehicleDetails/Modifiers'

export interface IModifiersReducerState {
   modifiers: {
      shells: ShellDiffMap
   }
}

export type IModifiersContextActions =
   | {
        type: 'SET_SHELLS_MODIFIERS'
        payload: { [Field in ShellComparableField]: IFieldDifferences }
     }
   | { type: 'RESET_SHELLS_MODIFIERS'; payload: null }

const moduleModifier: IFieldDifferences = {
   base: 0,
   compared: 0,
   difference: 0,
   percentDifference: 0,
   improved: false,
   neutral: false,
}

export const modifiersInitialState: IModifiersReducerState = {
   modifiers: {
      //   vehicleChassis: moduleModifier,
      //   vehicleEngine: moduleModifier,
      //   vehicleRadio: moduleModifier,
      //   vehicleTurret: moduleModifier,
      //   vehicleGun: moduleModifier,
      shells: {
         'damage.armor': moduleModifier,
         speed: moduleModifier,
         maxDistance: moduleModifier,
         price: moduleModifier,
         'piercingPower[0]': moduleModifier,
         'piercingPower[1]': moduleModifier,
      },
   },
}
