import Image from 'next/image'
import { IModules, ModuleType } from '@/types/VehicleDetails/module'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

import vehicleChassis from '@/ImagesVehicleParts/vehiclechassis.png'
import vehicleEngine from '@/ImagesVehicleParts/vehicleengine.png'
import vehicleGun from '@/ImagesVehicleParts/vehiclegun.png'
import vehicleRadio from '@/ImagesVehicleParts/vehicleradio.png'
import vehicleTurret from '@/ImagesVehicleParts/vehicleturret.png'

function ReturnModuleType({ moduleType }: { moduleType: ModuleType }) {
   switch (moduleType) {
      case 'vehicleChassis':
         return <h1>Chassis</h1>
      case 'vehicleEngine':
         return <h1>Engines</h1>
      case 'vehicleGun':
         return <h1>Guns</h1>
      case 'vehicleRadio':
         return <h1>Radios</h1>
      case 'vehicleTurret':
         return <h1>Turrets</h1>
      default:
         return <h1></h1>
   }
}

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
                              src={(function () {
                                 switch (module.type) {
                                    case 'vehicleChassis':
                                       return vehicleChassis
                                    case 'vehicleEngine':
                                       return vehicleEngine
                                    case 'vehicleGun':
                                       return vehicleGun
                                    case 'vehicleRadio':
                                       return vehicleRadio
                                    case 'vehicleTurret':
                                       return vehicleTurret
                                    default:
                                       return '' // Return a default image source
                                 }
                              })()}
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
