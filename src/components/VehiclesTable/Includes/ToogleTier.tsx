import { useContext } from 'react'
import { OrderContext, OrderDispatchContext } from '@/OrderContext/OrderContext'

import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import tiers from '@/lib/tierList'

export default function ToogleTier() {
   const {
      orderReducer: { vehicleTierToggle },
   } = useContext(OrderContext)
   const { orderDispatch } = useContext(OrderDispatchContext)

   return (
      <ToggleButtonGroup
         value={vehicleTierToggle}
         onChange={(_, value: number[]) => {
            orderDispatch({ type: 'SET_TIER_TOGGLE', payload: value })
         }}
         aria-label='text alignment'
      >
         {tiers.map((tier, index) => {
            return (
               <ToggleButton
                  data-testid={`tier-${index + 1}`}
                  key={index}
                  value={index + 1}
                  aria-label='Vehicle tier'
               >
                  <Typography variant='caption'>{tier}</Typography>
               </ToggleButton>
            )
         })}
      </ToggleButtonGroup>
   )
}
