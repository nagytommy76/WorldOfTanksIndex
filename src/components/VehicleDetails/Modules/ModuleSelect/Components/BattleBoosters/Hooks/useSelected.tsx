import { useCallback, useContext, useEffect } from 'react'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import useBlocked from '@/BattleBoosters/Hooks/useBlocked'

import type { BattleBoosterModifierKeys } from '@/DevicesContext/Types'
import type { IDevice } from '@/types/Devices/Devices'

const VENTILATION_BOOSTER_KEY = 'improvedVentilationBattleBooster'

/**
 * @description The key the booster's modifiers are stored under in appliedBattleBoosterModifiers.
 * improvedVentilation is stored under improvedVentilationBattleBooster (CrewContext reads it from there),
 * every other booster under its icon.
 */
function getBoosterModifierKey(booster: IDevice) {
   return (
      booster.icon === 'improvedVentilation' ? VENTILATION_BOOSTER_KEY : booster.icon
   ) as BattleBoosterModifierKeys
}

export default function useSelected(booster: IDevice) {
   const { isBlocked, isSelected, setISSelected, setIsBolcked } = useBlocked()

   const { crewDispatch } = useContext(CrewContext)
   const {
      deviceDispatch,
      deviceReducer: { incompatibleDevices, appliedBattleBoosterModifiers },
      selectedDevices,
   } = useContext(DeviceContext)

   const modifierKey = getBoosterModifierKey(booster)

   const removeBooster = useCallback(() => {
      deviceDispatch({
         type: 'REMOVE_BATTLE_BOOSTER_MODIFIER',
         payload: { archeType: modifierKey },
      })
      if (modifierKey === VENTILATION_BOOSTER_KEY) {
         crewDispatch({
            type: 'REMOVE_APPLIED_CREW_MODIFIER',
            payload: VENTILATION_BOOSTER_KEY,
         })
      }
   }, [modifierKey, deviceDispatch, crewDispatch])

   /**
    * @description The booster is blocked until a device with the same archeType is selected,
    * or while another booster is applied.
    * If the device gets deselected while this booster is applied, the booster is removed too.
    */
   useEffect(() => {
      const appliedBoosters = appliedBattleBoosterModifiers ? Object.keys(appliedBattleBoosterModifiers) : []
      const isThisBoosterApplied = appliedBoosters.includes(modifierKey)
      const isDeviceSelected =
         Boolean(incompatibleDevices?.includes(booster.icon)) || booster.icon in selectedDevices

      if (!isDeviceSelected) {
         if (isThisBoosterApplied) removeBooster()
         setIsBolcked(true)
         setISSelected(true)
         return
      }

      const isOtherBoosterApplied = appliedBoosters.length > 0 && !isThisBoosterApplied
      setIsBolcked(isOtherBoosterApplied)
      setISSelected(!isThisBoosterApplied)
   }, [
      appliedBattleBoosterModifiers,
      booster.icon,
      modifierKey,
      incompatibleDevices,
      selectedDevices,
      removeBooster,
      setISSelected,
      setIsBolcked,
   ])

   function AddRemoveBooster() {
      if (!booster.modifiers) return

      if (appliedBattleBoosterModifiers?.[modifierKey]) {
         removeBooster()
         setISSelected(true)
         return
      }

      booster.modifiers.forEach((modifier) => {
         deviceDispatch({
            type: 'SET_BATTLE_BOOSTER_MODIFIER',
            payload: {
               archeType: modifierKey,
               name: modifier.name,
               value: modifier.value,
            },
         })
      })
      setISSelected(false)
   }

   return {
      isBlocked,
      isSelected,
      AddRemoveBooster,
   }
}
