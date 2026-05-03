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
   vehicleGunReloadTime: {
      fields: ['reloadTime'],
      operation: 'mul',
   },
   vehicleGunAimSpeed: {
      fields: ['aimingTime'],
      operation: 'mulSubtract',
   },

   // --- Mobility ---
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
      fields: ['terrainResistance1', 'terrainResistance2', 'terrainResistance3'],
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
}

export default MODIFIER_CONFIG
