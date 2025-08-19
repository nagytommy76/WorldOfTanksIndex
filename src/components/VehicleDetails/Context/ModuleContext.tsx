import { createContext, useReducer, useEffect, useState } from 'react'
import ModuleReducer from './ModuleReducer'
import { moduleInitialState, type IModuleAction, IModulesReducerState } from './Types'

export const ModuleContext = createContext({})

export default function ModuleContextProvider() {
   return <div>ModuleContext</div>
}
