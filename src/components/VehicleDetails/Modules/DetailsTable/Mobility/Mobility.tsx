'use client'
import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import useSetTotalWeight from './Hooks/useSetTotalWeight'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createCrewTransformer from '@/utils/ApplyCrewModifiers'
import createCrewSkillsTransformer from '@/utils/ApplyCrewSkillModifier'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'

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
import EffectiveTopSpeed from './Includes/EffectiveTopSpeed'
import EffectiveTraverseSpeed from './Includes/EffectiveTraverseSpeed'
import TerrainResistance from './Includes/TerrainResistance'
import SpecificPower from './Includes/SpecificPower'

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
   const {
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)
   const {
      crewReducer: { crewMembers },
   } = useContext(CrewContext)

   const gunDepression = -vehicleGun[selectedModuleNames.vehicleGun].elevationLimits.depression[1] || 0
   const gunElevation = -vehicleGun[selectedModuleNames.vehicleGun].elevationLimits.elevation[1] || 0

   const vehicleEnginePowerBase = vehicleEngine[selectedModuleNames.vehicleEngine].power
   const forwardSpeedBase = speedLimit.forward
   const backwardSpeedBase = speedLimit.backward
   const vehicleChassisRotationSpeedBase = vehicleChassis[selectedModuleNames.vehicleChassis].rotationSpeed
   const vehicleGunRotationSpeedBase = vehicleTurret[selectedModuleNames.vehicleTurret].traverse
   const vehicleTerrainResistanceBase = vehicleChassis[selectedModuleNames.vehicleChassis].terrainResistance

   const {
      backwardSpeed,
      forwardSpeed,
      enginePower,
      traverseSpeed,
      turretTraverseSpeed,
      terrainResistance1,
      terrainResistance2,
      terrainResistance3,
   } = useMemo(
      () =>
         applyStatPipeline(
            {
               enginePower: vehicleEnginePowerBase,
               forwardSpeed: forwardSpeedBase,
               backwardSpeed: backwardSpeedBase,
               traverseSpeed: vehicleChassisRotationSpeedBase,
               turretTraverseSpeed: vehicleGunRotationSpeedBase,
               terrainResistance1: vehicleTerrainResistanceBase[0],
               terrainResistance2: vehicleTerrainResistanceBase[1],
               terrainResistance3: vehicleTerrainResistanceBase[2],
            },
            [
               createDeviceTransformer(appliedDevicesModifiers),
               createCrewTransformer(crewMembers.driver),
               createCrewTransformer(crewMembers.gunner),
               createCrewSkillsTransformer(crewMembers.gunner),
               createCrewSkillsTransformer(crewMembers.driver),
            ],
         ),
      [
         vehicleEnginePowerBase,
         forwardSpeedBase,
         backwardSpeedBase,
         vehicleChassisRotationSpeedBase,
         vehicleGunRotationSpeedBase,
         appliedDevicesModifiers,
         vehicleTerrainResistanceBase,
         crewMembers,
      ],
   )

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
               valueText={forwardSpeed}
               unit='km/h'
               modifiers={[
                  {
                     difference: parseFloat((forwardSpeed - forwardSpeedBase).toFixed(2)),
                     improved: true,
                  },
               ]}
            />
            <TableRowComponent
               iconSrc='/icons/mobility/speedLimits.png'
               titleText='Backward Speed'
               valueText={backwardSpeed}
               unit='km/h'
               modifiers={[
                  {
                     difference: parseFloat((backwardSpeed - backwardSpeedBase).toFixed(2)),
                     improved: true,
                  },
               ]}
            />
            {vehicleChassis[selectedModuleNames.vehicleChassis]?.wheelAngle && (
               <WheelAngle
                  wheelAngle={vehicleChassis[selectedModuleNames.vehicleChassis]?.wheelAngle as number[]}
               />
            )}
            <TableRowComponent
               iconSrc='/icons/mobility/chassisRotationSpeed.png'
               titleText='Hull Traverse Speed'
               valueText={traverseSpeed}
               unit='deg/s'
               modifiers={[
                  {
                     difference: parseFloat((traverseSpeed - vehicleChassisRotationSpeedBase).toFixed(2)),
                     improved: true,
                  },
               ]}
            />
            <TableRowComponent
               iconSrc='/icons/mobility/turretRotationSpeed.png'
               titleText='Gun Traverse Speed'
               valueText={turretTraverseSpeed}
               unit='deg/s'
               modifiers={[
                  {
                     difference: parseFloat((turretTraverseSpeed - vehicleGunRotationSpeedBase).toFixed(2)),
                     improved: true,
                  },
               ]}
            />
            <TableRowComponent
               iconSrc='/icons/firepower/pitchLimits.png'
               titleText='Gun Depression / Elevation'
               valueText={[gunDepression, gunElevation]}
               unit='°'
            />
            {vehicleGun[selectedModuleNames.vehicleGun]?.arc.length > 0 && (
               <TableRowComponent
                  iconSrc='/icons/mobility/gunYawLimits.png'
                  titleText='Gun Traverse Limits'
                  valueText={[
                     vehicleGun[selectedModuleNames.vehicleGun]?.arc[0],
                     vehicleGun[selectedModuleNames.vehicleGun]?.arc[1],
                  ]}
                  unit='deg'
               />
            )}
            {siegeMode && <SiegeMode siegeMode={siegeMode} />}
            <RocketAcceleration />
            <TableRowComponent
               iconSrc='/icons/mobility/vehicleWeight.png'
               titleText='Weight'
               valueText={totalWeight / 1000}
               toFixed={2}
               unit='tn'
            />
            <TableRowComponent
               iconSrc='/icons/mobility/enginePower.png'
               titleText='Engine power'
               valueText={enginePower}
               unit='hp'
               modifiers={[
                  {
                     difference: parseFloat((enginePower - vehicleEnginePowerBase).toFixed(2)),
                     improved: true,
                  },
               ]}
            />
            <SpecificPower enginePower={enginePower} vehicleEnginePowerBase={vehicleEnginePowerBase} />
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
            <TerrainResistance
               terrainResistance1={terrainResistance1}
               terrainResistance2={terrainResistance2}
               terrainResistance3={terrainResistance3}
               vehicleTerrainResistanceBase={vehicleTerrainResistanceBase}
            />
            <EffectiveTopSpeed
               enginePower={enginePower}
               totalWeight={totalWeight}
               forwardSpeed={forwardSpeed}
               forwardSpeedBase={forwardSpeedBase}
               vehicleEnginePowerBase={vehicleEnginePowerBase}
            />
            <EffectiveTraverseSpeed traverseSpeed={traverseSpeed} />
         </TableBody>
      </Table>
   )
}
