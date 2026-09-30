import type { ICrewSkillConfig } from '../crewSkillConfig'
import CrewMember from '@/CrewContext/Classes/Crew'
import Commander from '@/CrewContext/Classes/Commander'

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
   }
}
