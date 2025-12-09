import type { ITankData } from '@/types/VehicleDetails/Vehicle'

import Header from '@/VehicleDetails/Header'
import VehicleContextProvider from '@/VehicleContext/VehicleContext'
import ModuleSelect from '@/VehicleDetails/Modules/ModuleSelect/ModuleSelect'
import DetailsTable from '@/VehicleDetails/Modules/DetailsTable/DetailsTable'

// Big tank image: Vehicle tag: "tag": "G89_Leopard1" -> .toLocaleLowerCase() method needed
// https://eu-wotp.wgcdn.co/dcont/tankopedia_images/g89_leopard1/g89_leopard1_image.png

async function getTankDetails(tank_id: number, tank_name: string) {
   const URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
   const vehicleStats = await fetch(`${URL}/api/${tank_id}/${tank_name}`, { method: 'GET' })
   const response = (await vehicleStats.json()) as Promise<{ vehicleStats: ITankData }>

   return (await response).vehicleStats
}

export default async function page({ params }: { params: Promise<{ tank_id: string; tank_name: string }> }) {
   const { tank_id, tank_name } = await params
   const tankStats = await getTankDetails(Number(tank_id), tank_name)

   return (
      <section className='min-h-screen max-w-screen-2xl mx-auto px-5 my-10'>
         <Header tank_name={tank_name} description={tankStats.tankDetails?.description || ''} />
         <VehicleContextProvider tankDetails={tankStats}>
            <section
               className={'flex w-full min-h-screen flex-col gap-0 xl:flex-row xl:gap-5 xl:justify-between'}
            >
               <ModuleSelect />
               <DetailsTable />
            </section>
         </VehicleContextProvider>
      </section>
   )
}
