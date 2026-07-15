import type { MeasureType } from '../Classes/CrewSkills'
import type { ModifierOperation } from './crewModifierConfig'

interface ICrewSkillConfig {
   /** Which field names in your flat object this modifier affects */
   fields: string[]
   /** percents  OR seconds */
   measureType: MeasureType
   isSituational: boolean
   operation: ModifierOperation
}

export const CREW_SKILLS_CONFIG: Record<string, Record<string, ICrewSkillConfig>> = {
   /**
    * COMMANDER SKILLS ---------------------------------------
    */
   /**
    * @param commander_emergency Emergency situational perk
    */
   commander_emergency: {},
   /**
    * @param commander_coordination Coordination situational perk
    */
   commander_coordination: {
      vehicleGunAimSpeed: {
         fields: ['aimingTime'],
         measureType: 'percents',
         isSituational: true,
         operation: 'degressive',
      },
   },
   /**
    * @param commander_eagleEye Recon skill
    */
   commander_eagleEye: {
      circularVisionRadius: {
         fields: ['viewRange'],
         measureType: 'percents',
         isSituational: false,
         operation: 'progressive',
      },
      penaltyToDamagedSurveyingDevice: {
         fields: ['surveyDeviceHp'],
         measureType: 'percents',
         isSituational: false,
         operation: 'progressive',
      },
   },

   /**
    * LOADER SKILLS ----------------------------------------------
    */
   /**
    * @param loader_pedant Safe stowage skill
    */
   loader_pedant: {
      vehicleAmmoBayStrength: {
         fields: ['ammoRackStrength'],
         isSituational: false,
         measureType: 'percents',
         operation: 'progressive',
      },
   },
   /**
    * @param loader_desperado Adrenaline Rush skill
    */
   loader_desperado: {
      vehicleGunReloadTime: {
         fields: ['reloadTime'],
         measureType: 'percents',
         isSituational: true,
         operation: 'degressive',
      },
   },
   /**
    * @param loader_perfectCharge Perfect Charge skill
    */
   loader_perfectCharge: {
      shellVelocity: {
         fields: ['shellVelocity'],
         isSituational: false,
         measureType: 'percents',
         operation: 'progressive',
      },
   },
   /**
    * @param loader_melee Close Combat skill
    */
   loader_melee: {
      vehicleGunReloadTime: {
         fields: ['reloadTime'],
         measureType: 'percents',
         isSituational: true,
         operation: 'degressive',
      },
   },
   /**
    * @param loader_ammunitionImprove Ammo Tuning skill
    */
   loader_ammunitionImprove: {
      damageAndPiercingDistributionLowerBound: {
         fields: ['minimumDamagePercent', 'minPenetration50', 'minPenetration500'],
         isSituational: false,
         measureType: 'add',
         operation: 'progressive',
      },
   },
   /**
    * @param loader_magMastery Mag Mastery skill
    */
   loader_magMastery: {
      magazineGunReloadSpeed: {
         fields: ['reloadTime'],
         isSituational: false,
         measureType: 'percents',
         operation: 'degressive',
      },
   },

   /**
    * @param loader_secondChance Second Chance situational perk
    */
   loader_secondChance: {
      vehicleGunReloadTime: {
         fields: ['reloadTime'],
         measureType: 'percents',
         isSituational: true,
         operation: 'degressive',
      },
   },
   /**
    * GUNNER SKILLS ----------------------------------------------------------------------------------
    */
   gunner_smoothTurret: {
      turretAimingDispersion: {
         fields: ['turretRotation'],
         isSituational: false,
         measureType: 'percents',
         operation: 'degressive',
      },
   },
   gunner_rancorous: {
      vehicleEnemySpottingTime: {
         fields: ['enemySpottingTime'],
         isSituational: true,
         measureType: 'seconds',
         operation: 'progressive',
      },
   },
   gunner_focus: {
      shotDispersionAngle: {
         fields: ['accuracy'],
         isSituational: true,
         measureType: 'percents',
         operation: 'degressive',
      },
   },
   /**
    * @param gunner_quickAiming Quick Aiming situational perk
    */
   gunner_quickAiming: {
      vehicleGunAimSpeed: {
         fields: ['aimingTime'],
         measureType: 'percents',
         isSituational: false,
         operation: 'degressive',
      },
      vehicleTurretRotationSpeed: {
         fields: ['turretTraverseSpeed'],
         isSituational: false,
         measureType: 'percents',
         operation: 'progressive',
      },
   },
   /**
    * @param gunner_loneWolf Lone Wolf situational perk
    */
   gunner_loneWolf: {
      shotDispersionAngle: {
         fields: ['accuracy'],
         isSituational: true,
         measureType: 'percents',
         operation: 'degressive',
      },
      vehicleGunAimSpeed: {
         fields: ['aimingTime'],
         measureType: 'percents',
         isSituational: true,
         operation: 'degressive',
      },
   },
   /**
    * @param gunner_pointBlast Point Blank situational perk
    */
   gunner_pointBlast: {
      piercingHEShellsDistributionUpperBound: {
         fields: ['maxPenetration50', 'maxPenetration500'],
         isSituational: true,
         measureType: 'add',
         operation: 'progressive',
      },
   },
   gunner_armorer: {
      damageAndPiercingDistributionLowerBound: {
         fields: ['minimumDamagePercent', 'minPenetration50', 'minPenetration500'],
         isSituational: false,
         measureType: 'add',
         operation: 'progressive',
      },
      damageAndPiercingDistributionUpperBound: {
         fields: ['maxPenetration50', 'maxPenetration500'],
         isSituational: false,
         measureType: 'add',
         operation: 'progressive',
      },
      shotDispersionAngle: {
         fields: ['accuracy'],
         isSituational: false,
         measureType: 'percents',
         operation: 'degressive',
      },
   },
   /**
    * DRIVER SKILLS ---------------------------------------------------------
    */
   /**
    * @param driver_smoothDriving Smooth Driving skill
    */
   driver_smoothDriving: {
      vehicleGunShotDispersionChassisMovement: {
         fields: ['vehicleMovement'],
         isSituational: false,
         measureType: 'percents',
         operation: 'degressive',
      },
   },
   /**
    * @param driver_virtuoso Clutch Braking skill
    */
   driver_virtuoso: {
      vehicleAllGroundRotationSpeed: {
         fields: ['traverseSpeed'],
         isSituational: false,
         measureType: 'percents',
         operation: 'progressive',
      },
   },
   /**
    * @param driver_badRoadsKing Off-Road Driving skill
    */
   driver_badRoadsKing: {
      mediumGroundFactor: {
         fields: ['mediumTerrainResistance'],
         isSituational: false,
         measureType: 'percents',
         operation: 'degressive',
      },
      softGroundFactor: {
         fields: ['softTerrainResistance'],
         isSituational: false,
         measureType: 'percents',
         operation: 'degressive',
      },
   },
   /**
    * @param driver_motorExpert Engeneer skill
    */
   driver_motorExpert: {
      vehicleForwardMaxSpeed: {
         fields: ['forwardSpeed'],
         isSituational: false,
         measureType: 'mph',
         operation: 'progressive',
      },
      vehicleBackwardMaxSpeed: {
         fields: ['backwardSpeed'],
         isSituational: false,
         measureType: 'mph',
         operation: 'progressive',
      },
      vehPenaltyForDamagedEngine: {
         fields: ['engineHealth', 'engineRegenHealth'],
         isSituational: false,
         measureType: 'percents',
         operation: 'progressive',
      },
   },
   /**
    * @param driver_reliablePlacement Reliable Placement skill
    */
   driver_reliablePlacement: {
      vehicleFireChance: {
         fields: ['fireChance'],
         isSituational: false,
         measureType: 'subtract',
         operation: 'degressive',
      },
      suspensionDamageReduction: {
         fields: ['chassisHealth', 'chassisRegenHealth'],
         isSituational: false,
         measureType: 'percents',
         operation: 'progressive',
      },
      vehicleHEShellDamageResistance: {
         fields: ['hEShellDamageResistance'],
         isSituational: false,
         measureType: 'percents',
         operation: 'progressive',
      },
   },
   /**
    * @param driver_suspensionRepair Reliable Placement skill
    */
   driver_suspensionRepair: {
      suspensionRepairSpeed: {
         fields: ['suspensionRepairSpeed'],
         isSituational: false,
         measureType: 'percents',
         operation: 'progressive',
      },
   },
   /**
    * RADIOMAN SKILLS ---------------------------------------------------------
    */
   radioman_finder: {
      vehicleCircularVisionRadius: {
         fields: ['viewRange'],
         measureType: 'percents',
         isSituational: false,
         operation: 'progressive',
      },
   },
   radioman_fireFighting: {
      fireExtinguishingRate: {
         fields: ['fireExtinguishingRate'],
         measureType: 'percents',
         isSituational: false,
         operation: 'progressive',
      },
   },
   radioman_interference: {
      vehicleOwnSpottingTime: {
         fields: ['ownSpottingTime'],
         measureType: 'seconds',
         isSituational: false,
         operation: 'degressive',
      },
   },
   radioman_threatSearch: {
      vehicleCircularVisionRadius: {
         fields: ['viewRange'],
         measureType: 'percents',
         isSituational: true,
         operation: 'progressive',
      },
   },
   /**
    * COMMON SKILLS ---------------------------------------
    */
   camouflage: {
      maskingFactor: {
         fields: ['camouflageMoving', 'camouflageStill', 'camouflageStillFire', 'camouflageMovingFire'],
         measureType: 'percents',
         isSituational: false,
         operation: 'progressive',
      },
   },
}

export default CREW_SKILLS_CONFIG
