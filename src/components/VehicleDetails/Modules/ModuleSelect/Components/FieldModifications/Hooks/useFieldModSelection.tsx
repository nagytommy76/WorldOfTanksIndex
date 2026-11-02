import { useContext } from 'react'
import { FieldModificationContext } from '@/VehicleContext/FieldModificationContext/FieldModificationContext'

/**
 * @description Field modification choices of the vehicle page, with the actions that change them
 */
export default function useFieldModSelection() {
   const { fieldModReducer, fieldModDispatch } = useContext(FieldModificationContext)

   /**
    * @description Unlocks levels I..level (0 = nothing), the choices above it are dropped
    */
   function setUnlockedLevel(level: number) {
      console.log('CSÁÁÁÁÁÁÁÁÁÁÁÁÁÁ: ', level)
      fieldModDispatch({ type: 'SET_UNLOCKED_LEVEL', payload: level })
   }

   /**
    * @description Unlocks every level up to the given one, it never locks a level
    */
   function unlockUpTo(level: number) {
      if (level > fieldModReducer.unlockedLevel) setUnlockedLevel(level)
   }

   /**
    * @param optionXmlId The chosen pair option, null clears the choice of the level
    */
   function choosePairOption(level: number, optionXmlId: number | null) {
      fieldModDispatch({ type: 'CHOOSE_PAIR_OPTION', payload: { level, optionXmlId } })
   }

   /**
    * @param category The chosen category, e.g. 'stealth'. null clears the choice
    */
   function chooseRoleSlot(level: number, category: string | null) {
      fieldModDispatch({ type: 'CHOOSE_ROLE_SLOT', payload: { level, category } })
   }

   function reset() {
      fieldModDispatch({ type: 'RESET' })
   }

   return { ...fieldModReducer, setUnlockedLevel, unlockUpTo, choosePairOption, chooseRoleSlot, reset }
}
