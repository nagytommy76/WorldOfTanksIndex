import { useContext, useState } from 'react'
import { OrderContext, OrderDispatchContext } from '@/OrderContext/OrderContext'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

export default function VehicleNameField({ allVehicleNames }: { allVehicleNames: string[] }) {
   const {
      orderReducer: { vehicleByName },
   } = useContext(OrderContext)
   const { orderDispatch } = useContext(OrderDispatchContext)

   const [inputValue, setInputValue] = useState('')

   return (
      <Autocomplete
         value={vehicleByName}
         onChange={(_, newValue: string | null) => {
            orderDispatch({ type: 'SET_VEHICLE_BY_NAME', payload: newValue })
         }}
         inputValue={inputValue}
         onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue)
         }}
         id='vehicle-search'
         options={allVehicleNames}
         sx={{ width: 250 }}
         renderInput={(params) => (
            <TextField {...params} size='small' variant='standard' label='Search vehicle' />
         )}
      />
   )
}
