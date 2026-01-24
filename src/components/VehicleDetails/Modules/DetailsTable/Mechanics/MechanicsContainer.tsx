'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { useParams } from 'next/navigation'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'

import Mechanics from './Mechanics'
import MECHANIC_NAMES, { MechanicNameKey } from '@/src/helpers/mechanicNames'
import TIER_XI_VEHICLES from '@/src/helpers/tierXITanks'

function returnMechanicName(
   camel: MechanicNameKey | undefined,
   tank_name: (typeof TIER_XI_VEHICLES)[number],
) {
   if (!camel) {
      switch (tank_name) {
         case 'J52_STK_2':
            return MECHANIC_NAMES['heatingZonesGun']
         case 'G187_Taschenratte':
            return MECHANIC_NAMES['supportWeapon']
         case 'F136_AMX_67_Imbattable':
            return MECHANIC_NAMES['extraShotClip']
         case 'F135_AS_XX_40_t':
            return MECHANIC_NAMES['stationaryReload']
         case 'A179_Black_Rock':
            return MECHANIC_NAMES['chargeableBurst']
         default:
            return null
      }
   }

   if (MECHANIC_NAMES[camel]) {
      return MECHANIC_NAMES[camel]
   }
   return null
}

export default function MechanicsContainer() {
   const { tank_name } = useParams<{ tank_name: (typeof TIER_XI_VEHICLES)[number] }>()
   const { mechanics } = useContext(VehicleContext)

   if (!mechanics) return null
   const mechanicName = Object.keys(mechanics).find((name) => name !== 'mechanics') as MechanicNameKey

   const mechanicExtendedName = returnMechanicName(mechanicName, tank_name)
   if (!mechanicExtendedName) return null

   return (
      <Table
         id='mechanics'
         size='small'
         aria-label='Mechanics for Tier XI vehicles like Hirschkäfer, Taschenratte etc..'
      >
         <TableHeadComponent
            headTitle={mechanicExtendedName.name || ''}
            iconSrc={
               mechanicExtendedName
                  ? `/icons/mechanics/x48x48/${mechanicExtendedName.icon === 'reactiveDebuffs' ? 'overheatGun' : mechanicExtendedName.icon}.png`
                  : '/icons/mobility/enginePower.png'
            }
            className='bg-red-800'
         />
         <TableBody>
            <Mechanics mechanics={mechanics} />
         </TableBody>
      </Table>
   )
}
