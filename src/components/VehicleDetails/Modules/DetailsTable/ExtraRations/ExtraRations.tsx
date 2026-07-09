'use client'
import { useContext, useState } from 'react'
import Image from 'next/image'

import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import Checkbox from '@mui/material/Checkbox'

export default function ExtraRations() {
   const [checked, setChecked] = useState(false)
   const { crewDispatch } = useContext(CrewContext)
   const { nation } = useContext(VehicleContext)

   function onChange(checked: boolean) {
      if (!checked) {
         crewDispatch({
            type: 'REMOVE_APPLIED_CREW_MODIFIER',
            payload: 'extraCombatRations',
         })
      } else {
         crewDispatch({
            type: 'SET_APPLIED_CREW_MODIFIER',
            payload: {
               name: 'extraCombatRations',
               value: 1.1,
            },
         })
      }
      setChecked(checked)
   }

   return (
      <Checkbox
         title='Extra combat rations gives 10% crew efficiency bonus.'
         checked={checked}
         onChange={(e) => onChange(e.target.checked)}
         icon={<CheckedImage checked={false} nation={nation} />}
         checkedIcon={<CheckedImage checked={true} nation={nation} />}
         disableRipple
         sx={{
            padding: 0,
         }}
      />
   )
}

function CheckedImage({ checked, nation }: { checked: boolean; nation: string }) {
   return (
      <div
         className={`
      relative h-[70px] w-[70px] overflow-hidden rounded-xs border-1  transition-all
      ${checked ? 'border-amber-400/80' : 'border-transparent'}
      `}
      >
         <Image
            src={`/icons/rations/${nation}.png`}
            className='object-cover h-full w-full'
            width={80}
            height={80}
            alt='camouflage'
         />
      </div>
   )
}
