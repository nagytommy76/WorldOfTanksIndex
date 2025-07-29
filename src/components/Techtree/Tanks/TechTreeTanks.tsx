import Image from 'next/image'
import Link from 'next/link'
import TankCard from '@/Base/TankCard/TankCard'

import getIcon from '@/lib/getVehicleTypeIcon'
import { flagSources } from '@/Base/FlagLinks/FlagLinks'

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
         <Table aria-label='simple table' size='small'>
            <TableHead>
               <TableRow>
                  <TableCell>Nation</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Vehicle name</TableCell>
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
                           <Link
                              href={`/${techTreeVehicle.tank_id}/${techTreeVehicle.name}`}
                              key={techTreeVehicle.tank_id}
                           >
                              <TableCell>
                                 <Image
                                    src={flagSources[techTreeVehicle.nation].source}
                                    alt={flagSources[techTreeVehicle.nation].alt}
                                    width={30}
                                    height={30}
                                 />
                              </TableCell>
                              <TableCell>
                                 <Image src={getIcon(techTreeVehicle.type)} alt={techTreeVehicle.name} />
                              </TableCell>
                              <TableCell className={'flex flex-row items-center'}>
                                 <Image
                                    src={techTreeVehicle.images.contour_icon}
                                    width={65}
                                    height={65}
                                    alt={techTreeVehicle.name}
                                 />
                                 <Typography>{techTreeVehicle.name}</Typography>
                              </TableCell>
                           </Link>
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
