import { useContext, useState, useEffect } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import TableRowComponent from '../../Includes/TableRow'

export default function ShellCost({ armorDamage }: { armorDamage: number }) {
   const [shellCost, setShellCost] = useState<number>(0)

   const {
      vehicleReducer: {
         selectedModuleNames,
         moduleGroup: { shells },
      },
      modifiersReducer: {
         modifiers: { shells: shellsModifiers },
      },
   } = useContext(VehicleContext)

   useEffect(() => {
      if (!shellsModifiers?.price) return
      const modifiedShellCost = Number(
         ((1000 / armorDamage) * (shellsModifiers?.price?.difference ?? 0)).toFixed(0),
      )

      if (typeof modifiedShellCost === 'number') setShellCost(modifiedShellCost)
   }, [armorDamage, shellsModifiers])

   return (
      <TableRowComponent
         iconSrc='/icons/money_silver.webp'
         titleText='Shell Cost per 1000 HP'
         valueText={((1000 / armorDamage) * shells[selectedModuleNames.shells]?.price).toFixed(0)}
         unit='Credits'
         modifiers={[
            {
               difference: shellCost,
               improved: shellsModifiers?.price?.improved || false,
            },
         ]}
      />
   )
}
