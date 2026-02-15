'use client'
import useFilteredVehicles from './Hooks/useFilteredVehicles'
import type { CardTanksType } from '@/types/VehicleDetails/Vehicle'

import TankCard from '@/Base/TankCard/TankCard'
import ToggleVehicleType from './Includes/ToggleVehicleType'
import ToggleTier from './Includes/ToogleTier'
import VehicleNameField from './Includes/VehicleNameField'
import ClearFiltersBtn from './Includes/ClearFiltersBtn'

export default function EnhancedTable({ allVehicles }: { allVehicles: CardTanksType[] }) {
   const filteredVehicles = useFilteredVehicles(allVehicles)

   const allVehicleNames = filteredVehicles.map((vehicle) => vehicle.tankDetails?.short_name || vehicle.name)

   return (
      <section className='max-w-[1200px] mx-auto'>
         <section
            className='
         w-full min-h-[50px] gap-2 bg-neutral-950 mt-10 flex flex-col md:flex-row items-center justify-center px-3 py-2 rounded-lg'
         >
            <ToggleVehicleType />
            <ToggleTier />
            <VehicleNameField allVehicleNames={allVehicleNames} />
            <ClearFiltersBtn />
         </section>
         <section className='mx-3 xl:mx-0 grid justify-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 my-10'>
            {filteredVehicles.map((vehicle) => (
               <TankCard key={vehicle.id || vehicle.xmlId} singleVehicle={vehicle} />
            ))}
         </section>
      </section>
   )
}
