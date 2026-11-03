import { useContext } from 'react'
import { FieldModificationContext } from '@/VehicleContext/FieldModificationContext/FieldModificationContext'

import type { IFieldModificationLevel } from '@/utils/FieldModifications/groupFieldModificationLevels'

export default function useSetModifications(levels: IFieldModificationLevel[]) {
   const { fieldModDispatch } = useContext(FieldModificationContext)

   function setBaseModification(levelValue: number) {
      if (levelValue === 0) {
         fieldModDispatch({ type: 'RESET_APPLIED_BASE_MODIFICATIONS' })
         return
      }

      for (let index = 0; index < levelValue; index++) {
         const currentLevel = levels[index]
         if (currentLevel.mainStep?.modification?.kind === 'base') {
            console.log('LEVELS TO WATCH:: ', currentLevel.mainStep.modification.kpi)

            for (const modifier of currentLevel.mainStep.modification.kpi) {
               fieldModDispatch({
                  type: 'SET_APPLIED_BASE_MODIFICATIONS',
                  payload: {
                     name: modifier.name,
                     operation: modifier.operation,
                     value: modifier.value,
                  },
               })
            }
         }
      }
   }
   return { setBaseModification }
}
