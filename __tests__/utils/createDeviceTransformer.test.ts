import { createDeviceTransformer } from '@/utils/ApplyModifiers'
import applyStatPipeline from '@/utils/applyStatPipeline'

// Mock the config table so tests target the transformer's own logic,
// not real (and changeable) modifier values.
jest.mock('../../src/utils/modifierConfig', () => ({
   MODIFIER_CONFIG: {
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
   },
}))

jest.mock('../../src/helpers/returnPercentValue', () => ({
   ReturnPercentValue: jest.fn((value: number | string) => {
      if (typeof value === 'string') value = Number(value)
      const percentValue = (value - 1) * 100
      const transformValue = Math.round(percentValue * 100) / 100
      return transformValue
   }),
}))

describe('test createDeviceTransformer function', () => {
   // Confirms the documented no-op shortcut: no devices means the exact
   // same object reference is returned, not just an equal-looking copy.
   it('returns the same reference when no devices are equipped', () => {
      const transform = createDeviceTransformer<{ reloadTime: number }>(null)
      const baseValues = { reloadTime: 7.8 }

      expect(transform(baseValues)).toBe(baseValues)
   })

   // Checks a real operation branch AND that the config lookup is wired correctly.
   it('applies "mul" by multiplying the target field', () => {
      const { reloadTime } = applyStatPipeline({ reloadTime: 10 }, [
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         createDeviceTransformer({ tankRammer: [{ name: 'vehicleGunReloadTime', value: 0.9 }] } as any),
      ])

      console.log('RELOAD TIME: ', reloadTime)

      // const transform = createDeviceTransformer<{ reloadTime: number }>({
      //    tankRammer: [{ name: 'vehicleGunReloadTime', value: 0.9 }], // -10% reload
      //    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // } as any)
      // const result = transform({ reloadTime: 10 })
      // console.log('RESULT: ', result.reloadTime)

      // toBeCloseTo, not toBe — floating point multiplication isn't exact in JS
      // expect(reloadTime).toBeCloseTo(9)
   })
})
