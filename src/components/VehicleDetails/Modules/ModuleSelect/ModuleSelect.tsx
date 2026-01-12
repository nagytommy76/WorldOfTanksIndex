/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import useSetShells from '../../Context/Hooks/useSetShells'

import type { ModuleType } from '@/types/VehicleDetails/module'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'

import ReturnModuleType from '../Includes/ModuleType'
import ModuleImage from '../Includes/ModuleImage'
import { ITankData } from '@/types/VehicleDetails/Vehicle'

export default function ModuleSelect() {
   const {
      vehicleReducer: { selectedModuleNames, moduleGroup },
      vehicleDispatch,
   } = useContext(VehicleContext)
   useSetShells()

   function setModuleNameByType(moduleType: ModuleType, moduleName: string) {
      vehicleDispatch({
         type: 'SET_MODULE_NAME_BY_TYPE',
         payload: { type: moduleType, value: moduleName },
      })
   }

   function setModuleName(moduleName: string): string {
      return moduleName.toString().split('_').join(' ')
   }

   return (
      <aside className={'w-full flex flex-col items-center xl:w-[300px]'}>
         <Typography variant='h5'>Modules</Typography>
         {Object.entries(moduleGroup).map(([key, modules]) => (
            <List key={key} sx={{ width: '100%', maxWidth: 290 }}>
               <ReturnModuleType moduleType={key as ModuleType} />
               {Object.entries(modules as Record<string, any>).map(([moduleKey, module]) => (
                  <ListItemButton
                     className='h-10 rounded-sm'
                     key={module.name}
                     selected={module.name === selectedModuleNames[key as ModuleType]}
                     onClick={() => setModuleNameByType(key as ModuleType, module.name)}
                     onMouseEnter={() => {
                        // console.log('Hovered module name: ', moduleGroup[key as ModuleType][moduleKey])
                        // console.log('Active Selected module name: ', selectedModuleNames[key as ModuleType])
                        // const T = vehicleDifferences(
                        //    module,
                        //    moduleGroup[key as ModuleType][selectedModuleNames[key as ModuleType]]
                        // )
                        // console.log(T)
                     }}
                     sx={{
                        '&.Mui-selected': {
                           backgroundColor: 'rgba(63, 63, 63, 0.925)',
                        },
                        '&.Mui-selected:hover': {
                           backgroundColor: 'rgba(44, 44, 44, 0.925)',
                        },
                     }}
                  >
                     <ModuleImage
                        moduleName={module.name}
                        moduleType={key as ModuleType}
                        shellImage={module.kind}
                     />
                     {key === 'shells' ? (
                        <Typography variant='caption'>{setModuleName(module.name)}</Typography>
                     ) : (
                        <Typography variant='caption'>
                           {module.id !== undefined
                              ? setModuleName(module.id)
                              : setModuleName(module.name) || ''}
                        </Typography>
                     )}
                  </ListItemButton>
               ))}
            </List>
         ))}
      </aside>
   )
}

type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonObject | JsonArray
interface JsonObject {
   [key: string]: JsonValue
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface JsonArray extends Array<JsonValue> {}

/**
 * Returns an object/array that has the same structure as `changed`,
 * but only contains values that are different from `base`.
 *
 * For primitives: returns `changed` if it differs from `base`.
 * For objects: returns only keys that changed.
 * For arrays: returns an array of the same length, with entries only
 * where something changed (other entries are left `undefined`).
 *
 * If there is no difference at all, returns `undefined`.
 */
function vehicleDifferences<T extends JsonValue>(base: T, changed: T): Partial<ITankData> | undefined {
   // Fast path for identical values, including NaN handling
   if (Object.is(base, changed)) {
      return undefined
   }

   const baseIsArray = Array.isArray(base)
   const changedIsArray = Array.isArray(changed)

   const baseIsObject = typeof base === 'object' && base !== null && !baseIsArray
   const changedIsObject = typeof changed === 'object' && changed !== null && !changedIsArray

   // If types differ, or one side is primitive, just return the changed value
   if (
      (!baseIsObject && !baseIsArray) ||
      (!changedIsObject && !changedIsArray) ||
      baseIsArray !== changedIsArray ||
      baseIsObject !== changedIsObject
   ) {
      return changed as Partial<T>
   }

   // Both are arrays
   if (baseIsArray && changedIsArray) {
      const baseArr = base as JsonArray
      const changedArr = changed as JsonArray

      const maxLen = Math.max(baseArr.length, changedArr.length)
      const result: Array<Partial<JsonValue> | undefined> = []
      let hasChanges = false

      for (let i = 0; i < maxLen; i += 1) {
         const childDiff = vehicleDifferences(baseArr[i] as JsonValue, changedArr[i] as JsonValue)

         if (childDiff !== undefined) {
            result[i] = childDiff
            hasChanges = true
         }
      }

      return hasChanges ? (result as any) : undefined
   }

   // Both are plain objects
   if (baseIsObject && changedIsObject) {
      const baseObj = base as JsonObject
      const changedObj = changed as JsonObject

      const result: { [key: string]: Partial<JsonValue> | undefined } = {}
      let hasChanges = false

      const keys = new Set<string>([...Object.keys(baseObj), ...Object.keys(changedObj)])

      for (const key of keys) {
         // If the key does not exist in `changed`, ignore it.
         if (!(key in changedObj)) {
            continue
         }

         const childDiff = vehicleDifferences(baseObj[key] as JsonValue, changedObj[key] as JsonValue)

         if (childDiff !== undefined) {
            result[key] = childDiff
            hasChanges = true
         }
      }

      return hasChanges ? (result as Partial<T>) : undefined
   }

   // Fallback, should not really hit here, but for safety
   return changed as Partial<T>
}
