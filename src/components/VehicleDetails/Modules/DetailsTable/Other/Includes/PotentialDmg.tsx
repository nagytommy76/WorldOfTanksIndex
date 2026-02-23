import { useContext, useState, useEffect } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import TableRowComponent from '../../Includes/TableRow'

export default function PotentialDmg({ armorDamage }: { armorDamage: number }) {
   const [calculatedPontentialDamage, setCalculatedPontentialDamage] = useState(0)
   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { shells, vehicleGun },
      },
      modifiersReducer: {
         modifiers: { shells: shellsModifiers },
      },
   } = useContext(VehicleContext)

   useEffect(() => {
      if (!shellsModifiers['damage.armor']) return
      const maxAmmo = vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo

      const defaultPontentialDamage = maxAmmo * shellsModifiers['damage.armor']?.base

      const modifiedPontentialDamage =
         maxAmmo * shellsModifiers['damage.armor']?.compared - defaultPontentialDamage

      setCalculatedPontentialDamage(modifiedPontentialDamage)
   }, [shellsModifiers, selectedModuleNames.vehicleGun, vehicleGun])

   if (
      vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo &&
      shells[selectedModuleNames.shells]?.damage.armor
   ) {
      return (
         <TableRowComponent
            iconSrc='/icons/miscellaneous/avgDamage.png'
            titleText='Potential Damage'
            valueText={vehicleGun[selectedModuleNames.vehicleGun]?.maxAmmo * armorDamage}
            unit='HP'
            modifiers={[
               {
                  difference: calculatedPontentialDamage,
                  improved: shellsModifiers['damage.armor']?.improved || false,
               },
            ]}
         />
      )
   }
}
