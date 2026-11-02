// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ModifierOperation = 'mul' | 'add' | 'mulAdd' | 'mulSubtract'

interface IModifierConfig {
   /** Which field names in your flat object this modifier affects */
   fields: string[]
   /** Whether to multiply or add the modifier value */
   operation: ModifierOperation
}

/**
 * @description Central mapping: device modifier name (from XML/DB) → what it does to your stat fields.
 *
 * 'mul' = multiply (e.g. 0.9 reload time = 10% faster)
 * 'add' = additive  (e.g. +4 km/h forward speed)
 */
const MODIFIER_CONFIG: Record<string, IModifierConfig> = {
   crewLevel: {
      fields: ['crewLevel'],
      operation: 'mul',
   },
   // --- Firepower ---
   vehicleGunShotDispersion: {
      fields: ['vehicleMovement', 'vehicleRotation', 'turretRotation', 'afterShot'],
      operation: 'mul',
   },
   vehicleGunShotFullDispersion: {
      fields: ['accuracy'],
      operation: 'mul',
   },
   vehicleGunShotDispersionAfterShot: {
      fields: ['afterShot'],
      operation: 'mul',
   },
   vehicleGunReloadTime: {
      fields: ['reloadTime'],
      operation: 'mul',
   },
   vehicleGunAimSpeed: {
      fields: ['aimingTime'],
      operation: 'mulSubtract',
   },
   vehicleGunShotDispersionTurretRotation: {
      fields: ['turretRotation'],
      operation: 'mul',
   },
   vehicleGunShotDispersionChassisRotation: {
      fields: ['vehicleRotation'],
      operation: 'mul',
   },
   vehicleGunShotDispersionChassisMovement: {
      fields: ['vehicleMovement'],
      operation: 'mul',
   },
   shellVelocity: {
      fields: ['shellVelocity'],
      operation: 'mul',
   },
   vehicleGunShotDispersionWhileGunDamaged: {
      fields: ['accuracyWhileDamaged'],
      operation: 'mul',
   },

   /**
    * ROCKET BOOSTER MOBILITY: -------------------------------------------------
    */
   rocketVehicleEnginePower: {
      fields: ['enginePower'],
      operation: 'mul',
   },
   rocketVehicleForwardMaxSpeed: {
      fields: ['forwardSpeed'],
      operation: 'mul',
   },
   rocketVehicleBackwardMaxSpeed: {
      fields: ['backwardSpeed'],
      operation: 'mul',
   },
   rocketVehicleAllGroundRotationSpeed: {
      fields: ['traverseSpeed'],
      operation: 'mul',
   },

   // --- Mobility --------
   vehicleEnginePower: {
      fields: ['enginePower'],
      operation: 'mul',
   },
   vehicleForwardMaxSpeed: {
      fields: ['forwardSpeed'],
      operation: 'add',
   },
   vehicleBackwardMaxSpeed: {
      fields: ['backwardSpeed'],
      operation: 'add',
   },
   vehicleAllGroundRotationSpeed: {
      fields: ['traverseSpeed'],
      operation: 'mul',
   },
   vehicleTurretOrCuttingRotationSpeed: {
      fields: ['turretTraverseSpeed'],
      operation: 'mul',
   },
   vehicleSpeedGain: {
      fields: ['hardTerrainResistance', 'mediumTerrainResistance', 'softTerrainResistance'],
      operation: 'mulSubtract',
   },

   // --- Survivability ---
   vehicleStrength: {
      fields: ['maxHealth'],
      operation: 'mul',
   },
   /**
    * @description Track healt
    */
   vehicleChassisStrength: {
      fields: ['chassisHealth', 'chassisRegenHealth'],
      operation: 'mul',
   },
   vehicleChassisRepairSpeed: {
      fields: ['chassisRepairSpeed'],
      operation: 'mulSubtract',
   },
   vehicleRepairSpeed: {
      fields: ['chassisRepairSpeed'],
      operation: 'mulSubtract',
   },
   vehicleFireChance: {
      fields: ['fireChance'],
      operation: 'mul',
   },
   /**
    * @description
    */
   vehicleAmmoBayEngineFuelStrength: {
      fields: [
         'ammoRackStrength',
         'ammoRackRegenStrength',
         'engineStrength',
         'engineRegenStrength',
         'fuelTankStrength',
         'fuelTankRegenStrength',
      ],
      operation: 'mul',
   },

   // --- Stealth / Recon ---
   vehicleCircularVisionRadius: {
      fields: ['viewRange'],
      operation: 'mul',
   },
   vehicleRadioCircularVisionRadius: {
      fields: ['radioViewRange'],
      operation: 'mul',
   },
   vehicleStillCircularVisionRadius: {
      fields: ['stillViewRange'],
      operation: 'mul',
   },
   vehicleStillCircularVisionRadiusDeluxe: {
      fields: ['stillViewRange'],
      operation: 'mul',
   },
   vehicleStillCamouflage: {
      fields: ['camouflageStill'],
      operation: 'mulAdd',
   },
   vehicleStillCamouflageDeluxe: {
      fields: ['camouflageStill'],
      operation: 'mulAdd',
   },
   vehicleCamouflage: {
      fields: ['camouflageMoving', 'camouflageStill'],
      operation: 'mulAdd',
   },
   vehicleEnemySpottingTime: {
      fields: ['enemySpottingTime'],
      operation: 'add',
   },
   vehicleOwnSpottingTime: {
      fields: ['ownSpottingTime'],
      operation: 'add',
   },
   demaskFoliageFactor: {
      fields: ['demaskFoliageFactor'],
      operation: 'mul',
   },
   demaskMovingFactor: {
      fields: ['demaskMovingFactor'],
      operation: 'mul',
   },
   /**
    * Need to calculate inside Concealment component!!!!!!!!!!!!!!!!!!
    */
   vehicleInvisibilityAfterShot: {
      fields: ['vehicleStillCamoflageAfterFire', 'vehicleMovingCamoflageAfterFire'],
      operation: 'mul',
   },
}

export default MODIFIER_CONFIG
