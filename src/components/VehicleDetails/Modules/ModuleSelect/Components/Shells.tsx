import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import useSetShells from '@/VehicleContext/Hooks/useSetShells'

import ShellModifier from '@/VehicleContext/Modifiers/ShellModifier'

import type { IShells } from '@/types/VehicleDetails/Shells'
import SingleModuleElement from '../Includes/SingleModuleElement'
import ReturnTypography from '../Includes/ModuleType'

import useSetModuleName from '../Hooks/useSetModuleName'

export default function Shells() {
   const {
      vehicleReducer: { selectedModuleNames, moduleGroup },
      modifiersReducer: {
         defaultModuleNames: { shells: defaultShellName },
      },
      vehicleDispatch,
      modifiersDispatch,
   } = useContext(VehicleContext)
   useSetShells()
   const { setModuleName, setModuleNameByType } = useSetModuleName(vehicleDispatch)

   return (
      <>
         <ReturnTypography text='Shells' />
         <section className='w-34 flex flex-row items-center justify-center gap-2'>
            {Object.values(moduleGroup.shells).map((module: IShells) => (
               <SingleModuleElement
                  key={module.name}
                  module={module}
                  moduleName={setModuleName(module.name)}
                  moduleType={'shells'}
                  selected={module.name === selectedModuleNames['shells']}
                  onClickFn={() => {
                     setModuleNameByType('shells', module.name)

                     const hoveredModule = moduleGroup['shells'][module.name]
                     const currentModule = moduleGroup['shells'][defaultShellName]
                     const Shell = new ShellModifier()
                     const comparedShells = Shell.compareShells(currentModule, hoveredModule)

                     modifiersDispatch({
                        type: 'SET_SHELLS_MODIFIERS',
                        payload: comparedShells,
                     })
                  }}
               />
            ))}
         </section>
      </>
   )
}
