import { useContext } from 'react'
import { DetailsContext } from '@/DetailsContext/DetailsContext'

import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from './TableRow'

export default function Firepower() {
   const {
      vehicleProfileReducer: { vehicleProfile },
   } = useContext(DetailsContext)
   if (!vehicleProfile) return null

   console.log(vehicleProfile)

   return (
      <Table size='small' aria-label='Firepower table with average damage and penetration'>
         <TableHead>
            <TableRow className='bg-lime-900'>
               <TableCell>
                  <Typography variant='h5'>Firepower</Typography>
               </TableCell>
               <TableCell align='right'>icon</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
            <TableRowComponent
               titleText='Average Damage'
               valueText={vehicleProfile.ammo[0]?.damage[0]}
               unit='HP'
            />
            <TableRowComponent
               titleText='Average Penetration'
               valueText={vehicleProfile.ammo[0]?.penetration[1]}
               unit='HP'
            />
            <TableRowComponent
               titleText='Rate of Fire'
               valueText={(60 / vehicleProfile.gun.reload_time).toFixed(2)}
               unit='rounds/min'
            />
            <TableRowComponent
               titleText='Average Damage per Minute'
               valueText={((60 / vehicleProfile.gun.reload_time) * vehicleProfile.ammo[0]?.damage[1]).toFixed(
                  0
               )}
               unit='HP/min'
            />
            <TableRowComponent
               titleText='Gun Loading'
               valueText={vehicleProfile.gun.reload_time.toFixed(2)}
               unit='s'
            />
            <TableRowComponent
               titleText='Aiming Time'
               valueText={vehicleProfile.gun.aim_time.toFixed(2)}
               unit='s'
            />
            <TableRow>
               <TableCell>
                  <Typography variant='h6'>Gun Dispersions</Typography>
               </TableCell>
               <TableCell></TableCell>
            </TableRow>
            <TableRowComponent
               titleText='At 100 m'
               valueText={vehicleProfile.gun.dispersion.toFixed(2)}
               unit='m'
            />
            <TableRowComponent
               titleText='At 100 m'
               valueText={vehicleProfile.gun.caliber.toFixed(2)}
               unit='m'
            />
         </TableBody>
      </Table>
   )
}
