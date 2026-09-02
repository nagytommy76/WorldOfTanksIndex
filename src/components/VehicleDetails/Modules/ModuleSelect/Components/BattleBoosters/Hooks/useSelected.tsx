import { useContext, useEffect, useState } from 'react'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import type { BattleBoosterModifierKeys } from '@/DevicesContext/Types'
import type { IDevice } from '@/types/Devices/Devices'

export default function useSelected(booster: IDevice) {
   const [isBlocked, setIsBolcked] = useState(true)
   const [isSelected, setISSelected] = useState(true)

   const { crewDispatch } = useContext(CrewContext)
   const {
      deviceDispatch,
      deviceReducer: { incompatibleDevices, appliedBattleBoosterModifiers },
      selectedDevices,
   } = useContext(DeviceContext)

   /**
    * @description Checks if incompatibleDevices is null -> set blocked
    */
   useEffect(() => {
      if (!appliedBattleBoosterModifiers) {
         if (incompatibleDevices) {
            const foundInAppliedModifiers =
               incompatibleDevices.includes(booster.icon) ||
               Object.keys(selectedDevices).includes(booster.icon)
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
         }
         return
      }

      const appliedBoosters = Object.keys(appliedBattleBoosterModifiers)
      if (appliedBoosters.length === 1 && !appliedBoosters.includes(booster.icon)) {
         setIsBolcked(true)
         setISSelected(true)
      } else {
         setIsBolcked(false)
         setISSelected(false)
      }
   }, [appliedBattleBoosterModifiers, booster.icon, incompatibleDevices, selectedDevices, deviceDispatch])

   function AddRemoveBooster() {
      if (booster.modifiers) {
         if (
            appliedBattleBoosterModifiers &&
            (Object.keys(appliedBattleBoosterModifiers).includes(booster.icon) ||
               Object.keys(appliedBattleBoosterModifiers).includes(booster.name))
         ) {
            deviceDispatch({
               type: 'REMOVE_BATTLE_BOOSTER_MODIFIER',
               payload: {
                  archeType: booster.icon as BattleBoosterModifierKeys,
               },
            })
            if (booster.icon === 'improvedVentilation') {
               deviceDispatch({
                  type: 'REMOVE_BATTLE_BOOSTER_MODIFIER',
                  payload: {
                     archeType: 'improvedVentilationBattleBooster',
                  },
               })
               crewDispatch({
                  type: 'REMOVE_APPLIED_CREW_MODIFIER',
                  payload: 'improvedVentilationBattleBooster',
               })
            }
            setISSelected(true)
         } else {
            if (booster.icon === 'improvedVentilation') {
               deviceDispatch({
                  type: 'SET_BATTLE_BOOSTER_MODIFIER',
                  payload: {
                     archeType: 'improvedVentilationBattleBooster',
                     name: booster.modifiers[0].name,
                     value: booster.modifiers[0].value,
                  },
               })
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
               })
            }
            setISSelected(false)
         }
      }
   }

   return {
      isBlocked,
      isSelected,
      AddRemoveBooster,
   }
}
