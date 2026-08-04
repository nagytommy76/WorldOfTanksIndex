import { createDeviceTransformer } from '@/utils/ApplyModifiers'
import MODIFIER_CONFIG from '@/utils/modifierConfig'

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

describe('createDeviceTransformer', () => {
   it('', () => {})
})
