import useDispersion from './Hooks/useDispersion'

import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from '../../Includes/TableRow'

export default function GunDispersions() {
   const {
      accuracy,
      vehicleMovement,
      vehicleRotation,
      turretRotation,
      afterShot,
      accuracyBase,
      vehicleMovementBase,
      vehicleRotationBase,
      turretRotationBase,
      afterShotBase,
      accuracyWhileDamagedBase,
   } = useDispersion()

   return (
      <>
         <TableRow className='bg-gray-700 h-[20px]'>
            <TableCell>
               <Typography variant='body1'>Gun Dispersions</Typography>
            </TableCell>
            <TableCell></TableCell>
         </TableRow>
         <TableRowComponent
            iconSrc='/icons/firepower/shotDispersionAngle.png'
            titleText='Accuracy At 100 m'
            valueText={accuracy}
            unit='m'
            paddingLeft
            modifiers={[
               {
                  difference: parseFloat((accuracy - accuracyBase).toFixed(4)),
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionChassisMovement.png'
            titleText='Moving'
            valueText={vehicleMovement}
            unit='m'
            paddingLeft
            modifiers={[
               {
                  difference: parseFloat((vehicleMovement - vehicleMovementBase).toFixed(4)),
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionChassisRotation.png'
            titleText='Tank traverse'
            valueText={vehicleRotation}
            unit='m'
            paddingLeft
            modifiers={[
               {
                  difference: parseFloat((vehicleRotation - vehicleRotationBase).toFixed(4)),
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionTurretRotation.png'
            titleText='Turret traverse'
            valueText={turretRotation}
            unit='m'
            paddingLeft
            modifiers={[
               {
                  difference: parseFloat((turretRotation - turretRotationBase).toFixed(4)),
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionAfterShot.png'
            titleText='After firing'
            valueText={afterShot}
            unit=''
            paddingLeft
            modifiers={[
               {
                  difference: parseFloat((afterShot - afterShotBase).toFixed(4)),
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/firepower/vehicleGunShotDispersionWhileGunDamaged.png'
            titleText='While damaged'
            valueText={accuracyWhileDamagedBase}
            unit='m'
            paddingLeft
         />
      </>
   )
}
