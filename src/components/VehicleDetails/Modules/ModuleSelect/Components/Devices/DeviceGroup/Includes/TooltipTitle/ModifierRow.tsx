import Typography from '@mui/material/Typography'
import ReturnModifierDisplayString from './ReturnDisplayString'
/**
 * @returns the appropriate numeric value to display.
 * @description If the supply slot is active AND a specValue exists, show the specValue (boosted value).
 * Otherwise show the base value.
 */
function resolveDisplayValue(
   value: number,
   specValue: number | null | undefined,
   isSpecActive: boolean,
): number {
   return isSpecActive && specValue ? specValue : value
}

/**
 * @description Renders a single modifier line (e.g. "+10% to view range").
 * @returns null if the modifier name has no matching display string.
 */
export default function ModifierRow({
   name,
   value,
   specValue,
   isSpecActive,
}: {
   name: string
   value: number
   specValue: number | null
   isSpecActive: boolean
}) {
   const displayValue = resolveDisplayValue(value, specValue, isSpecActive)

   // Look up the human-readable string for this modifier name
   const displayString = ReturnModifierDisplayString(displayValue)[name]

   // Skip rendering if the modifier name is not recognized
   if (!displayString) return null

   return <Typography variant='body2'>{displayString}</Typography>
}
