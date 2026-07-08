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

const CREW_SKILLS_MODIFIER_CONFIG: Record<string, ICrewSkillConfig> = {
   /**
    * COMMON SKILLS ---------------------------------------
    */
   maskingFactor: {
      fields: ['camouflageMoving', 'camouflageStill', 'camouflageStillFire', 'camouflageMovingFire'],
      measureType: 'percents',
      isSituational: false,
      operation: 'progressive',
   },
   /**
    * COMMANDER SKILLS ---------------------------------------
    */
   /**
    * @param commander_coordination - COORDINATION * situational
    */
   vehicleGunAimSpeed: {
      fields: ['aimingTime'],
      measureType: 'percents',
      isSituational: false,
      operation: 'degressive',
   },
   /**
    * @param commander_eagleEye - RECON
    */
   circularVisionRadius: {
      fields: ['viewRange'],
      measureType: 'percents',
      isSituational: false,
      operation: 'progressive',
   },
   /**
    * @param commander_emergency - EMERGENCY * situational
    * @param commander_holdLine - HOLD THE LINE * situational
    * @param commander_staySharp - STAY SHARP * situational
    */
   crewLevelIncrease: {
      fields: ['crewLevel'],
      measureType: 'percents',
      isSituational: true,
      operation: 'progressive',
   },
   /**
    * LOADER SKILLS ----------------------------------------
    */
   /**
    * @description @param loader_perfectCharge - perfect charge
    */
   vehicleAmmoBayStrength: {
      fields: ['ammoRackStrength'],
      isSituational: false,
      measureType: 'percents',
      operation: 'progressive',
   },
   shellVelocity: {
      fields: ['shellVelocity'],
      isSituational: false,
      measureType: 'percents',
      operation: 'progressive',
   },
   vehicleGunReloadTime: {
      fields: ['reloadTime'],
      measureType: 'percents',
      isSituational: true,
      operation: 'degressive',
   },
   damageAndPiercingDistributionLowerBound: {
      fields: ['minimumDamagePercent', 'minPenetration50', 'minPenetration500'],
      isSituational: false,
      measureType: 'add',
      operation: 'progressive',
   },
   /**
    * DRIVER SKILLS ----------------------------------------
    */
   /**
    * @param driver_smoothDriving - Smooth Driving
    */
   vehicleGunShotDispersionChassisMovement: {
      fields: ['vehicleMovement'],
      isSituational: false,
      measureType: 'percents',
      operation: 'degressive',
   },
   /**
    * @param driver_virtuoso - Clutch Braking
    */
   vehicleAllGroundRotationSpeed: {
      fields: ['traverseSpeed'],
      isSituational: false,
      measureType: 'percents',
      operation: 'progressive',
   },
   /**
    * @param driver_badRoadsKing - Off-Road Driving
    */
   mediumGroundFactor: {
      fields: ['terrainResistance2'],
      isSituational: false,
      measureType: 'percents',
      operation: 'degressive',
   },
   softGroundFactor: {
      fields: ['terrainResistance3'],
      isSituational: false,
      measureType: 'percents',
      operation: 'degressive',
   },
   /**
    * @param driver_motorExpert - Engineer
    */
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
   /**
    * @param driver_reliablePlacement - Reliable Placement
    */
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
   /**
    * GUNNER SKILLS ----------------------------------------
    */
   vehicleTurretRotationSpeed: {
      fields: ['turretTraverseSpeed'],
      isSituational: false,
      measureType: 'percents',
      operation: 'progressive',
   },
   /**
    * @param gunner_smoothTurret - snap shot
    */
   turretAimingDispersion: {
      fields: ['turretRotation'],
      isSituational: false,
      measureType: 'percents',
      operation: 'degressive',
   },
   shotDispersionAngle: {
      fields: ['accuracy'],
      isSituational: false,
      measureType: 'percents',
      operation: 'degressive',
   },
   vehicleEnemySpottingTime: {
      fields: ['enemySpottingTime'],
      isSituational: true,
      measureType: 'seconds',
      operation: 'progressive',
   },
   piercingHEShellsDistributionUpperBound: {
      fields: ['maxPenetration50', 'maxPenetration500'],
      isSituational: true,
      measureType: 'add',
      operation: 'progressive',
   },

   /**
    * RADIOMAN SKILLS ---------------------------------------
    */
   vehicleCircularVisionRadius: {
      fields: ['viewRange'],
      measureType: 'percents',
      isSituational: false,
      operation: 'progressive',
   },
   /**
    * @param radioman_interference - Jamming
    */
   vehicleOwnSpottingTime: {
      fields: ['ownSpottingTime'],
      measureType: 'seconds',
      isSituational: false,
      operation: 'degressive',
   },
}

export default CREW_SKILLS_MODIFIER_CONFIG
