'use client'
import { useMemo } from 'react'

import type { TechTreeVehiclesType } from '@/types/VehicleDetails/Vehicle'

import Image from 'next/image'
import Link from 'next/link'

import EnhancedTableHead from './Includes/EnhancedTableHead'
import PriceCell from './Includes/PriceCell'

import useOrder from './Hooks/useOrder'
import useComparator from './Hooks/useComparator'

import tiers from '@/lib/tierList'
import getIcon from '@/lib/getVehicleTypeIcon'
import { flagSources } from '@/Base/FlagLinks/FlagLinks'
import retrunVehicleType from '@/src/helpers/returnVehicleType'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

export default function EnhancedTable({ allVehicles }: { allVehicles: TechTreeVehiclesType[] }) {
   const { handleRequestSort, order, orderBy } = useOrder()
   const { getComparator } = useComparator()

   const techTreeVehicles = useMemo(
      () =>
         [...allVehicles].sort(
            getComparator<TechTreeVehiclesType>(order, orderBy as keyof TechTreeVehiclesType)
         ),
      [order, orderBy, allVehicles, getComparator]
   )

   return (
      <section className='w-4xl mx-auto my-11'>
         <Table
            className='min-w-[850px] p-1'
            aria-labelledby='Vehicles table'
            component={'table'}
            size={'medium'}
         >
            <EnhancedTableHead
               order={order}
               orderBy={orderBy}
               onRequestSort={handleRequestSort}
               rowCount={allVehicles.length}
            />
            <TableBody>
               {techTreeVehicles.map((vehicle) => {
                  return (
                     <TableRow hover tabIndex={-1} key={vehicle.id} className='p-0'>
                        <TableCell padding='none'>
                           <Image
                              src={flagSources[vehicle.nation].source}
                              alt={flagSources[vehicle.nation].alt}
                              width={70}
                              height={70}
                              className='object-cover w-[45px]'
                           />
                        </TableCell>
                        <TableCell padding='none' align='center'>
                           <Tooltip title={retrunVehicleType(vehicle.type)} placement='top' arrow>
                              <Image src={getIcon(vehicle.type)} alt={vehicle.name} width={15} height={15} />
                           </Tooltip>
                        </TableCell>
                        <TableCell padding='none' align='left'>
                           <Typography>{tiers[Number(vehicle.tier - 1)]}</Typography>
                        </TableCell>
                        <TableCell padding='none' align='right'>
                           <div className={'flex flex-row items-center '}>
                              <Image
                                 src={vehicle.tankDetails?.images.big_icon || ''}
                                 width={112}
                                 height={112}
                                 alt={vehicle.name}
                                 className='object-cover -translate-x-6'
                              />
                              <Typography variant='subtitle1'>{vehicle.tankDetails?.name}</Typography>
                           </div>
                        </TableCell>
                        <PriceCell vehiclePrice={vehicle.price} />
                        <TableCell align='right'>
                           <Link
                              id={vehicle.id?.toString()}
                              href={`/${vehicle.id}/${vehicle.xmlId}/modules`}
                              key={vehicle.id}
                           >
                              <Button variant='contained'>More details</Button>
                           </Link>
                        </TableCell>
                     </TableRow>
                  )
               })}
            </TableBody>
         </Table>
      </section>
   )
}
