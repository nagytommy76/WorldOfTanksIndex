'use client'
import TomatoContextProvider from '@/TomatoContext/TomatoContext'

import ModuleSelect from './ModuleSelect/ModuleSelect'
import DetailsTable from './DetailsTable/DetailsTable'

export default function Modules({ tank_id, tank_short_name }: { tank_id: string; tank_short_name: string }) {
   return (
      <TomatoContextProvider tank_short_name={tank_short_name} tank_id={tank_id}>
         <section className={'w-full min-h-[600px] my-20 flex flex-row justify-between gap-5'}>
            <ModuleSelect />
            <DetailsTable />
         </section>
      </TomatoContextProvider>
   )
}
