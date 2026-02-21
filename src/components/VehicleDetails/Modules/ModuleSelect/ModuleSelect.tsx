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
import type { IShells } from '@/types/VehicleDetails/Shells'
import type {
   ShellComparableField,
   DiffDirection,
   IFieldDifferences,
   ShellDiffMap,
} from '@/types/VehicleDetails/Modifiers'

export default function ModuleSelect() {
   const {
      vehicleReducer: { selectedModuleNames, moduleGroup },
      vehicleDispatch,
      modifiersDispatch,
   } = useContext(VehicleContext)
   useSetShells()

   const defaultShellName: string = selectedModuleNames['shells']

   function setModuleNameByType(moduleType: ModuleType, moduleName: string) {
      vehicleDispatch({
         type: 'SET_MODULE_NAME_BY_TYPE',
         payload: { type: moduleType, value: moduleName },
      })
   }

   function setModuleName(moduleName: string): string {
      return moduleName.toString().split('_').join(' ')
   }

   type Entries<T> = {
      [K in keyof T]: [K, T[K]]
   }[keyof T][]

   return (
      <aside className={'w-full flex flex-col items-center xl:w-[300px]'}>
         <Typography variant='h5'>Modules</Typography>
         {(Object.entries(moduleGroup) as Entries<typeof moduleGroup>).map(([key, modules]) => (
            <List key={key} sx={{ width: '100%', maxWidth: 290 }}>
               <ReturnModuleType moduleType={key} />
               {Object.entries(modules).map(([moduleKey, module]) => (
                  <ListItemButton
                     className='h-10 rounded-sm'
                     key={module.name}
                     selected={module.name === selectedModuleNames[key]}
                     onClick={() => {
                        setModuleNameByType(key, module.name)

                        switch (key) {
                           case 'shells':
                              const hoveredModule = moduleGroup[key][moduleKey]
                              // const currentModule = moduleGroup[key][selectedModuleNames[key]]
                              const currentModule = moduleGroup[key][defaultShellName]

                              const comparedShells = compareShells(
                                 currentModule as IShells,
                                 hoveredModule as IShells,
                              )
                              console.log(comparedShells)

                              modifiersDispatch({
                                 type: 'SET_SHELLS_MODIFIERS',
                                 payload: comparedShells,
                              })
                              break

                           default:
                              break
                        }
                     }}
                     onMouseEnter={() => {
                        /**
                         * differences:
                         * - Avarage Damage
                         * - Average Penetration (at 500m as well)
                         * - Damage per minute (DPM)
                         * - Shell Velocity
                         * - Potential Damage
                         * - Shell Cost
                         * - Shell cost/ 1000 hp damage
                         */
                     }}
                     // onMouseLeave={() => modifiersDispatch({ type: 'RESET_SHELLS_MODIFIERS', payload: null })}
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

const FIELD_DIRECTIONS: Record<ShellComparableField, DiffDirection> = {
   'piercingPower[0]': 'higher-is-better',
   'piercingPower[1]': 'higher-is-better',
   'damage.armor': 'higher-is-better',
   speed: 'higher-is-better',
   maxDistance: 'higher-is-better',
   price: 'lower-is-better',
}

function extractValue(shell: IShells, field: ShellComparableField): number | null {
   switch (field) {
      case 'piercingPower[0]':
         return shell.piercingPower[0]
      case 'piercingPower[1]':
         return shell.piercingPower[1]
      case 'damage.armor':
         return typeof shell.damage.armor === 'number' ? shell.damage.armor : shell.damage.armor[0]
      case 'speed':
         return shell.speed
      case 'maxDistance':
         return shell.maxDistance
      case 'price':
         return shell.price
      default:
         return null
   }
}

function buildFieldDiff(base: number, compared: number, direction: DiffDirection): IFieldDifferences {
   const difference = compared - base
   const percentDifference: number = base !== 0 ? (difference / base) * 100 : 0 // delta / base * 100
   const improved = direction === 'higher-is-better' ? difference > 0 : difference < 0

   return {
      base,
      compared,
      difference,
      percentDifference,
      improved,
      neutral: difference === 0,
   }
}

function compareShells(base: IShells, compared: IShells): ShellDiffMap {
   const diff: ShellDiffMap = {} as ShellDiffMap

   for (const field of Object.keys(FIELD_DIRECTIONS) as ShellComparableField[]) {
      const baseVal = extractValue(base, field)
      const compVal = extractValue(compared, field)

      // Skip fields where either shell has no data (e.g. explosionRadius on AP)
      if (baseVal === null || compVal === null) continue

      diff[field] = buildFieldDiff(baseVal, compVal, FIELD_DIRECTIONS[field])
   }

   return diff
}
