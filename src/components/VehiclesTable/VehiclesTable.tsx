'use client'
import { useMemo, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import type { TechTreeVehiclesType } from '@/types/VehicleDetails/Vehicle'

import Image from 'next/image'
import Link from 'next/link'
import Button from '@mui/material/Button'

import tiers from '@/lib/tierList'
import getIcon from '@/lib/getVehicleTypeIcon'
import { flagSources } from '@/Base/FlagLinks/FlagLinks'

import EnhancedTableHead from './Includes/EnhancedTableHead'
import type { Data, Order } from './Types'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
   if (b[orderBy] < a[orderBy]) {
      return -1
   }
   if (b[orderBy] > a[orderBy]) {
      return 1
   }
   return 0
}

function getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
}

export default function EnhancedTable({
   allTechTreeVehicles,
}: {
   allTechTreeVehicles: TechTreeVehiclesType[]
}) {
   const [order, setOrder] = useState<Order>('desc')
   const [orderBy, setOrderBy] = useState<keyof Data>('tier')

   const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
   }

   const techTreeVehicles = useMemo(
      () =>
         [...allTechTreeVehicles].sort(
            getComparator<TechTreeVehiclesType>(order, orderBy as keyof TechTreeVehiclesType)
         ),
      [order, orderBy, allTechTreeVehicles]
   )

   return (
      <Paper className='w-3xl mx-auto my-11'>
         <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
               <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={allTechTreeVehicles.length}
               />
               <TableBody>
                  {techTreeVehicles.map((vehicle) => {
                     return (
                        <TableRow hover tabIndex={-1} key={vehicle.id} className='p-0'>
                           <TableCell padding='none' className='w-[15px]'>
                              <Image
                                 src={flagSources[vehicle.nation].source}
                                 alt={flagSources[vehicle.nation].alt}
                                 width={90}
                                 height={90}
                                 className='object-cover w-[45px]'
                              />
                           </TableCell>
                           <TableCell padding='none' align='right' className='w-[15px]'>
                              <Image src={getIcon(vehicle.type)} alt={vehicle.name} width={15} height={15} />
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
                                    className='object-cover -translate-x-6 '
                                 />
                                 <Typography variant='subtitle1'>{vehicle.tankDetails?.name}</Typography>
                              </div>
                           </TableCell>
                           <TableCell padding='none' align='left'>
                              <Typography variant='subtitle2'>{vehicle.price.toLocaleString()}</Typography>
                           </TableCell>
                           <TableCell align='right'>
                              <Link
                                 id={vehicle.id?.toString()}
                                 href={`/${vehicle.id}/${vehicle.xmlId}`}
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
         </TableContainer>
      </Paper>
   )
}
