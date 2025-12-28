import TableRowComponent from '../../Includes/TableRow'

type BorkenkaferMechanics = {
   mechanics: {
      designatorInitialCooldownS: number
      designatorCooldownS: number
      designatorMarkDurationS: number
      designatorMarkedEnemiesAdditionalDamage: string
   }
   targetDesignator: {
      deployTime: number
      cooldownTime: number
      spottedMarkedTime: number
      unspottedMarkedTime: number
      damageIncomeFactor: number
   }
}

export default function Borkenkafer({ mechanics }: { mechanics: BorkenkaferMechanics }) {
   const preheatDispersionCap = Number(
      mechanics.mechanics.designatorMarkedEnemiesAdditionalDamage.split('%')[0]
   )

   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mechanics/borken/designatorInitialCooldownS.png'
            titleText='Initial Cooldown'
            valueText={mechanics.mechanics.designatorInitialCooldownS}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/borken/designatorCooldownS.png'
            titleText='Cooldown'
            valueText={mechanics.mechanics.designatorCooldownS}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/borken/designatorMarkdurationS.png'
            titleText='Mark duration'
            valueText={mechanics.mechanics.designatorMarkDurationS}
            unit='seconds'
         />
         <TableRowComponent
            iconSrc='/icons/mechanics/borken/designatorMarkedEnemiesAdditionalDamage.png'
            titleText='Additional marked damage'
            valueText={preheatDispersionCap}
            unit='%'
         />
      </>
   )
}
