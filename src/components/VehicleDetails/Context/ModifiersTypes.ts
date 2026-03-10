import type {
   IFieldDifferences,
   ShellComparableField,
   ShellDiffMapState,
} from '@/types/VehicleDetails/Modifiers'
import { ModuleTypeMap } from './Types'

export interface IModifiersReducerState {
   modifiers: {
      shells: ShellDiffMapState
   }
   defaultModuleNames: {
      [K in keyof ModuleTypeMap]: string
   }
}

export type IModifiersContextActions =
   | {
        type: 'SET_SHELLS_MODIFIERS'
        payload: { [Field in ShellComparableField]: IFieldDifferences }
     }
   | { type: 'RESET_SHELLS_MODIFIERS'; payload: null }
   | { type: 'SET_DEFAULT_SHELL_NAME'; payload: { shells: string } }

export const modifiersInitialState: IModifiersReducerState = {
   defaultModuleNames: {
      vehicleChassis: '',
      vehicleEngine: '',
      vehicleRadio: '',
      vehicleTurret: '',
      vehicleGun: '',
      shells: '',
   },
   modifiers: {
      //   vehicleChassis: moduleModifier,
      //   vehicleEngine: moduleModifier,
      //   vehicleRadio: moduleModifier,
      //   vehicleTurret: moduleModifier,
      //   vehicleGun: moduleModifier,
      shells: {
         'damage.armor': null,
         speed: null,
         maxDistance: null,
         price: null,
         'piercingPower[0]': null,
         'piercingPower[1]': null,
      },
   },
}
