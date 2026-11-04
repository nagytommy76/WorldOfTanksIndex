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
      const kpiValue: { [name: string]: number } = {}
      for (let index = 0; index < levelValue; index++) {
         const currentLevel = levels[index]
         if (currentLevel.mainStep?.modification === null && levelValue === 1) {
            fieldModDispatch({ type: 'RESET_APPLIED_BASE_MODIFICATIONS' })
            return
         }
         if (currentLevel.mainStep?.modification?.kind === 'base') {
            for (const modifier of currentLevel.mainStep.modification.kpi) {
               if (kpiValue[modifier.name]) {
                  kpiValue[modifier.name] = kpiValue[modifier.name] + Number(modifier.value - 1)
               } else {
                  kpiValue[modifier.name] = modifier.value
               }
               fieldModDispatch({
                  type: 'SET_APPLIED_BASE_MODIFICATIONS',
                  payload: {
                     name: modifier.name,
                     operation: modifier.operation,
                     value: kpiValue[modifier.name],
                  },
               })
            }
         }
      }
   }
   return { setBaseModification }
}
