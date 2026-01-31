import {
   returnAutoReloadDPM,
   returnClipReloadTime,
   returnDPM,
} from '@/VehicleDetails/Modules/DetailsTable/Firepower/Includes/helper'

describe('Calculate DPM values', () => {
   it('should calculate standard DPM correctly | MAUS |', () => {
      const DPM = returnDPM(13.3, 490)
      expect(DPM).toBeCloseTo(2211, 0)
   })
   it('should calculate Autoreload (Itailan tanks) DPM correctly | Rinoceronte |', () => {
      const autoreload = {
         reloadTime: [15.7, 17, 20],
         boostFraction: 0.5,
         boostStartTime: 1,
         boostResidueTime: 2,
      }
      const clipDamage = 1470
      const AutoreloadDPM = returnAutoReloadDPM(autoreload, clipDamage)
      expect(AutoreloadDPM).toBeCloseTo(1674, 0)
   })
   it('should calculate Clip DPM correctly | T57 Heavy |', () => {
      const reloadTime = 25
      const clip = {
         count: 4,
         rate: 30,
      }
      const clipDamage = 1600

      const ClipDPM = returnClipReloadTime(reloadTime, clip, clipDamage, 2)
      expect(ClipDPM).toBeCloseTo(3097, 0)
   })
})
