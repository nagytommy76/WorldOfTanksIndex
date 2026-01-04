'use client'
import { useContext, useEffect, useState } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import { calculateEffectiveTopSpeed, calculateEffectiveTraverseSpeed } from '../../Helpers/calculate'

import TableHeadComponent from '../Includes/TableHead'

import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import TableRowComponent from '../Includes/TableRow'

import SiegeMode from './Includes/SiegeMode'

export default function Mobility() {
   const [totalWeight, setTotalWeight] = useState<number>(0)
   const {
      speedLimit,
      hull,
      fuelTank,
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleChassis, vehicleTurret, vehicleGun, vehicleEngine, vehicleRadio },
         siegeMode,
      },
   } = useContext(VehicleContext)

   useEffect(() => {
      const totalWeight =
         fuelTank[0]?.weight +
         hull?.weight +
         vehicleChassis[selectedModuleNames.vehicleChassis]?.weight +
         vehicleEngine[selectedModuleNames.vehicleEngine]?.weight +
         vehicleTurret[selectedModuleNames.vehicleTurret]?.weight +
         vehicleGun[selectedModuleNames.vehicleGun]?.weight +
         vehicleRadio[selectedModuleNames.vehicleRadio]?.weight
      if (totalWeight) setTotalWeight(totalWeight)
   }, [
      selectedModuleNames,
      hull,
      fuelTank,
      vehicleChassis,
      vehicleEngine,
      vehicleTurret,
      vehicleGun,
      vehicleRadio,
   ])

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
               titleText='Forward speed'
               valueText={speedLimit?.forward}
               unit='km/h'
            />
            <TableRowComponent
               iconSrc='/icons/mobility/speedLimits.png'
               titleText='Backward speed'
               valueText={speedLimit?.backward}
               unit='km/h'
            />
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
               titleText='Specific power'
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
            />
            <TableRowComponent
               iconSrc='/icons/mobility/speedLimits.png'
               titleText='Effective top speed'
               valueText={`
                     ${calculateEffectiveTopSpeed(
                        vehicleEngine[selectedModuleNames.vehicleEngine]?.power,
                        totalWeight / 1000,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
                        speedLimit?.forward
                     ).toFixed(2)} /
                     ${calculateEffectiveTopSpeed(
                        vehicleEngine[selectedModuleNames.vehicleEngine]?.power,
                        totalWeight / 1000,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1],
                        speedLimit?.forward
                     ).toFixed(2)} /
                     ${calculateEffectiveTopSpeed(
                        vehicleEngine[selectedModuleNames.vehicleEngine]?.power,
                        totalWeight / 1000,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2],
                        speedLimit?.forward
                     ).toFixed(2)}
                  `}
               unit='km/h'
            />
            <TableRowComponent
               iconSrc='/icons/mobility/chassisRotationSpeed.png'
               titleText='Effective traverse speed'
               valueText={`
                     ${calculateEffectiveTraverseSpeed(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
                        0.95
                     ).toFixed(2)} /
                     ${calculateEffectiveTraverseSpeed(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1],
                        0.95
                     ).toFixed(2)} /
                     ${calculateEffectiveTraverseSpeed(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed,
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0],
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2],
                        0.95
                     ).toFixed(2)}
                  `}
               unit='°/s'
            />
         </TableBody>
      </Table>
   )
}
