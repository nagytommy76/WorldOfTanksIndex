import type { SxProps, Theme } from '@mui/material/styles'
import { FIELD_MOD_ORANGE } from './constants'

/**
 * @description Toggle group of field modification options: borderless buttons, the chosen one gets an orange glow
 * @param buttonRadius Border radius of the buttons, e.g. 1 (= theme border radius) or '50%'
 * @param gap Space between the buttons in theme spacing units
 */
export function getOptionGroupSx(buttonRadius: number | string, gap = 1): SxProps<Theme> {
   return {
      gap,
      '& .MuiToggleButtonGroup-grouped': {
         m: 0,
         p: 0,
         border: 0,
         borderRadius: buttonRadius,
         '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: 'transparent',
            boxShadow: `0 0 0 1px ${FIELD_MOD_ORANGE}, 0 0 10px ${FIELD_MOD_ORANGE}80`,
         },
      },
   }
}
