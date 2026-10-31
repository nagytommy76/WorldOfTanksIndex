'use client'
import { createContext, useReducer } from 'react'

import { fieldModificationInitialState, type IFieldModificationContext } from './Types'
import FieldModificationReducer from './FieldModificationReducer'

export const FieldModificationContext = createContext<IFieldModificationContext>({
   fieldModReducer: fieldModificationInitialState,
   fieldModDispatch: () => null,
})

/**
 * @description Holds the field modification choices of the vehicle page.
 * It wraps the module tabs, so the choices survive tab switches (CustomTabPanel unmounts the inactive tabs)
 * and the details table can read them later.
 */
export default function FieldModificationContextProvider({ children }: { children: React.ReactNode }) {
   const [fieldModReducer, fieldModDispatch] = useReducer(
      FieldModificationReducer,
      fieldModificationInitialState,
   )

   return (
      <FieldModificationContext.Provider value={{ fieldModReducer, fieldModDispatch }}>
         {children}
      </FieldModificationContext.Provider>
   )
}
