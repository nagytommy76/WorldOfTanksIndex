'use client'
import type { IModules } from '@/types/VehicleDetails/module'

import ModuleContextProvider from '@/ModuleContext/ModuleContext'
import DetailsContextProvider from '@/DetailsContext/DetailsContext'

import ModuleSelect from './ModuleSelect/ModuleSelect'
import DetailsTable from './DetailsTable/DetailsTable'

export default function Modules({
   modulesTree,
   tank_id,
}: {
   tank_id: string
   modulesTree: { [module_id: number]: IModules }
}) {
   return (
      <ModuleContextProvider modulesTree={modulesTree} tank_id={tank_id}>
         <DetailsContextProvider>
            <section className={'w-full min-h-[600px] my-20 flex flex-row justify-between gap-5'}>
               <ModuleSelect />
               <DetailsTable />
            </section>
         </DetailsContextProvider>
      </ModuleContextProvider>
   )
}
