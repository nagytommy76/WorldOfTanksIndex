export function calculateEffectiveTraverseSpeed(
   traverseSpeed: number,
   hardTerrainResistance: number,
   targetTerrainResistance: number,
   crewModifier: number
) {
   return traverseSpeed * (hardTerrainResistance / targetTerrainResistance) * crewModifier
}

export function calculateEffectiveTopSpeed(
   horsePower: number,
   weight: number,
   terrainResistance: number,
   topSpeed: number
) {
   const hpPerTons = horsePower / weight
   const effectiveHpPerTons = hpPerTons / terrainResistance
   const effectiveTopSpeed = 3.649 * effectiveHpPerTons

   return Math.min(effectiveTopSpeed, topSpeed)
}

export function calculateCamoValues(camoValue: number, firePenalty: number = 1, camouflageBonus: number = 0) {
   const calculatedCamo = camoValue * 0.57 * 100 + camouflageBonus * 100
   return calculatedCamo * firePenalty
}
