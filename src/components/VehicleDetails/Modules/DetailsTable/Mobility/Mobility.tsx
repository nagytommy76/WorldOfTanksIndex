'use client'
import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import useSetTotalWeight from '../../../Hooks/useSetTotalWeight'

import { calculateEffectiveTopSpeed, calculateEffectiveTraverseSpeed } from '../../Helpers/calculate'

import TableHeadComponent from '../Includes/TableHead'

import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from '../Includes/TableRow'

import SiegeMode from './Includes/SiegeMode'
import WheelAngle from './Includes/WheelAngle'
import RocketAcceleration from './Includes/RocketAcceleration'

export default function Mobility() {
   const totalWeight = useSetTotalWeight()
   const {
      speedLimit,
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleChassis, vehicleTurret, vehicleGun, vehicleEngine },
         siegeMode,
      },
   } = useContext(VehicleContext)

   const gunDepression = -vehicleGun[selectedModuleNames.vehicleGun]?.elevationLimits.depression[1] || 0
   const gunElevation = -vehicleGun[selectedModuleNames.vehicleGun]?.elevationLimits.elevation[1] || 0

   return (
      <Table size='small' aria-label='Mobility table with speed'>
         <TableHeadComponent
            headTitle='Mobility'
            className='bg-cyan-950'
            iconSrc='/icons/details/mobility.png'
         />
         <TableBody>
            <TableRowComponent
               iconSrc='/icons/mobility/speedLimits.png'
               titleText='Forward Speed'
               valueText={speedLimit?.forward}
               unit='km/h'
            />
            <TableRowComponent
               iconSrc='/icons/mobility/speedLimits.png'
               titleText='Backward Speed'
               valueText={speedLimit?.backward}
               unit='km/h'
            />
            {vehicleChassis[selectedModuleNames.vehicleChassis]?.wheelAngle && (
               <WheelAngle
                  wheelAngle={vehicleChassis[selectedModuleNames.vehicleChassis]?.wheelAngle as number[]}
               />
            )}
            <TableRowComponent
               iconSrc='/icons/mobility/chassisRotationSpeed.png'
               titleText='Traverse Speed'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed}
               unit='deg/s'
            />
            <TableRowComponent
               iconSrc='/icons/mobility/turretRotationSpeed.png'
               titleText='Gun Traverse Speed'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.traverse}
               unit='deg/s'
            />
            <TableRowComponent
               iconSrc='/icons/firepower/pitchLimits.png'
               titleText='Gun Depression / Elevation'
               valueText={gunDepression + ' / ' + gunElevation}
               unit='°'
            />
            {vehicleGun[selectedModuleNames.vehicleGun]?.arc.length > 0 && (
               <TableRowComponent
                  iconSrc='/icons/mobility/gunYawLimits.png'
                  titleText='Gun Traverse Limits'
                  valueText={`
                     ${vehicleGun[selectedModuleNames.vehicleGun]?.arc[0]} /
                     ${vehicleGun[selectedModuleNames.vehicleGun]?.arc[1]}
                  `}
                  unit='deg'
               />
            )}
            {siegeMode && <SiegeMode siegeMode={siegeMode} />}
            <RocketAcceleration />
            <TableRowComponent
               iconSrc='/icons/mobility/vehicleWeight.png'
               titleText='Weight'
               valueText={(totalWeight / 1000).toFixed(2)}
               unit='tn'
            />
            <TableRowComponent
               iconSrc='/icons/mobility/enginePower.png'
               titleText='Engine power'
               valueText={vehicleEngine[selectedModuleNames.vehicleEngine]?.power}
               unit='hp'
            />
            <TableRowComponent
               iconSrc='/icons/mobility/enginePowerPerTon.png'
               titleText='Specific Power'
               valueText={(
                  (vehicleEngine[selectedModuleNames.vehicleEngine]?.power / totalWeight) *
                  1000
               ).toFixed(2)}
               unit='hp/tn'
            />
            <TableRow className='bg-gray-700 h-[20px]'>
               <TableCell>
                  <Typography variant='body2'>Terrain</Typography>
               </TableCell>
               <TableCell>
                  <Typography variant='body2' align='right'>
                     (hard / medium / soft)
                  </Typography>
               </TableCell>
            </TableRow>
            <TableRowComponent
               iconSrc='/icons/mobility/vehicleSpeedGain.png'
               titleText='Terrain Resistance'
               valueText={`
                     ${vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0].toFixed(2)} /
                     ${vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1].toFixed(2)} /
                     ${vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2].toFixed(2)}
                  `}
               unit='m/s²'
               paddingLeft
            />
            <TableRowComponent
               iconSrc='/icons/mobility/speedLimits.png'
               titleText='Effective Top Speed'
               valueText={`
                     ${calculateEffectiveTopSpeed(
                        vehicleEngine[selectedModuleNames.vehicleEngine]?.power,
                        totalWeight / 1000,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
                        speedLimit?.forward,
                     ).toFixed(2)} /
                     ${calculateEffectiveTopSpeed(
                        vehicleEngine[selectedModuleNames.vehicleEngine]?.power,
                        totalWeight / 1000,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1],
                        speedLimit?.forward,
                     ).toFixed(2)} /
                     ${calculateEffectiveTopSpeed(
                        vehicleEngine[selectedModuleNames.vehicleEngine]?.power,
                        totalWeight / 1000,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2],
                        speedLimit?.forward,
                     ).toFixed(2)}
                  `}
               unit='km/h'
               paddingLeft
            />
            <TableRowComponent
               iconSrc='/icons/mobility/chassisRotationSpeed.png'
               titleText='Effective Traverse Speed'
               valueText={`
                     ${calculateEffectiveTraverseSpeed(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
                        0.95,
                     ).toFixed(2)} /
                     ${calculateEffectiveTraverseSpeed(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1],
                        0.95,
                     ).toFixed(2)} /
                     ${calculateEffectiveTraverseSpeed(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2],
                        0.95,
                     ).toFixed(2)}
                  `}
               unit='°/s'
               paddingLeft
            />
         </TableBody>
      </Table>
   )
}
