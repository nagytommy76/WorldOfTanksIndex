import createBaseFieldModTransformer, {
   createPairFieldModTransformer,
} from '@/src/utils/FieldModifications/ApplyFieldModifications'

describe('createBaseFieldModTransformer', () => {
   it('should return the same values when nothing is applied', () => {
      const values = { reloadTime: 10 }
      expect(createBaseFieldModTransformer(null)(values)).toBe(values)
      expect(createBaseFieldModTransformer({})(values)).toBe(values)
   })

   it('should multiply the stat by a mul KPI', () => {
      const transform = createBaseFieldModTransformer({
         vehicleGunReloadTime: [{ name: 'vehicleGunReloadTime', operation: 'mul', value: 0.97 }],
      })
      expect(transform({ reloadTime: 10 }).reloadTime).toBeCloseTo(9.7)
   })

   it('should apply a KPI to every field of its config', () => {
      const transform = createBaseFieldModTransformer({
         vehicleChassisStrength: [{ name: 'vehicleChassisStrength', operation: 'mul', value: 1.15 }],
      })
      const result = transform({ chassisHealth: 200, chassisRegenHealth: 100 })
      expect(result.chassisHealth).toBeCloseTo(230)
      expect(result.chassisRegenHealth).toBeCloseTo(115)
   })

   it('should add the percentage points of a mulAdd KPI', () => {
      const transform = createBaseFieldModTransformer({
         vehicleCamouflage: [{ name: 'vehicleCamouflage', operation: 'mul', value: 1.02 }],
      })
      expect(transform({ camouflageStill: 20, camouflageMoving: 10 })).toEqual({
         camouflageStill: 22,
         camouflageMoving: 12,
      })
   })

   it('should invert the factor of a mulSubtract KPI', () => {
      const transform = createBaseFieldModTransformer({
         vehicleSpeedGain: [{ name: 'vehicleSpeedGain', operation: 'mul', value: 1.03 }],
      })
      expect(transform({ hardTerrainResistance: 1 }).hardTerrainResistance).toBeCloseTo(0.97)
   })

   it('should add the flat term of an add KPI', () => {
      const transform = createBaseFieldModTransformer({
         vehicleForwardMaxSpeed: [{ name: 'vehicleForwardMaxSpeed', operation: 'add', value: 5 }],
      })
      expect(transform({ forwardSpeed: 60 })).toEqual({ forwardSpeed: 65 })
   })

   it('should apply the mul and the add KPI of the same name', () => {
      const transform = createBaseFieldModTransformer({
         vehicleForwardMaxSpeed: [
            { name: 'vehicleForwardMaxSpeed', operation: 'mul', value: 1.1 },
            { name: 'vehicleForwardMaxSpeed', operation: 'add', value: 2 },
         ],
      })
      expect(transform({ forwardSpeed: 60 }).forwardSpeed).toBeCloseTo(68)
   })

   it('should leave the stats without a KPI and the unknown KPIs alone', () => {
      const transform = createBaseFieldModTransformer({
         crewHitChance: [{ name: 'crewHitChance', operation: 'mul', value: 1.2 }],
         vehicleGunReloadTime: [{ name: 'vehicleGunReloadTime', operation: 'mul', value: 0.5 }],
      })
      expect(transform({ maxHealth: 1000, reloadTime: 10 })).toEqual({ maxHealth: 1000, reloadTime: 5 })
   })

   it('should not change the values it reads', () => {
      const values = { reloadTime: 10 }
      createBaseFieldModTransformer({
         vehicleGunReloadTime: [{ name: 'vehicleGunReloadTime', operation: 'mul', value: 0.5 }],
      })(values)
      expect(values).toEqual({ reloadTime: 10 })
   })
})

describe('createPairFieldModTransformer', () => {
   it('should return the same values when no pair option is chosen', () => {
      const values = { enginePower: 500 }
      expect(createPairFieldModTransformer(null)(values)).toBe(values)
      expect(createPairFieldModTransformer({})(values)).toBe(values)
   })

   it('should apply every KPI of the chosen option', () => {
      // improvedEnginePower of the scout tree
      const transform = createPairFieldModTransformer({
         2: {
            vehicleEnginePower: [{ name: 'vehicleEnginePower', operation: 'mul', value: 1.03 }],
            vehicleForwardMaxSpeed: [{ name: 'vehicleForwardMaxSpeed', operation: 'add', value: -2 }],
         },
      })
      const result = transform({ enginePower: 500, forwardSpeed: 60 })
      expect(result.enginePower).toBeCloseTo(515)
      expect(result.forwardSpeed).toBe(58)
   })

   it('should apply the chosen options of every level, also after an empty level', () => {
      const transform = createPairFieldModTransformer({
         2: { vehicleForwardMaxSpeed: [{ name: 'vehicleForwardMaxSpeed', operation: 'add', value: -2 }] },
         3: undefined,
         4: { vehicleBackwardMaxSpeed: [{ name: 'vehicleBackwardMaxSpeed', operation: 'add', value: 3 }] },
      })
      expect(transform({ forwardSpeed: 60, backwardSpeed: 20 })).toEqual({ forwardSpeed: 58, backwardSpeed: 23 })
   })
})
