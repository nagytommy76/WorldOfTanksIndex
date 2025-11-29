'use client'
import { Suspense } from 'react'
import VehicleContextProvider from '@/VehicleContext/VehicleContext'

import ModuleSelect from './ModuleSelect/ModuleSelect'
import DetailsTable from './DetailsTable/DetailsTable'

export default function Modules({ tank_id, tank_short_name }: { tank_id: string; tank_short_name: string }) {
   return (
      <Suspense fallback={<div>Loading tank stats… Later a suspense component goes here</div>}>
         <VehicleContextProvider tank_short_name={tank_short_name} tank_id={tank_id}>
            <section
               className={'flex w-full min-h-screen flex-col gap-0 xl:flex-row xl:gap-5 xl:justify-between'}
            >
               <ModuleSelect />
               <DetailsTable />
            </section>
         </VehicleContextProvider>
      </Suspense>
   )
}
