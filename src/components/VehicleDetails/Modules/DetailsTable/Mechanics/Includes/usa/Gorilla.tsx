import React from 'react'
import { GorillaMechanics } from '../../Types'
import TableRowComponent from '../../../Includes/TableRow'

export default function Gorilla({ mechanics }: { mechanics: GorillaMechanics }) {
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/gorilla/lowChargeShotAvgDamage.png'
            titleText='Average Damage'
            valueText={mechanics.mechanics.lowChargeShotAvgDamage}
            unit='HP'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/gorilla/lowChargeShotPenetration.png'
            titleText='Average Penetration'
            valueText={mechanics.mechanics.lowChargeShotPenetration}
            unit='mm'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/gorilla/lowChargeShotRateOfFire.png'
            titleText='Rate of Fire'
            valueText={mechanics.mechanics.lowChargeShotRateOfFire}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/gorilla/lowChargeShotDispertion.png'
            titleText='Dispersion at 100 m'
            valueText={mechanics.mechanics.lowChargeShotDispertion}
            unit=''
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/gorilla/lowChargeShotVelocity.png'
            titleText='Shell Velocity'
            valueText={mechanics.mechanics.lowChargeShotVelocity}
            unit='m/s'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/gorilla/lowChargeShotBlockDuration.png'
            titleText='Shot Lock Duration'
            valueText={mechanics.mechanics.lowChargeShotBlockDuration}
            unit='seconds'
         />
      </>
   )
}
