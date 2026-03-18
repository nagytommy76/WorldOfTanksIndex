import React from 'react'

import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

export default function SingleMenuItem({
   displayName,
   children,
   handleClose,
}: {
   displayName: string
   handleClose: () => void
   children?: React.ReactNode
}) {
   return (
      <MenuItem className='flex flex-row gap-2' onClick={handleClose}>
         {children}
         <Typography variant='body1' fontSize={11}>
            {displayName}
         </Typography>
      </MenuItem>
   )
}
