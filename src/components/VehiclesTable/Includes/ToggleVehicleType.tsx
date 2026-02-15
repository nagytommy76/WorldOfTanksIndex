import Image from 'next/image'
import { useContext } from 'react'
import { OrderContext, OrderDispatchContext } from '@/OrderContext/OrderContext'

import getIcon, { vehicleTypes } from '@/lib/getVehicleTypeIcon'
import retrunVehicleType from '@/helpers/returnVehicleType'

import Tooltip from '@mui/material/Tooltip'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ToggleVehicleType() {
   const {
      orderReducer: { vehicleTypesToggle },
   } = useContext(OrderContext)
   const { orderDispatch } = useContext(OrderDispatchContext)

   return (
      <ToggleButtonGroup
         value={vehicleTypesToggle}
         onChange={(_, value: string[]) => {
            orderDispatch({ type: 'SET_TYPE_TOGGLE', payload: value })
         }}
         aria-label='text alignment'
      >
         {vehicleTypes.map((type) => {
            return (
               <Tooltip key={type} title={retrunVehicleType(type)} placement='top' arrow>
                  <ToggleButton value={type} aria-label={type}>
                     <Image src={getIcon(type)} alt={type} width={16} height={16} />
                  </ToggleButton>
               </Tooltip>
            )
         })}
      </ToggleButtonGroup>
   )
}
