import React from 'react'

import Typography from '@mui/material/Typography'

type ModifiersType = {
   difference: number
   improved: boolean
}

function ReturnTypography({
   children,
   modifiersDifference,
}: {
   children: React.ReactNode
   modifiersDifference: number
}) {
   return (
      <>
         {modifiersDifference > 0 ? (
            <Typography className='text-green-600 mr-2' variant='body1'>
               {children}
            </Typography>
         ) : (
            <Typography className='text-red-600 mr-2' variant='body1'>
               {children}
            </Typography>
         )}
      </>
   )
}

export default function Modifiers({ modifiers }: { modifiers: ModifiersType[] }) {
   if (modifiers[0].difference === 0) return
   if (modifiers.length === 1) {
      return (
         <ReturnTypography modifiersDifference={modifiers[0].difference}>
            {modifiers[0].difference}
         </ReturnTypography>
      )
   } else {
      return (
         <ReturnTypography modifiersDifference={modifiers[0].difference}>
            {modifiers[0].difference} / {modifiers[1].difference}
         </ReturnTypography>
      )
   }
}
