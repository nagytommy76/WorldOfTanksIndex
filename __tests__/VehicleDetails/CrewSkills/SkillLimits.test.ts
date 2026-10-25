import { isRoleLimitReached } from '@/src/components/VehicleDetails/Modules/ModuleSelect/Components/CrewSkills/Includes/Hooks/Helpers/SkillLimits'

describe('isRoleLimitReached', () => {
   it('should count common skills for a primary role', () => {
      expect(isRoleLimitReached('gunner', 4, false, 2, 4)).toBe(true)
      expect(isRoleLimitReached('gunner', 3, false, 2, 3)).toBe(false)
   })

   it('should exclude common skills for a secondary role', () => {
      expect(isRoleLimitReached('loader', 3, true, 0, 0)).toBe(true)
      expect(isRoleLimitReached('loader', 2, true, 3, 3)).toBe(false)
   })

   it('should block common skills when any primary role is full', () => {
      expect(isRoleLimitReached('common', 1, false, 1, 5)).toBe(true)
      expect(isRoleLimitReached('common', 1, false, 1, 4)).toBe(false)
   })
})
