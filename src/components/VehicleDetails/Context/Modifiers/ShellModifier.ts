import Modifier from './Modifier'
import type { DiffDirection, ShellComparableField, ShellDiffMap } from '@/types/VehicleDetails/Modifiers'
import type { IShells } from '@/types/VehicleDetails/Shells'

export default class ShellModifier extends Modifier {
   FIELD_DIRECTIONS: Record<ShellComparableField, DiffDirection> = {
      'piercingPower[0]': 'higher-is-better',
      'piercingPower[1]': 'higher-is-better',
      'damage.armor': 'higher-is-better',
      speed: 'higher-is-better',
      maxDistance: 'higher-is-better',
      price: 'lower-is-better',
   }

   extractShellValue(shell: IShells, field: ShellComparableField): number | null {
      switch (field) {
         case 'piercingPower[0]':
            return shell.piercingPower[0]
         case 'piercingPower[1]':
            return shell.piercingPower[1]
         case 'damage.armor':
            return typeof shell.damage.armor === 'number' ? shell.damage.armor : shell.damage.armor[0]
         case 'speed':
            return shell.speed
         case 'maxDistance':
            return shell.maxDistance
         case 'price':
            return shell.price
         default:
            return null
      }
   }

   compareShells(base: IShells, compared: IShells): ShellDiffMap {
      const diff: ShellDiffMap = {} as ShellDiffMap

      for (const field of Object.keys(this.FIELD_DIRECTIONS) as ShellComparableField[]) {
         const baseVal = this.extractShellValue(base, field)
         const compVal = this.extractShellValue(compared, field)

         // Skip fields where either shell has no data (e.g. explosionRadius on AP)
         if (baseVal === null || compVal === null) continue

         diff[field] = this.buildFieldDifference(baseVal, compVal, this.FIELD_DIRECTIONS[field])
      }

      return diff
   }
}
