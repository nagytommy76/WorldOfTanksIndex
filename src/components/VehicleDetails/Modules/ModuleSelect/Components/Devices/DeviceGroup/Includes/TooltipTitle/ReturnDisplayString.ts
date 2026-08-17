import ReturnPercentValue from '@/helpers/returnPercentValue'

type ModifierDisplayString = {
   [key: string]: string
}

type VehicleStatDescriptions = {
   [key: string]: {
      highlightedText: string | number
      prefix: '+' | '-' | ''
      suffix: 'km/h' | '%' | 's'
      text: string
   }
}

/**
 * @description returns an object of vehicle stat descriptions with highlighted text and prefix/suffix
 * @param transformValue string | number
 * @returns VehicleStatDescriptions
 * @example
 * const result = ReturnHighlightedValueString(transformValue)
 * result.vehicleEnginePower
 * // { highlightedText: transformValue, prefix: '+', suffix: '%', text: ' to engine power' }
 */
export function ReturnHighlightedValueString(transformValue: number | string): VehicleStatDescriptions {
   return {
      vehicleCamouflage: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to concealment',
      },
      vehicleStillCamouflage: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to concealment while stationary',
      },
      vehicleStillCamouflageDeluxe: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to concealment while stationary',
      },
      /**
       * @description Ventillation
       */
      crewLevel: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to crew level',
      },
      /**
       * @Modifiers - Gun Rammer
       */
      vehicleGunReloadTime: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to reload time',
      },
      /**
       * @description Spall liner
       */
      vehicleHEShellDamageResistance: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to HE shell damage',
      },
      vehicleRamDamageResistance: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to ramming damage',
      },
      crewHitChance: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to crew protection from injuries',
      },
      crewStunDuration: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to stun duration',
      },
      crewRepeatedStunDuration: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' additional stun duration if already stunned',
      },
      /**
       * @description Optics
       */
      vehicleCircularVisionRadius: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to view range',
      },
      /**
       * @description Binoculars
       */
      vehicleStillCircularVisionRadius: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to view range while stationary',
      },
      vehicleStillCircularVisionRadiusDeluxe: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to view range while stationary',
      },
      /**
       * @description CVS
       */
      demaskFoliageFactor: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to concealment of enemy vehicles behind foliage',
      },
      demaskMovingFactor: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to concealment of moving enemy vehicles',
      },
      /**
       * @description Improved Radio Set
       */
      vehicleEnemySpottingTime: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: 's',
         text: ' duration an enemy vehicle is visible',
      },
      vehicleOwnSpottingTime: {
         highlightedText: transformValue,
         prefix: '',
         suffix: 's',
         text: ' duration you are visible to enemy vehicles',
      },
      /**
       * @description Gun laying drive
       */
      vehicleGunAimSpeed: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to aiming speed',
      },
      /**
       * @description Vertical Stabilizer
       */
      vehicleGunShotDispersion: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to dispersion during movement and traverse',
      },
      /**
       * @description Hardening (HP boost)
       */
      vehicleStrength: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to hit points',
      },
      vehicleChassisStrength: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to suspension durability',
      },
      vehicleChassisRepairSpeed: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to suspension repair speed',
      },
      vehicleChassisFallDamage: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to collision damage',
      },
      /**
       * @description Additional Grousers
       */
      vehicleAllGroundRotationSpeed: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to vehicle traverse speed',
      },
      vehicleSpeedGain: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to maintaining speed when moving across any terrain type',
      },
      /**
       * @description Modified Configuration
       */
      vehicleRepairSpeed: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to repair speed',
      },
      vehicleAmmoBayEngineFuelStrength: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to ammo rack, fuel rank, and engine durability',
      },
      vehPenaltyForDamagedEngine: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to engine power penalty when damaged',
      },
      vehPenaltyForDamagedAmmorack: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to ammo rack durability penalty when damaged',
      },
      vehicleFireChance: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' chance of engine fire',
      },
      /**
       * @description Improved Rotation Mechanism
       */
      vehicleTurretOrCuttingRotationSpeed: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to hull traverse speed',
      },
      /**
       * @description Improved Aiming
       */
      vehicleGunShotFullDispersion: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to aiming circle size',
      },

      /**
       * @description Turbocharger
       */
      vehicleEnginePower: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: '%',
         text: ' to engine power',
      },
      vehicleForwardMaxSpeed: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: 'km/h',
         text: ' to top forward speed',
      },
      vehicleBackwardMaxSpeed: {
         highlightedText: transformValue,
         prefix: '+',
         suffix: 'km/h',
         text: ' to top backward speed',
      },
   }
}

export default function ReturnModifierDisplayString(value: number | string): ModifierDisplayString {
   const transformValue = ReturnPercentValue(value)
   return {
      // vehicleCamouflage: `+${transformValue}% to concealment`,
      // vehicleStillCamouflage: `+${transformValue}% to concealment while stationary`,
      // vehicleStillCamouflageDeluxe: `+${transformValue}% to concealment while stationary`,
      /**
       * @description Ventillation
       */
      // crewLevel: `+${transformValue}% to crew level`,
      /**
       * @Modifiers - Gun Rammer
       */
      // vehicleGunReloadTime: `${transformValue}% to reload time`,
      /**
       * @description Spall liner
       */
      // vehicleHEShellDamageResistance: `${transformValue}% to HE shell damage`,
      // vehicleRamDamageResistance: `${transformValue}% to ramming damage`,
      // crewHitChance: `+${transformValue}% to crew protection from injuries`,
      // crewStunDuration: `${transformValue}% stun duration`,
      // crewRepeatedStunDuration: `${transformValue}% additional stun duration if already stunned`,
      /**
       * @description Optics
       */
      vehicleCircularVisionRadius: `+${transformValue}% to view range`,
      /**
       * @description Binoculars
       */
      vehicleStillCircularVisionRadius: `+${transformValue}% to view range while stationary`,
      vehicleStillCircularVisionRadiusDeluxe: `+${transformValue}% to view range while stationary`,
      /**
       * @description CVS
       */
      // demaskFoliageFactor: `${transformValue}% to concealment of enemy vehicles behind foliage`,
      // demaskMovingFactor: `${transformValue}% to concealment of moving enemy vehicles`,
      /**
       * @description Improved Radio Set
       */
      // vehicleEnemySpottingTime: `+${value}s duration an enemy vehicle is visible`,
      // vehicleOwnSpottingTime: `${value}s duration you are visible to enemy vehicles`,
      /**
       * @description Gun laying drive
       */
      // vehicleGunAimSpeed: `+${transformValue}% to aiming speed`,
      /**
       * @description Vertical Stabilizer
       */
      // vehicleGunShotDispersion: `${transformValue}% to dispersion during movement and traverse`,
      /**
       * @description Hardening (HP boost)
       */
      vehicleStrength: `+${transformValue}% to hit points`,
      vehicleChassisStrength: `+${transformValue}% to suspension durability`,
      vehicleChassisRepairSpeed: `+${transformValue}% to suspension repair speed`,
      vehicleChassisFallDamage: `${transformValue}% to collision damage`,
      /**
       * @description Additional Grousers
       */
      vehicleAllGroundRotationSpeed: `+${transformValue}% to vehicle traverse speed`,
      vehicleSpeedGain: `+${transformValue}% to maintaining speed when moving across any terrain type`,
      /**
       * @description Modified Configuration
       */
      vehicleRepairSpeed: `+${transformValue}% to repair speed`,
      vehicleAmmoBayEngineFuelStrength: `+${transformValue}% to ammo rack, fuel rank, and engine durability`,
      vehPenaltyForDamagedEngine: `${transformValue}% to engine power penalty when damaged`,
      vehPenaltyForDamagedAmmorack: `${transformValue}% to ammo rack durability penalty when damaged`,
      vehicleFireChance: `${transformValue}% chance of engine fire`,
      /**
       * @description Improved Rotation Mechanism
       */
      vehicleTurretOrCuttingRotationSpeed: `+${transformValue}% to hull traverse speed`,
      /**
       * @description Improved Aiming
       */
      vehicleGunShotFullDispersion: `${transformValue}% to aiming circle size`,
      /**
       * @description Turbocharger
       */
      // vehicleEnginePower: `+${transformValue}% to engine power`,
      // vehicleForwardMaxSpeed: `+${value}km/h to top forward speed`,
      // vehicleBackwardMaxSpeed: `+${value}km/h to top backward speed`,
   }
}
