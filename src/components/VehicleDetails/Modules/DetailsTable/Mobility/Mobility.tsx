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

export default function Mobility() {
   const [totalWeight, setTotalWeight] = useState<number>(0)
   const {
      speedLimit,
      hull,
      fuelTank,
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleChassis, vehicleTurret, vehicleGun, vehicleEngine, vehicleRadio },
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
      <Table size='small' aria-label='Firepower table with average damage and penetration'>
         <TableHeadComponent headTitle='Mobility' className='bg-amber-500' />
         <TableBody>
            <TableRowComponent titleText='Forward speed' valueText={speedLimit?.forward} unit='km/h' />
            <TableRowComponent titleText='Backward speed' valueText={speedLimit?.backward} unit='km/h' />
            <TableRowComponent
               titleText='Traverse Speed'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed}
               unit='deg/s'
            />
            <TableRowComponent
               titleText='Gun Traverse Speed'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.traverse}
               unit='deg/s'
            />
            <TableRowComponent titleText='Weight' valueText={(totalWeight / 1000).toFixed(2)} unit='tn' />
            <TableRowComponent
               titleText='Specific power'
               valueText={(
                  (vehicleEngine[selectedModuleNames.vehicleEngine]?.power / totalWeight) *
                  1000
               ).toFixed(2)}
               unit='hp/tn'
            />
            <TableRowComponent
               titleText='Engine power'
               valueText={vehicleEngine[selectedModuleNames.vehicleEngine]?.power}
               unit='hp'
            />
            <TableRowComponent
               titleText='Traverse Speed'
               valueText={vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed}
               unit='°/s'
            />
            <TableRowComponent
               titleText='Gun Traverse Speed'
               valueText={vehicleTurret[selectedModuleNames.vehicleTurret]?.traverse}
               unit='°/s'
            />
            <TableRow className='bg-gray-700'>
               <TableCell>
                  <Typography variant='body1'>Terrain (hard / medium / soft)</Typography>
               </TableCell>
               <TableCell></TableCell>
            </TableRow>
            <TableRowComponent
               paddingLeft
               titleText='Terrain Resistance'
               valueText={`
                     ${vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0].toFixed(2)} /
                     ${vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1].toFixed(2)} /
                     ${vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2].toFixed(2)}
                  `}
               unit='m/s²'
            />
            <TableRowComponent
               paddingLeft
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
               paddingLeft
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
