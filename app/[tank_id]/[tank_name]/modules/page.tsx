import type { ITankData } from '@/types/VehicleDetails/Vehicle'
import type { Metadata } from 'next'

import ModuleSelect from '@/VehicleDetails/Modules/ModuleSelect/ModuleSelect'
import DetailsTable from '@/VehicleDetails/Modules/DetailsTable/DetailsTable'
import VehicleContextProvider from '@/VehicleContext/VehicleContext'

type Params = Promise<{ tank_id: string; tank_name: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
   const { tank_name } = await params
   const tankName = tank_name?.split('_').slice(1).join(' ')
   return {
      title: `${tankName} | Details | World of Tanks Index`,
      description: `Vehicle details for ${tankName} with Mastery Badge requirements, Marks of Excellence and Modules.`,
   }
}

// Big tank image: Vehicle tag: "tag": "G89_Leopard1" -> .toLocaleLowerCase() method needed
// https://eu-wotp.wgcdn.co/dcont/tankopedia_images/g89_leopard1/g89_leopard1_image.png

export async function getTankDetails(tank_id: string, tank_name: string) {
   const URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
   const vehicleStats = await fetch(`${URL}/api/${tank_id}/${tank_name}`, { method: 'GET' })
   const response = (await vehicleStats.json()) as Promise<{ vehicleStats: ITankData }>

   return (await response).vehicleStats
}

export default async function page({ params }: { params: Params }) {
   const { tank_id, tank_name } = await params
   const tankStats = await getTankDetails(tank_id, tank_name)
   return (
      <VehicleContextProvider tankDetails={tankStats}>
         <section
            className={`
               flex w-full min-h-screen flex-col gap-0 xl:flex-row xl:gap-5 
               xl:justify-between bg-neutral-900 rounded-lg xl:p-6
               `}
         >
            <ModuleSelect />
            <DetailsTable />
         </section>
      </VehicleContextProvider>
   )
}
