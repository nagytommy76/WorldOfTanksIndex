import Typography from '@mui/material/Typography'
import ReturnPercentValue from '@/helpers/returnPercentValue'
import { ReturnHighlightedValueString } from './ReturnDisplayString'
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
   const displayString = ReturnHighlightedValueString(displayValue)[name]
   let finalHighlighted = displayString.highlightedText
   switch (name) {
      case 'vehicleForwardMaxSpeed':
      case 'vehicleBackwardMaxSpeed':
         break
      default:
         finalHighlighted = ReturnPercentValue(displayString.highlightedText)
         break
   }

   // Skip rendering if the modifier name is not recognized
   if (!displayString) return null

   return (
      <Typography variant='body2'>
         <span className='font-bold text-green-500'>{displayString.prefix}</span>
         <span className='font-bold text-green-500'>{finalHighlighted}</span>
         <span className='font-bold text-green-500'>{displayString.suffix}</span>
         <span>{displayString.text}</span>
      </Typography>
   )
}
