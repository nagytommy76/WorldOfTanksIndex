import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableHeadComponent from '../Includes/TableHead'
import TableRowComponent from '../Includes/TableRow'

export default function Firepower() {
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleChassis, vehicleGun, shells },
      },
   } = useContext(VehicleContext)

   return (
      <Table size='small' aria-label='Firepower table with average damage and penetration'>
         <TableHeadComponent headTitle='Firepower' />
         <TableBody>
            <TableRowComponent
               titleText='Average Damage'
               valueText={shells[selectedModuleNames.shells]?.damage.armor}
               unit='HP'
            />
            <TableRowComponent
               titleText='Average Penetration (at 50 m)'
               valueText={shells[selectedModuleNames.shells]?.piercingPower[0]}
               unit='mm'
            />
            <TableRowComponent
               titleText='Average Penetration (at 500 m)'
               valueText={shells[selectedModuleNames.shells]?.piercingPower[1]}
               unit='mm'
            />
            <TableRowComponent
               titleText='Rate of Fire'
               valueText={(60 / vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime).toFixed(2)}
               unit='rounds/min'
            />
            <TableRowComponent
               titleText='Average Damage per Minute'
               valueText={(
                  (60 / vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime) *
                  shells[selectedModuleNames.shells]?.damage.armor
               ).toFixed(0)}
               unit='HP/min'
            />
            <TableRowComponent
               titleText='Gun Loading'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.reloadTime}
               unit='s'
            />
            <TableRowComponent
               titleText='Aiming Time'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.aimTime.toFixed(2)}
               unit='s'
            />
            <TableRow className='bg-gray-700'>
               <TableCell>
                  <Typography variant='body1'>Gun Dispersions</Typography>
               </TableCell>
               <TableCell></TableCell>
            </TableRow>
            <TableRowComponent
               titleText='Accuracy At 100 m'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.accuracy}
               unit='m'
               paddingLeft
            />
            <TableRowComponent
               titleText='Moving'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.dispersion.vehicleMovement}
               unit='m'
               paddingLeft
            />
            <TableRowComponent
               titleText='Tank traverse'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.dispersion.vehicleRotation}
               unit='m'
               paddingLeft
            />
            <TableRowComponent
               titleText='Turret traverse'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.dispersion.turretRotation}
               unit='m'
               paddingLeft
            />
            <TableRowComponent
               titleText='After firing'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.dispersion.afterShot}
               unit='m'
               paddingLeft
            />
            <TableRowComponent
               titleText='While damaged'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.dispersion.whileDamaged}
               unit='m'
               paddingLeft
            />
            <TableRowComponent
               titleText='Gun depression'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.depression}
               unit='°'
            />
            <TableRowComponent
               titleText='Gun elevation'
               valueText={vehicleGun[selectedModuleNames.vehicleGun]?.elevation}
               unit='°'
            />
            <TableRowComponent
               titleText='Module damage'
               valueText={shells[selectedModuleNames.shells]?.damage.devices}
               unit='hp'
            />
            <TableRowComponent
               titleText='Shell velocity'
               valueText={shells[selectedModuleNames.shells]?.speed}
               unit='m/s'
            />
            <TableRowComponent
               titleText='Range'
               valueText={shells[selectedModuleNames.shells]?.maxDistance}
               unit='m'
            />
            <TableRowComponent
               titleText='Shell cost'
               valueText={shells[selectedModuleNames.shells]?.price}
               unit='credits'
            />
         </TableBody>
      </Table>
   )
}
