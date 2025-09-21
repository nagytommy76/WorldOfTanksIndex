'use client'
import { useContext } from 'react'
import { TomatoContext } from '@/TomatoContext/TomatoContext'
import useSetShells from '../../Context/TomatoContext/Hooks/useSetShells'

import type { AmmoType, ModuleType } from '@/types/VehicleDetails/module'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'

import ReturnModuleType from '../Includes/ModuleType'
import ModuleImage from '../Includes/ModuleImage'

export default function ModuleSelect() {
   const {
      tomatoReducer: { selectedModuleNames, moduleGroup },
      tomatoDispatch,
   } = useContext(TomatoContext)
   useSetShells()

   function setModuleNameByType(moduleType: ModuleType, moduleName: string) {
      tomatoDispatch({
         type: 'SET_MODULE_NAME_BY_TYPE',
         payload: { type: moduleType, value: moduleName },
      })
   }

   return (
      <aside className={'w-full flex flex-col items-center my-5 xl:w-[300px]'}>
         <Typography variant='h5'>Modules</Typography>
         {Object.entries(moduleGroup).map(([key, modules]) => (
            <List key={key} sx={{ width: '100%', maxWidth: 290 }}>
               <ReturnModuleType moduleType={key as ModuleType} />
               {Object.values(modules as Record<string, { name: string; image?: AmmoType }>).map((module) => (
                  <ListItemButton
                     key={module.name}
                     selected={module.name === selectedModuleNames[key as ModuleType]}
                     onClick={() => setModuleNameByType(key as ModuleType, module.name)}
                  >
                     <ModuleImage
                        moduleName={module.name}
                        moduleType={key as ModuleType}
                        shellImage={module.image}
                     />
                     <Typography variant='caption'>{module.name}</Typography>
                  </ListItemButton>
               ))}
            </List>
         ))}
      </aside>
   )
}
