'use client'
import { useContext, useEffect, useState } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

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
                     ${(
                        speedLimit?.forward /
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0]
                     ).toFixed(2)} /
                     ${(
                        speedLimit?.forward /
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1]
                     ).toFixed(2)} /
                     ${(
                        speedLimit?.forward /
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2]
                     ).toFixed(2)}
                  `}
               unit='km/h'
            />
            {/* <TableRowComponent
               paddingLeft
               titleText='Effective traverse speed'
               valueText={`
                     ${(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed *
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0]
                     ).toFixed(2)} /
                     ${(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed *
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1]
                     ).toFixed(2)} /
                     ${(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed *
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2]
                     ).toFixed(2)}
                  `}
               unit='°/s'
            /> */}
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

// function calculateEffectiveTraverseSpeed(
//    realHorsePower: number,
//    terrainResistance: number,
//    traverseSpeed: number
// ) {
//    const effectiveHorsePower = realHorsePower / terrainResistance
//    console.log('Effective hp: ', effectiveHorsePower)
//    return traverseSpeed * (effectiveHorsePower / realHorsePower)
// }
function calculateEffectiveTraverseSpeed(
   traverseSpeed: number,
   hardTerrainResistance: number,
   targetTerrainResistance: number,
   crewModifier: number
) {
   return traverseSpeed * (hardTerrainResistance / targetTerrainResistance) * crewModifier
}

// console.log('GRILLE 15 HARD TERRAIN: ', calculateEffectiveTraverseSpeed(28, 1.24, 1.24, 0.95))
// console.log('GRILLE 15 MEDIUM TERRAIN: ', calculateEffectiveTraverseSpeed(28, 1.24, 1.49, 0.95))
// console.log('GRILLE 15 SOFT TERRAIN: ', calculateEffectiveTraverseSpeed(28, 1.24, 4.35, 0.95))

// console.log('RHM 15 HARD TERRAIN: ', 54 * (1 / 1) * 0.95)
// console.log('RHM 15 MEDIUM TERRAIN: ', 54 * (1 / 1.12) * 0.95)
// console.log('RHM 15 SOFT TERRAIN: ', 54 * (1 / 2.25) * 0.95)

// console.log('Taschenratte HARD TERRAIN: ', calculateEffectiveTraverseSpeed(15, 1.1, 1.1, 0.95))
// console.log('Taschenratte MEDIUM TERRAIN: ', calculateEffectiveTraverseSpeed(15, 1.1, 1.3, 0.95))
// console.log('Taschenratte SOFT TERRAIN: ', calculateEffectiveTraverseSpeed(15, 1.1, 2.1, 0.95))

/**
 * ORD: Off road driving
 * Hard (w/o ORD) = 15°/sec. * (1,591 / 1,750) = 13.63°/sec.

Hard (w/ ORD) = 15°/sec. * (1,591 / 1,750) = 13.63°/sec.

Moderate Soft (w/o ORD) = 15°/sec. * (1,346 / 1,750) = 11.54°/sec.

Moderate Soft (w/ ORD) = 15°/sec. * (1,455 / 1,750) = 12.47°/sec.

Soft (w/o ORD) = 15°/sec. * (980 / 1,750) = 7.14°/sec.

Soft (w/ ORD) = 15°/sec. * (1,591 / 1,750) = 8.4°/sec.
 */
