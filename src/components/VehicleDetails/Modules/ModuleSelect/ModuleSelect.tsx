'use client'
import Image from 'next/image'
import { useContext } from 'react'
import { TomatoContext } from '@/TomatoContext/TomatoContext'
import type { ModuleType } from '@/types/VehicleDetails/module'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

import ReturnModuleImg from '../Includes/ReturnModuleImg'
import ReturnModuleType from '../Includes/ModuleType'

import useSetDefaultSelectedModuleNames from '../Hooks/useSetDefaultSelectedModuleNames'

export default function ModuleSelect() {
   const {
      tomatoReducer: { selectedModuleNames, moduleGroup },
      tomatoDispatch,
   } = useContext(TomatoContext)

   useSetDefaultSelectedModuleNames()

   function setModuleNameByType(moduleType: ModuleType, moduleName: string) {
      console.log(moduleName, moduleType)
      tomatoDispatch({
         type: 'SET_MODULE_NAME_BY_TYPE',
         payload: { type: moduleType, value: moduleName },
      })
   }

   return (
      <aside>
         <Typography variant='h5'>Modules</Typography>
         {Object.entries(moduleGroup).map(([key, modules]) => (
            <List key={key} sx={{ width: '100%', maxWidth: 290 }}>
               <ReturnModuleType moduleType={key as ModuleType} />
               {Object.values(modules as Record<string, { name: string }>).map((module) => (
                  <ListItemButton
                     key={module.name}
                     selected={module.name === selectedModuleNames[key as ModuleType]}
                     onClick={() => setModuleNameByType(key as ModuleType, module.name)}
                  >
                     <ListItemAvatar>
                        <Image
                           src={ReturnModuleImg(key as ModuleType)}
                           alt={module.name}
                           width={45}
                           height={45}
                        />
                     </ListItemAvatar>
                     <Typography variant='caption'>{module.name}</Typography>
                  </ListItemButton>
               ))}
            </List>
         ))}
      </aside>
   )
}
