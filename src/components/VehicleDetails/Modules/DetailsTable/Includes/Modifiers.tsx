import React from 'react'

import Typography from '@mui/material/Typography'

type ModifiersType = {
   difference: number
   improved: boolean
}

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

export default function Modifiers({ modifiers }: { modifiers: ModifiersType[] }) {
   if (modifiers[0].difference === 0) return
   if (modifiers.length === 1) {
      return <ReturnTypography improved={modifiers[0].improved}>{modifiers[0].difference}</ReturnTypography>
   } else {
      return modifiers.map((modifier: ModifiersType, index: number) => (
         <ReturnTypography key={index} improved={modifier.improved}>
            {modifier.difference} {index === modifiers.length - 1 ? ' ' : '/ '}
         </ReturnTypography>
      ))
   }
}
