import type { ICrewSkillConfig } from '../crewSkillConfig'
import CrewMember from '@/CrewContext/Classes/Crew'
import Commander from '@/CrewContext/Classes/Commander'

type RepairAccumulator = { base: number; bonusSum: number; count: number }
/**
 * Repairs is a common skill, so the vehicle gets the AVERAGE of the crew's bonuses.
 * This function runs once per tankman on the same result object, so the running sum is kept here
 * (keyed by that object, so every pipeline run starts fresh and nothing leaks).
 */
const repairAccumulators = new WeakMap<object, Map<string, RepairAccumulator>>()

export default function ReturnCalculatedSkillResult<T extends Record<string, number>>(
   calculatedSkillResult: T,
   foundConfigSkill: ICrewSkillConfig,
   crewMember: CrewMember | Commander,
   skillValue: number,
   key: string,
   skillName: string,
) {
   switch (foundConfigSkill.measureType) {
      case 'percents':
         let scaledBonus = 0
         if (skillValue > 0 && skillValue <= 1) {
            scaledBonus = skillValue * (crewMember.efficiencyLevel / 100)
         } else {
            scaledBonus = (skillValue - 1) * (crewMember.efficiencyLevel / 100) + 1
         }
         /**
          * In this case I check if a crewMember is !Commander
          * and isCommanderBonusApplied is true (+10% bonus switch turned on)
          */
         switch (foundConfigSkill.operation) {
            case 'degressive':
               if (scaledBonus > 1) {
                  scaledBonus = scaledBonus - 1
               }
               const substract = (calculatedSkillResult[key] as number) * scaledBonus
               ;(calculatedSkillResult[key] as number) -= substract
               break
            case 'progressive':
               ;(calculatedSkillResult[key] as number) *= scaledBonus
               break
         }
         break
      case 'mph':
         const scaledBonus1 = skillValue * 100 * (crewMember.efficiencyLevel / 100)
         ;(calculatedSkillResult[key] as number) += scaledBonus1
         break
      case 'seconds':
         const scaledBonus2 = skillValue * (crewMember.efficiencyLevel / 100)
         if (foundConfigSkill.operation === 'degressive') {
            ;(calculatedSkillResult[key] as number) = (calculatedSkillResult[key] as number) - scaledBonus2
         } else {
            ;(calculatedSkillResult[key] as number) = (calculatedSkillResult[key] as number) + scaledBonus2
         }
         break
      case 'add':
         /**
          * Armorer skill improves the minimum & max potential dmg, but the avg value stays the same
          */
         if (skillName === 'gunner_armorer') break
         const scaledBonus3 = (skillValue - 1) * (crewMember.efficiencyLevel / 100) + 1
         const addValue = scaledBonus3 - 1
         ;(calculatedSkillResult[key] as number) += addValue
         break
      case 'subtract':
         const scaledBonus4 = (skillValue - 1) * (crewMember.efficiencyLevel / 100) + 1
         const subtractValue = (scaledBonus4 - 1) * calculatedSkillResult[key]
         ;(calculatedSkillResult[key] as number) -= subtractValue
         break
      case 'repair': {
         /**
          * "+80% repair SPEED" means time / 1.8 (NOT time * 0.2).
          * Every tankman's bonus is scaled by his efficiency, then averaged over the crew:
          *    time = base / (1 + averageBonus)
          * The value is recomputed from the pre-skill base on every call, so after the last tankman it is exact.
          * @example T100LT (commander 100%, driver 110%, gunner 110%)
          *    base  = 4.5714 / 0.57                      = 8.02s
          *    bonus = (0.8 * 1.0 + 0.8 * 1.1 + 0.8 * 1.1) / 3 = 0.8533
          *    time  = 8.02 / 1.8533                      ≈ 4.33s
          */
         if (typeof calculatedSkillResult[key] !== 'number') break

         let fields = repairAccumulators.get(calculatedSkillResult)
         if (!fields) {
            fields = new Map()
            repairAccumulators.set(calculatedSkillResult, fields)
         }
         const accumulator = fields.get(key) ?? { base: calculatedSkillResult[key], bonusSum: 0, count: 0 }
         accumulator.bonusSum += (skillValue - 1) * (crewMember.efficiencyLevel / 100)
         accumulator.count += 1
         fields.set(key, accumulator)

         const averageBonus = accumulator.bonusSum / accumulator.count
         ;(calculatedSkillResult[key] as number) = accumulator.base / (1 + averageBonus)
         break
      }
   }
}
