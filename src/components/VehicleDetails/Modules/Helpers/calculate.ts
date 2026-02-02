/**
 *
 * @param traverseSpeed the given traverse speed of the vehicle in degrees per second
 * @param hardTerrainResistance the terrain resistance of hard terrain.
 * @param targetTerrainResistance the terrain resistance of the target terrain (hard/medium/soft).
 * @param crewModifier By default 0.95, Without any crew skills and perks. (RAW VALUE)
 * @returns number - The effective traverse speed in degrees per second.
 */
export function calculateEffectiveTraverseSpeed(
   traverseSpeed: number,
   hardTerrainResistance: number,
   targetTerrainResistance: number,
   crewModifier: number = 0.95,
) {
   return traverseSpeed * (hardTerrainResistance / targetTerrainResistance) * crewModifier
}

/**
 *
 * @param horsePower engine's horsepower
 * @param weight vehicle's totalWeight / 1000 -> in tonns
 * @param terrainResistance Target terrain resistance (hard/medium/soft)
 * @param topSpeed speed limit (forward) of the vehicle
 * @returns Effective Top Speed in km/h
 */
export function calculateEffectiveTopSpeed(
   horsePower: number,
   weight: number,
   terrainResistance: number,
   topSpeed: number,
) {
   const hpPerTons = horsePower / weight
   const effectiveHpPerTons = hpPerTons / terrainResistance
   const effectiveTopSpeed = 3.649 * effectiveHpPerTons

   return Math.min(effectiveTopSpeed, topSpeed)
}

/**
 * Calculates the camouflage values for a vehicle.
 * @param camoValue Camo value of the Moving or Stationary state.
 * @param firePenalty Gun's invisibilityFactorAtShot multiplier. Default is 1 (no penalty).
 * @param camouflageBonus Additional camouflage bonus from skills, perks, equipment. Default is 0.
 * @returns The calculated camouflage value as a percentage.
 */
export function calculateCamoValues(camoValue: number, firePenalty: number = 1, camouflageBonus: number = 0) {
   const calculatedCamo = camoValue * 0.57 * 100 + camouflageBonus * 100
   return calculatedCamo * firePenalty
}
