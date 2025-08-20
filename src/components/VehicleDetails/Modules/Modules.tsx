'use client'
import type { IModules } from '@/types/VehicleDetails/module'

import ModuleContextProvider from '../Context/ModuleContext'

import ModuleSelect from './ModuleSelect/ModuleSelect'
import DetailsTable from './DetailsTable/DetailsTable'

export default function Modules({
   modulesTree,
   tank_id,
}: {
   tank_id: string
   modulesTree: { [module_id: number]: IModules }
}) {
   // const { moduleTree } = useGroupModules(modulesTree)

   // https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=97f4b2c203d63f5db6fd508661fe5ba
   // 8&tank_id=4113&suspension_id=8466&engine_id=4885&gun_id=2068&turret_id=6675&radio_id=2071

   return (
      <ModuleContextProvider modulesTree={modulesTree} tank_id={tank_id}>
         <section className={'w-full min-h-[600px] my-20 flex flex-row justify-between gap-5'}>
            <ModuleSelect />
            <DetailsTable />
         </section>
      </ModuleContextProvider>
   )
}
