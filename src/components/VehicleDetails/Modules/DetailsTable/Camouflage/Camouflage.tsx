'use client'
import { useContext, useState } from 'react'
import Image from 'next/image'

import { DeviceContext } from '@/VehicleContext/DevicesContext/DeviceContext'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Checkbox from '@mui/material/Checkbox'

export default function Camouflage() {
   const [checked, setChecked] = useState(false)
   const { deviceDispatch } = useContext(DeviceContext)
   const { vehicleType } = useContext(VehicleContext)

   function onChange(checked: boolean) {
      if (!checked) {
         deviceDispatch({
            type: 'REMOVE_DEVICE_MODIFIER',
            payload: {
               archeType: 'camouflagePaint',
            },
         })
      } else {
         switch (vehicleType) {
            case 'heavyTank':
            case 'SPG':
               deviceDispatch({
                  type: 'SET_DEVICE_MODIFIER',
                  payload: {
                     archeType: 'camouflagePaint',
                     name: 'vehicleCamouflage',
                     value: 1.02,
                  },
               })
               break
            case 'mediumTank':
            case 'lightTank':
               deviceDispatch({
                  type: 'SET_DEVICE_MODIFIER',
                  payload: {
                     archeType: 'camouflagePaint',
                     name: 'vehicleCamouflage',
                     value: 1.03,
                  },
               })
               break
            case 'AT-SPG':
               deviceDispatch({
                  type: 'SET_DEVICE_MODIFIER',
                  payload: {
                     archeType: 'camouflagePaint',
                     name: 'vehicleCamouflage',
                     value: 1.04,
                  },
               })
               break
         }
      }
      setChecked(checked)
   }

   return (
      <Checkbox
         title='Paint camouflage on this vehicle'
         checked={checked}
         onChange={(e) => onChange(e.target.checked)}
         icon={<CheckedImage checked={false} />}
         checkedIcon={<CheckedImage checked={true} />}
         disableRipple
         sx={{
            padding: 0,
         }}
      />
   )
}

function CheckedImage({ checked }: { checked: boolean }) {
   return (
      <div
         className={`
      relative h-[70px] w-[70px] overflow-hidden rounded-xs border-1  transition-all
      ${checked ? 'border-amber-400/80' : 'border-transparent'}
      `}
      >
         <Image
            src={'/icons/concealment/camouflage.png'}
            className='object-cover h-full w-full'
            width={80}
            height={80}
            alt='camouflage'
         />
      </div>
   )
}
