import { useContext, useEffect, useState } from 'react'
import { TomatoContext } from '@/TomatoContext/TomatoContext'

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
      tomatoReducer: {
         selectedModuleNames,
         moduleGroup: { vehicleChassis, vehicleTurret, vehicleGun, vehicleEngine, vehicleRadio },
      },
   } = useContext(TomatoContext)

   useEffect(() => {
      const totalWeight =
         fuelTank?.weight +
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
                  (vehicleEngine[selectedModuleNames.vehicleEngine]?.realPower / totalWeight) *
                  1000
               ).toFixed(2)}
               unit='hp/tn'
            />
            <TableRowComponent
               titleText='Engine power'
               valueText={vehicleEngine[selectedModuleNames.vehicleEngine]?.realPower}
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
            <TableRow>
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
            <TableRowComponent
               paddingLeft
               titleText='Effective traverse speed'
               valueText={`
                     ${(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed /
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[0]
                     ).toFixed(2)} /
                     ${(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed /
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[1]
                     ).toFixed(2)} /
                     ${(
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.rotationSpeed /
                        vehicleChassis[selectedModuleNames.vehicleChassis]?.terrainResistance[2]
                     ).toFixed(2)}
                  `}
               unit='°/s'
            />
         </TableBody>
      </Table>
   )
}
