import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import applyModifiersOnVehicleDetails from '@/utils/ApplyModifiers'

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
         applyModifiersOnVehicleDetails(
            {
               ammoRackStrength: ammoRackHealthBase,
               ammoRackRegenStrength: ammoRackRegenHealthBase,
               fuelTankStrength: fuelTankHealthBase,
               fuelTankRegenStrength: fuelTankRegenHealthBase,
               engineStrength: engineHealthBase,
               engineRegenStrength: engineRegenHealthBase,
            },
            appliedDevicesModifiers,
         ),
      [
         appliedDevicesModifiers,
         ammoRackHealthBase,
         ammoRackRegenHealthBase,
         fuelTankHealthBase,
         fuelTankRegenHealthBase,
         engineHealthBase,
         engineRegenHealthBase,
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
                  difference: ammoRackStrength - ammoRackHealthBase,
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
