'use client'
import { useContext, useState } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import { CustomSwitch } from '../CrewSwitch/CrewSwitch'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function RocketBoosterSwitch() {
   const [checkedState, setChecked] = useState(false)
   const { rocketAcceleration } = useContext(VehicleContext)
   const { deviceDispatch } = useContext(DeviceContext)

   if (!rocketAcceleration) return null

   function handleChange(_: React.SyntheticEvent, checked: boolean) {
      if (!rocketAcceleration) return null
      setChecked(checked)
      // itt hozzáadni a devices reducerhez a rocketBoosters - t
      if (checked) {
         deviceDispatch({
            type: 'SET_DEVICE_MODIFIER',
            payload: {
               archeType: 'rocketBoosters',
               name: 'rocketVehicleAllGroundRotationSpeed',
               value: rocketAcceleration.vehicleAllGroundRotationSpeed,
            },
         })
         deviceDispatch({
            type: 'SET_DEVICE_MODIFIER',
            payload: {
               archeType: 'rocketBoosters',
               name: 'rocketVehicleBackwardMaxSpeed',
               value: rocketAcceleration.vehicleBackwardMaxSpeed,
            },
         })
         deviceDispatch({
            type: 'SET_DEVICE_MODIFIER',
            payload: {
               archeType: 'rocketBoosters',
               name: 'rocketVehicleEnginePower',
               value: rocketAcceleration.vehicleEnginePower,
            },
         })
         deviceDispatch({
            type: 'SET_DEVICE_MODIFIER',
            payload: {
               archeType: 'rocketBoosters',
               name: 'rocketVehicleForwardMaxSpeed',
               value: rocketAcceleration.vehicleForwardMaxSpeed,
            },
         })
      } else {
         deviceDispatch({
            type: 'REMOVE_DEVICE_MODIFIER',
            payload: {
               archeType: 'rocketBoosters',
            },
         })
      }
   }

   return (
      <FormControlLabel
         title='Activate Rocket Boosters'
         checked={checkedState}
         onChange={handleChange}
         control={<CustomSwitch sx={{ m: 1 }} />}
         labelPlacement='start'
         label='Rocket Boosters'
      />
   )
}
