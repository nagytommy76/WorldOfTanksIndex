import Image from 'next/image'
import ReturnModuleImg from './Includes/ReturnModuleImg'
import type { IModules, ModuleType } from '@/types/VehicleDetails/module'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

import ReturnModuleType from './Includes/ModuleType'

export default async function Modules({
   modulesTree,
   tank_id,
}: {
   tank_id: string
   modulesTree: {
      [tank_id: number]: {
         description: string
         modules_tree: {
            [module_id: number]: IModules
         }
      }
   }
}) {
   const moduleTree: { [moduleType in ModuleType]: IModules[] } = {
      vehicleChassis: [],
      vehicleEngine: [],
      vehicleGun: [],
      vehicleRadio: [],
      vehicleTurret: [],
   }

   Object.values(modulesTree[Number(tank_id)].modules_tree).map((module) => {
      moduleTree[module.type] ||= []
      moduleTree[module.type].push(module)
   })
   Object.keys(moduleTree).map((key: string) => {
      const moduleType = key as ModuleType
      moduleTree[moduleType].sort((a, b) => a.price_xp - b.price_xp)
   })

   // https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=97f4b2c203d63f5db6fd508661fe5ba
   // 8&tank_id=4113&suspension_id=8466&engine_id=4885&gun_id=2068&turret_id=6675&radio_id=2071

   // console.log(moduleTree)

   return (
      <section className={'w-full min-h-[600px] my-20'}>
         <aside>
            <Typography variant='h5'>Modules</Typography>
            {Object.entries(moduleTree).map(([key, module]) => (
               <List key={key} sx={{ width: '100%', maxWidth: 290 }}>
                  <ReturnModuleType moduleType={key as ModuleType} />
                  {module.map((module) => (
                     <ListItemButton id={module.module_id.toString()} key={module.module_id}>
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
      </section>
   )
}
