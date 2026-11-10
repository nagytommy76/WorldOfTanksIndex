import { formatKpi } from '@/VehicleDetails/Modules/ModuleSelect/Components/FieldModifications/Helpers/formatKpi'

describe('formatKpi', () => {
   it('should show a multiplier as a signed percentage', () => {
      expect(formatKpi({ operation: 'mul', name: 'vehicleEnginePower', value: 1.03 })).toEqual({
         amount: '+3%',
         text: ' to engine power',
         isBeneficial: true,
      })
   })

   it('should treat a shorter reload time as beneficial', () => {
      expect(formatKpi({ operation: 'mul', name: 'vehicleGunReloadTime', value: 0.97 })).toEqual({
         amount: '-3%',
         text: ' to reload time',
         isBeneficial: true,
      })
   })

   it('should show an additive value in the unit of the stat', () => {
      expect(formatKpi({ operation: 'add', name: 'vehicleForwardMaxSpeed', value: -2 })).toEqual({
         amount: '-2 km/h',
         text: ' to top forward speed',
         isBeneficial: false,
      })
   })

   it('should treat more crew protection as beneficial', () => {
      expect(formatKpi({ operation: 'mul', name: 'crewHitChance', value: 1.2 })).toEqual({
         amount: '+20%',
         text: ' to crew protection from injuries',
         isBeneficial: true,
      })
   })

   it('should treat more dispersion as a drawback', () => {
      const kpi = formatKpi({ operation: 'mul', name: 'vehicleGunShotDispersionAfterShot', value: 1.15 })
      expect(kpi).toEqual({ amount: '+15%', text: ' to dispersion after firing', isBeneficial: false })
   })

   it('should fall back to the stat name when it has no description', () => {
      expect(formatKpi({ operation: 'mul', name: 'unknownStat', value: 0.95 })).toEqual({
         amount: '-5%',
         text: ' unknownStat',
         isBeneficial: false,
      })
   })
})
