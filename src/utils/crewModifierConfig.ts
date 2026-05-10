type ModifierOperation = 'degressive' | 'progressive'

interface IModifierConfig {
   /** Which field names in your flat object this modifier affects */
   fields: string[]
   /** Whether to multiply or add the modifier value */
   operation: ModifierOperation
}

/**
 * Centralized config for how crew efficiency levels map to actual stat modifiers.
 */
const CREW_MODIFIER_CONFIG: Record<string, IModifierConfig> = {
   // COMMANDER ----------------------------
   vehicleCircularVisionRadius: {
      fields: ['viewRange'],
      operation: 'progressive',
   },
   // DRIVER -------------------------------
   vehicleAllGroundRotationSpeed: {
      fields: ['traverseSpeed'],
      operation: 'progressive',
   },
   vehicleSpeedGain: {
      fields: ['terrainResistance1', 'terrainResistance2', 'terrainResistance3'],
      operation: 'progressive',
   },
   // GUNNER -------------------------------
   vehicleGunAimSpeed: {
      fields: ['aimingTime'],
      operation: 'degressive',
   },
   vehicleGunShotFullDispersion: {
      fields: ['accuracy'],
      operation: 'degressive',
   },
   vehicleTurretOrCuttingRotationSpeed: {
      fields: ['turretTraverseSpeed'],
      operation: 'progressive',
   },
   vehicleGunShotDispersion: {
      fields: ['vehicleMovement', 'vehicleRotation', 'turretRotation', 'afterShot'],
      operation: 'degressive',
   },
   // LOADER ------------------------------
   vehicleGunReloadTime: {
      fields: ['reloadTime'],
      operation: 'degressive',
   },
   // RADIOMAN ---------------------------
   vehicleRadioCircularVisionRadius: {
      fields: ['radioRange'],
      operation: 'progressive',
   },
}

export default CREW_MODIFIER_CONFIG
