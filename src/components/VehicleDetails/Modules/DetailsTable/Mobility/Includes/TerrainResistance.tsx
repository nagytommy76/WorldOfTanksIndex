import React from 'react'

import TableRowComponent from '../../Includes/TableRow'

export default function TerrainResistance({
   terrainResistance1,
   terrainResistance2,
   terrainResistance3,
   vehicleTerrainResistanceBase,
}: {
   terrainResistance1: number
   terrainResistance2: number
   terrainResistance3: number
   vehicleTerrainResistanceBase: number[]
}) {
   return (
      <TableRowComponent
         iconSrc='/icons/mobility/vehicleSpeedGain.png'
         titleText='Terrain Resistance'
         valueText={[
            parseFloat(terrainResistance1.toFixed(2)),
            parseFloat(terrainResistance2.toFixed(2)),
            parseFloat(terrainResistance3.toFixed(2)),
         ]}
         toFixed={2}
         unit='m/s²'
         paddingLeft
         // The difference is base - current here (a lower resistance is the better one), so the base is passed explicitly
         modifiers={[
            {
               difference: parseFloat((vehicleTerrainResistanceBase[0] - terrainResistance1).toFixed(2)),
               base: vehicleTerrainResistanceBase[0],
            },
            {
               difference: parseFloat((vehicleTerrainResistanceBase[1] - terrainResistance2).toFixed(2)),
               base: vehicleTerrainResistanceBase[1],
            },
            {
               difference: parseFloat((vehicleTerrainResistanceBase[2] - terrainResistance3).toFixed(2)),
               base: vehicleTerrainResistanceBase[2],
            },
         ]}
      />
   )
}
