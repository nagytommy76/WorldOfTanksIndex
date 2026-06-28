import type { ModifierOperation } from './crewModifierConfig'

type MeasureType = 'percents' | 'seconds'

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
    * @param commander_eagleEye - RECON
    */
   circularVisionRadius: {
      fields: ['viewRange'],
      measureType: 'percents',
      isSituational: false,
      operation: 'progressive',
   },
   /**
    * @param commander_coordination - COORDINATION * situational
    */
   vehicleGunAimSpeed: {
      fields: ['aimingTime'],
      measureType: 'percents',
      isSituational: true,
      operation: 'degressive',
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
   /**
    * DRIVER SKILLS ----------------------------------------
    */
   vehicleGunShotDispersionChassisMovement: {
      fields: ['vehicleMovement'],
      isSituational: false,
      measureType: 'percents',
      operation: 'progressive',
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

   /**
    * RADIOMAN SKILLS ---------------------------------------
    */
   vehicleCircularVisionRadius: {
      fields: ['viewRange'],
      measureType: 'percents',
      isSituational: false,
      operation: 'progressive',
   },
}

export default CREW_SKILLS_MODIFIER_CONFIG
