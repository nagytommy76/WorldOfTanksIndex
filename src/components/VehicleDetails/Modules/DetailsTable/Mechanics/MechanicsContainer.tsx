'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

import TableHeadComponent from '../Includes/TableHead'

import Mechanics from './Mechanics'

function returnMechanicName(camel: string | undefined) {
   if (!camel) return ''
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

   return (
      <Table size='small' aria-label='Mechanics for Tier XI vehicles like Hirschkäfer, Taschenratte etc..'>
         <TableHeadComponent
            headTitle={returnMechanicName(mechanicName)}
            iconSrc='/icons/mobility/enginePower.png'
            className='bg-orange-600'
         />
         <TableBody>
            <Mechanics mechanics={mechanics} />
         </TableBody>
      </Table>
   )
}
