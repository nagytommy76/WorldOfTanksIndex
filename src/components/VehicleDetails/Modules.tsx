import React from 'react'
import { IModules } from '@/types/VehicleDetails/module'

function ReturnModuleType({ moduleType }: { moduleType: string }) {
   switch (moduleType) {
      case 'vehicleChassis':
         return <h1>Chassis</h1>
      case 'vehicleEngine':
         return <h1>Engine</h1>
      case 'vehicleGun':
         return <h1>Gun</h1>
      case 'vehicleRadio':
         return <h1>Radio</h1>
      case 'vehicleTurret':
         return <h1>Turret</h1>
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
   const moduleTree: { [moduleType: string]: IModules[] } = {}

   Object.values(modulesTree[Number(tank_id)].modules_tree).map((module) => {
      moduleTree[module.type] ||= []
      moduleTree[module.type].push(module)
   })
   Object.keys(moduleTree).map((key) => {
      moduleTree[key].sort((a, b) => a.price_xp - b.price_xp)
   })
   // console.log(moduleTree)

   return (
      <section className={'w-full min-h-[600px]'}>
         <aside>
            <h1>Modules</h1>
            {Object.entries(moduleTree).map(([key, module]) => (
               <ul key={key}>
                  <ReturnModuleType moduleType={key} />
                  {module.map((module) => (
                     <li key={module.module_id}>{module.name}</li>
                  ))}
               </ul>
            ))}
         </aside>
      </section>
   )
}
