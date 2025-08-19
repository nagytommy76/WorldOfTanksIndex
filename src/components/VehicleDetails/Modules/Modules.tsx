'use client'
import Image from 'next/image'
import ReturnModuleImg from './Includes/ReturnModuleImg'
import type { IModules, ModuleType } from '@/types/VehicleDetails/module'

import useGroupModules from './Hooks/useGroupModules'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

import ReturnModuleType from './Includes/ModuleType'

export default function Modules({
   modulesTree,
   tank_id,
}: {
   tank_id: string
   modulesTree: { [module_id: number]: IModules }
}) {
   const { moduleTree } = useGroupModules(modulesTree)

   // https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=97f4b2c203d63f5db6fd508661fe5ba
   // 8&tank_id=4113&suspension_id=8466&engine_id=4885&gun_id=2068&turret_id=6675&radio_id=2071

   return (
      <section className={'w-full min-h-[600px] my-20 flex flex-row justify-between gap-5'}>
         <aside>
            <Typography variant='h5'>Modules</Typography>
            {Object.entries(moduleTree).map(([key, modules]) => (
               <List key={key} sx={{ width: '100%', maxWidth: 290 }}>
                  <ReturnModuleType moduleType={key as ModuleType} />
                  {modules.map((module) => (
                     <ListItemButton
                        id={module.module_id.toString()}
                        key={module.module_id}
                        selected={
                           module === moduleTree[module.type][moduleTree[module.type].length - 1] && true
                        }
                     >
                        <ListItemAvatar>
                           <Image
                              src={ReturnModuleImg(module.type)}
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
         <section className='w-full'>
            <h1>Details list</h1>
         </section>
      </section>
   )
}
