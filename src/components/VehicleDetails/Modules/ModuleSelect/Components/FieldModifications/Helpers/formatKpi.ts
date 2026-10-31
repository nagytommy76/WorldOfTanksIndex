import { ReturnHighlightedValueString } from '@/VehicleDetails/Modules/ModuleSelect/Components/Devices/DeviceGroup/Includes/TooltipTitle/ReturnDisplayString'
import ReturnPercentValue from '@/helpers/returnPercentValue'

import type { IModifierOp } from '@Models/FieldModifications/FieldModificationTypes'

/**
 * @description Stats where the smaller value is the better one, e.g. -3% to reload time.
 * crewHitChance is not here: that KPI means protection (1.2 comes with crewChanceToHitFactor 0.8).
 */
const LOWER_IS_BETTER = new Set([
   'vehicleGunReloadTime',
   'vehicleGunShotFullDispersion',
   'vehicleGunShotDispersion',
   'vehicleGunShotDispersionAfterShot',
   'vehicleGunShotDispersionChassisMovement',
   'vehicleGunShotDispersionChassisRotation',
   'vehicleGunShotDispersionTurretRotation',
   'vehicleGunShotDispersionWhileGunDamaged',
   'vehicleHEShellDamageResistance',
   'vehicleRamDamageResistance',
   'vehicleChassisFallDamage',
   'vehicleFireChance',
   'vehicleOwnSpottingTime',
   'crewStunDuration',
   'crewRepeatedStunDuration',
   'demaskFoliageFactor',
   'demaskMovingFactor',
   'vehPenaltyForDamagedEngine',
   'vehPenaltyForDamagedAmmorack',
])

/**
 * @param amount Signed change with its unit, e.g. '+3%' or '-2 km/h'
 * @param text Text after the amount, e.g. ' to engine power'
 * @param isBeneficial true when the change improves the vehicle
 */
export interface IFormattedKpi {
   amount: string
   text: string
   isBeneficial: boolean
}

/**
 * @description Turns a field modification KPI into a display row. Unlike the equipment rows,
 * the sign comes from the value, because pair options have drawbacks too.
 * @example
 * formatKpi({ operation: 'mul', name: 'vehicleEnginePower', value: 1.03 })
 * // { amount: '+3%', text: ' to engine power', isBeneficial: true }
 * formatKpi({ operation: 'add', name: 'vehicleForwardMaxSpeed', value: -2 })
 * // { amount: '-2 km/h', text: ' to top forward speed', isBeneficial: false }
 */
export function formatKpi({ operation, name, value }: IModifierOp): IFormattedKpi {
   const descriptions = ReturnHighlightedValueString(value)
   const description = name in descriptions ? descriptions[name] : undefined
   const change = operation === 'mul' ? ReturnPercentValue(value) : value

   return {
      amount: `${change > 0 ? '+' : ''}${change}${getUnit(operation, description?.suffix)}`,
      text: description?.text ?? ` ${name}`,
      isBeneficial: LOWER_IS_BETTER.has(name) ? change < 0 : change > 0,
   }
}

/**
 * @description 'mul' KPIs are shown as percentages, 'add' KPIs in the unit of the stat, e.g. km/h
 */
function getUnit(operation: IModifierOp['operation'], suffix: string | undefined) {
   if (operation === 'mul' || suffix === '%') return '%'
   return suffix ? ` ${suffix}` : ''
}
