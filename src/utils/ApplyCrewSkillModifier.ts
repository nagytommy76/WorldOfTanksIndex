import CREW_SKILLS_MODIFIER_CONFIG from './crewSkillConfig'
import CrewMember from '@/CrewContext/Classes/Crew'
import Commander from '@/CrewContext/Classes/Commander'

import type { StatTransformer } from './applyStatPipeline'
/**
 * 
 * @param crewMember 
 * @returns calculatedSkillResult - 
 * @example
 *    Recon's base bonus = 2%
 * 
      baseBonus         = 2% view range
      effectiveQual     = 110%
      scaledBonus       = 2% × (110 / 100) = 2.2%

      Applied to view range:
      406.77m × (1 + 0.022) = 406.71 × 1.022 ≈ 415.71894m ≈ 415.72m
 */
export default function createCrewSkillsTransformer<T extends Record<string, number>>(
   crewMember: CrewMember | Commander | undefined,
   calculateSituational: boolean = false,
): StatTransformer<T> {
   if (!crewMember || crewMember.appliedCrewSkills === undefined)
      return (baseValues: T): T => {
         return baseValues
      }
   return (baseValues: T): T => {
      const calculatedSkillResult = { ...baseValues }
      const appliedCrewSkills = crewMember.appliedCrewSkills
      if (appliedCrewSkills === undefined) return calculatedSkillResult

      for (const [skillName, skills] of appliedCrewSkills) {
         for (const skill of skills) {
            const config = CREW_SKILLS_MODIFIER_CONFIG[skill.paramName]
            if (!config) continue
            if (!calculateSituational && config.isSituational) continue

            for (const configField of config.fields) {
               if (!(configField in calculatedSkillResult)) continue
               const skillValue = Math.abs(skill.value)

               const key = configField as keyof T

               switch (config.measureType) {
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
                     switch (config.operation) {
                        case 'degressive':
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
                     ;(calculatedSkillResult[key] as number) =
                        (calculatedSkillResult[key] as number) + scaledBonus2
                     break
                  case 'add':
                     const addValue = skillValue - 1
                     ;(calculatedSkillResult[key] as number) += addValue
                     break
               }
            }
         }
      }

      return calculatedSkillResult
   }
}

export function createConcealmentSkillTransformer<T extends Record<string, number>>(
   commander: Commander,
): StatTransformer<T> {
   return (camouflageStillMovingValues: T): T => {
      const appliedCrewSkills = commander.appliedCrewSkills
      // Making sure it only works if camouflage skill is set
      if (!appliedCrewSkills?.has('camouflage')) return camouflageStillMovingValues
      if (appliedCrewSkills === undefined || appliedCrewSkills.size === 0) return camouflageStillMovingValues

      const scaledBonus = 0.8047 * (commander.efficiencyLevel / 100) + 1

      const config = CREW_SKILLS_MODIFIER_CONFIG['maskingFactor']

      for (const field of config.fields) {
         ;(camouflageStillMovingValues[field] as number) *= scaledBonus
      }

      return camouflageStillMovingValues
   }
}
