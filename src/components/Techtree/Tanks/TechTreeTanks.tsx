import Image from 'next/image'
import TankCard from '@/Base/TankCard/TankCard'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import type { ITechTreeVehicleType } from '@/types/techTreeTypes'

export default function TechTreeTanks({
   groupedTechTreeByTier,
}: {
   groupedTechTreeByTier: {
      [tier: number]: ITechTreeVehicleType[]
   }
}) {
   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 450 }} aria-label='simple table' size='small'>
            <TableHead>
               <TableRow>
                  <TableCell>Vehicle name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>nation</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {Object.keys(groupedTechTreeByTier).map((key) => (
                  <>
                     {groupedTechTreeByTier[Number(key)].map((techTreeVehicle) => (
                        <TableRow
                           key={techTreeVehicle.tank_id}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                           <TableCell>
                              <div className={'felx flex-col justify-center'}>
                                 <Typography>{techTreeVehicle.name}</Typography>
                                 <Image
                                    src={techTreeVehicle.images.contour_icon}
                                    width={65}
                                    height={65}
                                    alt={techTreeVehicle.name}
                                 />
                              </div>
                           </TableCell>
                           <TableCell>{techTreeVehicle.type}</TableCell>
                           <TableCell>{techTreeVehicle.nation}</TableCell>
                        </TableRow>
                     ))}
                  </>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
   return (
      <section className={'grid grid-cols-3 grid-rows-4 gap-1'}>
         {/* <div> */}
         {Object.keys(groupedTechTreeByTier).map((key) => (
            <Paper key={key} className='my-4 w-125 h-125 grid col-span-2'>
               {groupedTechTreeByTier[Number(key)].map((techTreeVehicle) => (
                  <TankCard key={techTreeVehicle.tank_id} vehicle={techTreeVehicle} />
               ))}
            </Paper>
         ))}
         {/* </div> */}
      </section>
   )
}
