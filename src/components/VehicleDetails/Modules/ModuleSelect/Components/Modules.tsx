import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import type { KeyValuePairs } from '../../Types'

import SingleModuleElement from '../Includes/SingleModuleElement'
import ReturnTypography from '../Includes/ModuleType'

import useSetModuleName from '../Hooks/useSetModuleName'

export default function Modules() {
   const {
      vehicleReducer: { selectedModuleNames, moduleGroup },
      vehicleDispatch,
   } = useContext(VehicleContext)
   const { setModuleName, setModuleNameByType } = useSetModuleName(vehicleDispatch)

   return (
      <>
         <ReturnTypography text='Modules' />
         <section className='flex flex-row items-start justify-center gap-2'>
            {(Object.entries(moduleGroup) as KeyValuePairs<typeof moduleGroup>).map(([key, modules]) => (
               <section key={key} className='flex flex-col gap-3'>
                  {key !== 'shells' &&
                     (Object.entries(modules) as KeyValuePairs<typeof modules>).map(([moduleKey, module]) => (
                        <SingleModuleElement
                           key={moduleKey}
                           module={module}
                           moduleName={setModuleName(module.name)}
                           moduleType={key}
                           selected={module.name === selectedModuleNames[key]}
                           onClickFn={() => {
                              setModuleNameByType(key, module.name)
                           }}
                        />
                     ))}
               </section>
            ))}
         </section>
      </>
   )
}
