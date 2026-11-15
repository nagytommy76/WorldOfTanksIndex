import React from 'react'
import type { DiffDirection, IRowModifier } from '@/types/VehicleDetails/Modifiers'

import { isImproved } from '@/utils/helpers/modifierEffect'

import Typography from '@mui/material/Typography'

function ReturnTypography({ children, improved = true }: { children: React.ReactNode; improved: boolean }) {
   return (
      <Typography
         className={`${improved ? 'text-green-600' : 'text-red-600'} font-semibold tracking-wider text-sm`}
         variant='body1'
      >
         {children}
      </Typography>
   )
}

export default function Modifiers({
   modifiers,
   direction = 'higher-is-better',
}: {
   modifiers: IRowModifier[]
   direction?: DiffDirection
}) {
   if (modifiers.length === 1) {
      return modifiers[0].difference === 0 ? null : (
         <ReturnTypography improved={isImproved(modifiers[0], direction)}>
            {modifiers[0].difference}
         </ReturnTypography>
      )
   }

   return modifiers.map((modifier: IRowModifier, index: number) => {
      return modifier.difference === 0 ? null : (
         <ReturnTypography key={index} improved={isImproved(modifier, direction)}>
            {modifier.difference} {index === modifiers.length - 1 ? ' ' : '/ '}
         </ReturnTypography>
      )
   })
}
