'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'

import Mechanics from './Mechanics'
import MECHANIC_NAMES from '@/src/helpers/mechanicNames'

function returnMechanicName(camel: string | undefined) {
   if (!camel) return null

   if (MECHANIC_NAMES[camel]) {
      return MECHANIC_NAMES[camel]
   }

   const camelCase = camel.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')

   let flat = ''

   camelCase.forEach((word) => {
      flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + ' '
   })
   return flat
}

export default function MechanicsContainer() {
   const { mechanics } = useContext(VehicleContext)
   if (!mechanics) return null
   const mechanicName = Object.keys(mechanics).find((name) => name !== 'mechanics')
   if (!mechanicName) return null

   const mechanicExtendedName = returnMechanicName(mechanicName)

   return (
      <Table
         id='mechanics'
         size='small'
         aria-label='Mechanics for Tier XI vehicles like Hirschkäfer, Taschenratte etc..'
      >
         <TableHeadComponent
            headTitle={mechanicExtendedName || ''}
            iconSrc={
               mechanicExtendedName
                  ? `/icons/mechanics/x48x48/${mechanicName === 'reactiveDebuffs' ? 'overheatGun' : mechanicName}.png`
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
