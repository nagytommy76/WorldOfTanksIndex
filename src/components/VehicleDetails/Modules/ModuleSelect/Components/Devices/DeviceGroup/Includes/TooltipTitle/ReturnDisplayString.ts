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
      crewSkillCamouflage: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to all crew members Concealment perk trained.',
      },
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
         prefix: '+',
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

      crewSkillStunResistance: {
         highlightedText: transformValue,
         prefix: '',
         suffix: '%',
         text: ' to Sound Detection perk trained',
      },
   }
}
