import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { BattleBoosterModifierKeys } from '@/DevicesContext/Types'

import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import type { IDevice } from '@/types/Devices/Devices'
import CheckIcon from '@mui/icons-material/Check'

export default function SingleBooster({ booster }: { booster: IDevice }) {
   const [isBlocked, setIsBolcked] = useState(true)
   const [isSelected, setISSelected] = useState(true)
   const {
      deviceDispatch,
      deviceReducer: { incompatibleDevices, appliedBattleBoosterModifiers },
      selectedDevices,
   } = useContext(DeviceContext)

   useEffect(() => {
      if (!incompatibleDevices) {
         setIsBolcked(true)
         return
      }
      const foundInAppliedModifiers =
         incompatibleDevices.includes(booster.icon) || Object.keys(selectedDevices).includes(booster.icon)

      if (foundInAppliedModifiers) {
         setIsBolcked(!foundInAppliedModifiers)
      } else {
         setIsBolcked(true)
         deviceDispatch({
            type: 'REMOVE_BATTLE_BOOSTER_MODIFIER',
            payload: {
               archeType: booster.icon as BattleBoosterModifierKeys,
            },
         })
         setISSelected(true)
      }
   }, [incompatibleDevices, booster.icon, selectedDevices, deviceDispatch])

   function AddRemoveBooster() {
      if (booster.modifiers) {
         if (
            appliedBattleBoosterModifiers &&
            Object.keys(appliedBattleBoosterModifiers).includes(booster.icon)
         ) {
            deviceDispatch({
               type: 'REMOVE_BATTLE_BOOSTER_MODIFIER',
               payload: {
                  archeType: booster.icon as BattleBoosterModifierKeys,
               },
            })
            setISSelected(true)
         } else {
            booster.modifiers.forEach((modifier) => {
               deviceDispatch({
                  type: 'SET_BATTLE_BOOSTER_MODIFIER',
                  payload: {
                     archeType: booster.icon as BattleBoosterModifierKeys,
                     name: modifier.name,
                     value: modifier.value,
                  },
               })
               setISSelected(false)
            })
         }
      }
   }

   return (
      <Button
         disabled={isBlocked}
         id='boosters-button'
         onClick={() => {
            AddRemoveBooster()
         }}
         sx={{
            opacity: isBlocked ? 0.5 : 1,
         }}
      >
         <Badge color='success' badgeContent={<CheckIcon />} invisible={isSelected}>
            <div className='w-[70px] h-[70px] flex items-center justify-center relative' key={booster.id}>
               <Image
                  src={`/icons/vehicle_modifiers/battle_booster/${booster.name}.png`}
                  alt={booster.name}
                  width={70}
                  height={70}
               />
            </div>
         </Badge>
      </Button>
   )
}
