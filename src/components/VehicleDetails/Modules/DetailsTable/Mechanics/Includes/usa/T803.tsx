import TableRowComponent from '../../../Includes/TableRow'
import type { T803Mechanics } from '../../Types'

export default function T803({ mechanics }: { mechanics: T803Mechanics }) {
   return (
      <>
         <>
            <TableRowComponent
               iconSrc='/icons/mechanics/t803/furyMaxReloadEffAvgDpm.png'
               titleText='Avg dmg at max reoad efficiency'
               valueText={mechanics.mechanics.furyMaxReloadEffAvgDpm}
               unit=''
            />
            <TableRowComponent
               iconSrc='/icons/mechanics/t803/furyMaxReloadEfficiencyLevel.png'
               titleText='Max reolad efficiency level'
               valueText={mechanics.mechanics.furyMaxReloadEfficiencyLevel}
               unit=''
            />
            <TableRowComponent
               iconSrc='/icons/mechanics/t803/furyReloadSpeedBonusPerEfficiencyLevel.png'
               titleText='Reload speed bonus / level'
               valueText={mechanics.mechanics.furyReloadSpeedBonusPerEfficiencyLevel}
               unit=''
            />
            <TableRowComponent
               iconSrc='/icons/mechanics/t803/furyReloadEfficiencyLevelDuration.png'
               titleText='Reload efficiency level duration'
               valueText={mechanics.mechanics.furyReloadEfficiencyLevelDuration}
               unit='seconds'
            />
            <TableRowComponent
               iconSrc='/icons/mechanics/t803/furyReloadEfficiencyLevelPerHit.png'
               titleText='Reload efficiency per hit'
               valueText={mechanics.mechanics.furyReloadEfficiencyLevelPerHit}
               unit='levels'
            />
            <TableRowComponent
               iconSrc='/icons/mechanics/t803/furyReloadEfficiencyLevelPerDestruction.png'
               titleText='Reload efficiency per destruction'
               valueText={mechanics.mechanics.furyReloadEfficiencyLevelPerDestruction}
               unit='levels'
            />
         </>
      </>
   )
}
