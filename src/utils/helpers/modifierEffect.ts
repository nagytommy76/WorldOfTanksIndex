import type { DiffDirection, IRowModifier } from '@/types/VehicleDetails/Modifiers'

export interface IRowEffect {
   improved: boolean
   percent: number
}

// The percent change at which the row tint reaches its full strength
const FULL_TINT_PERCENT = 15
const MIN_ALPHA = 0.06
const MAX_ALPHA = 0.45

// Tailwind green-600 / red-600, the same colors the difference text uses
const IMPROVED_RGB = '22, 163, 74'
const WORSENED_RGB = '220, 38, 38'

/**
 * @description An explicit `improved` wins, otherwise the sign of the difference decides
 */
export function isImproved(modifier: IRowModifier, direction: DiffDirection = 'higher-is-better'): boolean {
   if (modifier.improved !== undefined) return modifier.improved
   return direction === 'lower-is-better' ? modifier.difference < 0 : modifier.difference > 0
}

function returnValueAt(valueText: number[] | number | string, index: number, modifiersCount: number) {
   if (typeof valueText === 'number') return valueText
   if (typeof valueText === 'string') return null
   // Each value has its own modifier only when the lengths match
   return (valueText.length === modifiersCount ? valueText[index] : valueText[0]) ?? null
}

/**
 * @description Returns the biggest effect (in percent of the base value) of the row, or null if nothing changed
 */
export function getRowEffect(
   modifiers: IRowModifier[] | null | undefined,
   valueText: number[] | number | string,
   direction: DiffDirection = 'higher-is-better',
): IRowEffect | null {
   if (!modifiers) return null

   let rowEffect: IRowEffect | null = null

   modifiers.forEach((modifier, index) => {
      if (!modifier.difference) return

      const value = returnValueAt(valueText, index, modifiers.length)
      const base = modifier.base ?? (value === null ? 0 : value - modifier.difference)
      const percent = base !== 0 ? Math.abs(modifier.difference / base) * 100 : 100

      if (rowEffect === null || percent > rowEffect.percent) {
         rowEffect = { improved: isImproved(modifier, direction), percent }
      }
   })

   return rowEffect
}

/**
 * @description Green / red background, the bigger the effect the stronger the color
 */
export function getRowTint(effect: IRowEffect | null): string | undefined {
   if (!effect) return undefined

   const strength = Math.min(effect.percent / FULL_TINT_PERCENT, 1)
   const alpha = MIN_ALPHA + strength * (MAX_ALPHA - MIN_ALPHA)

   return `rgba(${effect.improved ? IMPROVED_RGB : WORSENED_RGB}, ${parseFloat(alpha.toFixed(3))})`
}
