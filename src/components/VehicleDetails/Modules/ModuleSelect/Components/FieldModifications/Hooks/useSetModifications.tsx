import { useContext } from 'react'
import { FieldModificationContext } from '@/VehicleContext/FieldModificationContext/FieldModificationContext'
import { collectBaseModifications } from '@/utils/FieldModifications/collectBaseModifications'

import type { IFieldModificationLevel } from '@/utils/FieldModifications/groupFieldModificationLevels'

export default function useSetModifications(levels: IFieldModificationLevel[]) {
   const { fieldModDispatch } = useContext(FieldModificationContext)

   /**
    * @description Replaces the applied base modifications with the ones of levels I..levelValue,
    * so lowering the level drops the modifications above it
    * @param levelValue 0 = nothing unlocked
    */
   function setBaseModification(levelValue: number) {
      fieldModDispatch({
         type: 'SET_APPLIED_BASE_MODIFICATIONS',
         payload: collectBaseModifications(levels, levelValue),
      })
   }
   return { setBaseModification }
}
