import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import type { KeyValuePairs } from '../../Types'

import SingleModuleElement from '../Includes/SingleModuleElement'
import ReturnTypography from '../Includes/ModuleType'

import useSetModuleName from '../Hooks/useSetModuleName'
import ModuleTypeTypography from '../Includes/ModuleTypeTypography'

import Typography from '@mui/material/Typography'

export default function Modules() {
   const {
      vehicleReducer: { selectedModuleNames, moduleGroup },
      vehicleDispatch,
   } = useContext(VehicleContext)
   const { setModuleName, setModuleNameByType } = useSetModuleName(vehicleDispatch)

   return (
      <section className='w-[300px] xl:w-[250px] p-2'>
         <ReturnTypography text='Modules' variant='h4' />
         <section className='flex flex-col items-start justify-center gap-2'>
            {(Object.entries(moduleGroup) as KeyValuePairs<typeof moduleGroup>).map(([key, modules]) => (
               <section key={key} className='flex flex-col gap-3 w-full'>
                  {key !== 'shells' && (
                     <>
                        {(key === 'vehicleTurret' &&
                           modules[selectedModuleNames.vehicleTurret].armor[0] === 0) ||
                        modules[selectedModuleNames.vehicleTurret]?.armor?.length === 0 ? null : (
                           <>
                              <Typography variant='h6' fontSize={17} gutterBottom color='textSecondary'>
                                 {ModuleTypeTypography(key)}
                              </Typography>
                              {(Object.entries(modules) as KeyValuePairs<typeof modules>).map(
                                 ([moduleKey, module]) => (
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
                                 ),
                              )}
                           </>
                        )}
                     </>
                  )}
               </section>
            ))}
         </section>
      </section>
   )
}
