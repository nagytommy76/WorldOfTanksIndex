'use client'
import Image from 'next/image'
import type { VehicleRoles } from '@Types/types'

import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip placement='right-end' {...props} classes={{ popper: className }} />
))(({}) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: '700px',
      backgroundColor: '#1d1d1d',
      borderRadius: '4px',
      padding: '0',
      margin: '0',
   },
}))

const roles: Record<VehicleRoles, { name: string; description: string }> = {
   role_ATSPG_assault: {
      name: 'Assault Tank Destroyer',
      description:
         'Vehicles with low mobility, but reliable frontal armor. Requires more aggresive gameplay.',
   },
   role_ATSPG_sniper: {
      name: 'Sniper Tank Destroyer',
      description: 'Vehicles with weak armor, but decnt guns and good mobility. Requires passive gameplay.',
   },
   role_ATSPG_support: {
      name: 'Support Tank Destroyer',
      description:
         'Vehicles with perfect guns, the effective use of which requires compliance with certain conditions.',
   },
   role_ATSPG_universal: {
      name: 'Versatile Tank Destroyer',
      description:
         'Tank destroyers with avarage vehicle characteristics that are eqaually effective at any distance.',
   },
   role_HT_assault: {
      name: 'Assault Heavy Tank',
      description:
         'Heavily armored vehicles that can effectively trade their hit points and halt the enemy advance.',
   },
   role_HT_break: {
      name: 'Breakthrough Heavy Tank',
      description:
         'Vehicles with good mobility and reliable armor that make them effective both on the first line attack in positional close-rankge combat and during flanking maneuvers.',
   },
   role_HT_support: {
      name: 'Support Heavy Tank',
      description:
         'Vehicles with perfect guns. They can cause a great deal of damage in a short period of time.',
   },
   role_HT_universal: {
      name: 'Versatile Heavy Tank',
      description: 'Multipurpose tanks that can easily adapt to any combat situation.',
   },
   role_LT_universal: {
      name: 'Versatile Light Tank',
      description:
         'Fast and maneuverable tanks that can both scout and cause damage when performing flanking maneuvers.',
   },
   role_LT_wheeled: {
      name: 'Wheeled Light Tank',
      description: 'Vehicles with outstanding dynamic characteristics, but weak spot capabilities.',
   },
   role_MT_assault: {
      name: 'Assault Medium Tank',
      description:
         'Vehicles with decent armor that makes them best suited for close combat and standing their ground against enemy heavy tanks.',
   },
   role_MT_sniper: {
      name: 'Sniper Medium Tank',
      description: 'Vehicles with excellent guns and weak armor. Long range combat is their specialty.',
   },
   role_MT_support: {
      name: 'Support Medium Tank',
      description: 'Vehicles with perfect guns. They can cause a great deal of damage within a short time.',
   },
   role_MT_universal: {
      name: 'Versatile Medium Tank',
      description: 'Well-balanced vehicles that can adapt to any combat situation.',
   },
   role_SPG: {
      name: 'SPG',
      description:
         'A long-range supporter for allied attacks. They can make your day beautiful if they hit you...',
   },
}

export default function VehicleRoles({ vehicleRole }: { vehicleRole: VehicleRoles }) {
   return (
      <HtmlTooltip
         title={
            <section className='w-[500px]'>
               <Image
                  src={`/roles/tooltip/${vehicleRole}.png`}
                  className='object-cover w-full'
                  width={500}
                  height={100}
                  alt={vehicleRole || 'Role tooltip'}
               />
               <div className='p-3'>
                  <div className='flex flex-row items-center mb-2 gap-1'>
                     <Image
                        src={`/roles/icons/${vehicleRole}.png`}
                        width={60}
                        height={60}
                        alt={vehicleRole || 'Role icon'}
                     />
                     <Typography variant='h5'>{roles[vehicleRole].name}</Typography>
                  </div>
                  <Typography variant='body2'>{roles[vehicleRole].description}</Typography>
               </div>
            </section>
         }
      >
         <Image
            className='cursor-pointer'
            src={`/roles/icons/${vehicleRole}.png`}
            width={70}
            height={70}
            alt={vehicleRole || 'Role icon'}
         />
      </HtmlTooltip>
   )
}
