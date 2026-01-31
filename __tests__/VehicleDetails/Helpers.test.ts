import {
   calculateEffectiveTraverseSpeed,
   calculateEffectiveTopSpeed,
   calculateCamoValues,
} from '@/VehicleDetails/Modules/Helpers/calculate'

describe('Calculate Effective Traverse Speed | Hirschkäfer |', () => {
   test('calculateEffectiveTraverseSpeed returns correct HARD terrain', () => {
      const effectiveTraverseSpeed = calculateEffectiveTraverseSpeed(26, 1.1, 1.1, 0.95)
      expect(effectiveTraverseSpeed).toBeCloseTo(24.7)
   })
   test('calculateEffectiveTraverseSpeed returns correct MEDIUM terrain', () => {
      const effectiveTraverseSpeed = calculateEffectiveTraverseSpeed(26, 1.1, 1.2, 0.95)
      expect(effectiveTraverseSpeed).toBeCloseTo(22.64)
   })
   test('calculateEffectiveTraverseSpeed returns correct SOFT terrain', () => {
      const effectiveTraverseSpeed = calculateEffectiveTraverseSpeed(26, 1.1, 2, 0.95)
      expect(effectiveTraverseSpeed).toBeCloseTo(13.59)
   })
})

describe('Calculate Effective Top Speed function | Taschenratte |', () => {
   test('calculateEffectiveTopSpeed returns correct HARD terrain', () => {
      const effectiveTopSpeed = calculateEffectiveTopSpeed(1900, 200, 1.1, 18)
      expect(effectiveTopSpeed).toBeCloseTo(18)
   })
   test('calculateEffectiveTopSpeed returns correct MEDIUM terrain', () => {
      const effectiveTopSpeed = calculateEffectiveTopSpeed(1900, 200, 1.3, 18)
      expect(effectiveTopSpeed).toBeCloseTo(18)
   })
   test('calculateEffectiveTopSpeed returns correct SOFT terrain', () => {
      const effectiveTopSpeed = calculateEffectiveTopSpeed(1900, 200, 2.1, 18)
      expect(effectiveTopSpeed).toBeCloseTo(16.51)
   })
})

describe('Calculate Camo values | Borkenkäfer |', () => {
   test('calculateCamoValues returns STATIONARY camo', () => {
      const camoValue = calculateCamoValues(0.278)
      expect(camoValue).toBeCloseTo(15.85)
   })
   test('calculateCamoValues returns STATIONARY/AFTER_FIRE camo', () => {
      const camoValue = calculateCamoValues(0.278, 0.198)
      expect(camoValue).toBeCloseTo(3.14)
   })
   test('calculateCamoValues returns MOVING camo', () => {
      const camoValue = calculateCamoValues(0.278)
      expect(camoValue).toBeCloseTo(15.85)
   })
   test('calculateCamoValues returns MOVING/AFTER_FIRE camo', () => {
      const camoValue = calculateCamoValues(0.278, 0.198)
      expect(camoValue).toBeCloseTo(3.14)
   })
})
