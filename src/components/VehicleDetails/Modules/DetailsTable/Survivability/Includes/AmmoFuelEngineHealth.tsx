import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'
import { CrewContext } from '@/CrewContext/CrewContext'

import applyStatPipeline from '@/utils/applyStatPipeline'
import createCrewSkillsTransformer from '@/utils/ApplyCrewSkillModifier'
import { createDeviceTransformer } from '@/utils/ApplyModifiers'

import TableRowComponent from '../../Includes/TableRow'

export default function AmmoFuelEngineHealth() {
   const {
      hull,
      fuelTank,
      vehicleReducer: {
         selectedModuleNames,

         moduleGroup: { vehicleEngine },
      },
   } = useContext(VehicleContext)
   const {
      deviceReducer: { appliedDevicesModifiers },
   } = useContext(DeviceContext)
   const {
      crewReducer: { crewMembers },
   } = useContext(CrewContext)

   const ammoRackHealthBase = hull.ammoRackHealth.maxHealth
   const ammoRackRegenHealthBase = hull.ammoRackHealth.maxRegenHealth

   const fuelTankHealthBase = fuelTank[0].maxHealth
   const fuelTankRegenHealthBase = fuelTank[0].maxRegenHealth

   const engineHealthBase = vehicleEngine[selectedModuleNames.vehicleEngine].maxHealth
   const engineRegenHealthBase = vehicleEngine[selectedModuleNames.vehicleEngine].maxRegenHealth

   const {
      ammoRackStrength,
      ammoRackRegenStrength,
      fuelTankStrength,
      fuelTankRegenStrength,
      engineStrength,
      engineRegenStrength,
   } = useMemo(
      () =>
         applyStatPipeline(
            {
               ammoRackStrength: ammoRackHealthBase,
               ammoRackRegenStrength: ammoRackRegenHealthBase,
               fuelTankStrength: fuelTankHealthBase,
               fuelTankRegenStrength: fuelTankRegenHealthBase,
               engineStrength: engineHealthBase,
               engineRegenStrength: engineRegenHealthBase,
            },
            [
               createDeviceTransformer(appliedDevicesModifiers),
               createCrewSkillsTransformer(crewMembers.loader),
               createCrewSkillsTransformer(crewMembers.gunner),
            ],
         ),
      [
         appliedDevicesModifiers,
         ammoRackHealthBase,
         ammoRackRegenHealthBase,
         fuelTankHealthBase,
         fuelTankRegenHealthBase,
         engineHealthBase,
         engineRegenHealthBase,
         crewMembers,
      ],
   )

   return (
      <>
         <TableRowComponent
            iconSrc='/icons/survivability/vehicleAmmoBayStrength.png'
            titleText='Ammo Rack HP / Repaired'
            valueText={[ammoRackStrength, ammoRackRegenStrength]}
            unit='hp'
            modifiers={[
               {
                  difference: parseFloat((ammoRackStrength - ammoRackHealthBase).toFixed(2)),
                  improved: true,
               },
               {
                  difference: ammoRackRegenStrength - ammoRackRegenHealthBase,
                  improved: true,
               },
            ]}
         />

         <TableRowComponent
            iconSrc='/icons/survivability/fuelTankHP.png'
            titleText='Fuel Tank HP / Repaired'
            valueText={[fuelTankStrength, fuelTankRegenStrength]}
            unit='hp'
            modifiers={[
               {
                  difference: fuelTankStrength - fuelTankHealthBase,
                  improved: true,
               },
               {
                  difference: fuelTankRegenStrength - fuelTankRegenHealthBase,
                  improved: true,
               },
            ]}
         />
         <TableRowComponent
            iconSrc='/icons/survivability/vehicleAmmoBayEngineFuelStrength.png'
            titleText='Engine HP / Repaired'
            valueText={[engineStrength, engineRegenStrength]}
            unit='hp'
            modifiers={[
               {
                  difference: engineStrength - engineHealthBase,
                  improved: true,
               },
               {
                  difference: engineRegenStrength - engineRegenHealthBase,
                  improved: true,
               },
            ]}
         />
      </>
   )
}
