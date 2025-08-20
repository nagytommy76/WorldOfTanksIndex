'use client'
import Image from 'next/image'
import { useContext } from 'react'
import { ModuleContext } from '@/ModuleContext/ModuleContext'
import type { ModuleType } from '@/types/VehicleDetails/module'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

import ReturnModuleImg from '../Includes/ReturnModuleImg'
import ReturnModuleType from '../Includes/ModuleType'

export default function ModuleSelect() {
   const {
      modulesReducer: { moduleGroup, selectedModuleIds },
      modulesDispatch,
   } = useContext(ModuleContext)

   function setModuleIDByType(moduleType: ModuleType, moduleId: number) {
      modulesDispatch({
         type: 'SET_MODULE_ID_BY_TYPE',
         payload: { type: moduleType, value: moduleId },
      })
   }

   return (
      <aside>
         <Typography variant='h5'>Modules</Typography>
         {Object.entries(moduleGroup).map(([key, modules]) => (
            <List key={key} sx={{ width: '100%', maxWidth: 290 }}>
               <ReturnModuleType moduleType={key as ModuleType} />
               {modules.map((module) => (
                  <ListItemButton
                     id={module.module_id.toString()}
                     key={module.module_id}
                     selected={module.module_id === selectedModuleIds[key as ModuleType]}
                     onClick={() => setModuleIDByType(key as ModuleType, module.module_id)}
                  >
                     <ListItemAvatar>
                        <Image src={ReturnModuleImg(module.type)} alt={module.name} width={45} height={45} />
                     </ListItemAvatar>
                     <Typography variant='caption'>{module.name}</Typography>
                  </ListItemButton>
               ))}
            </List>
         ))}
      </aside>
   )
}
