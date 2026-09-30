import CREW_SKILLS_CONFIG from './crewSkillConfig'
import Commander from '@/CrewContext/Classes/Commander'

import type { CrewMembersType } from '@/CrewContext/Types'
import type { StatTransformer } from './applyStatPipeline'

import ReturnCrewSkillsParameters from './helpers/ReturnCrewSkillsParameters'

/**
 * 
 * @param commander - COMMANDER 
 * @param crewMembers - Crew members (radioman, driver, gunner, etc..)
 * @param calculateSituational - situational perks
 * @returns calculatedSkillResult - 
 * @example
 *    Recons base bonus = 2%
 * 
      baseBonus         = 2% view range
      effectiveQual     = 110%
      scaledBonus       = 2% × (110 / 100) = 2.2%

      Applied to view range:
      406.77m × (1 + 0.022) = 406.71 × 1.022 ≈ 415.71894m ≈ 415.72m
 */
export default function createCrewSkillsTransformer<T extends Record<string, number>>(
   commander: Commander,
   crewMembers: CrewMembersType | undefined,
   calculateSituational: boolean = false,
   hasClip: boolean = false,
): StatTransformer<T> {
   if (!crewMembers)
      return (baseValues: T): T => {
         return baseValues
      }

   return (baseValues: T): T => {
      let calculatedSkillResult = { ...baseValues }

      calculatedSkillResult = ReturnCrewSkillsParameters(
         calculatedSkillResult,
         commander,
         calculateSituational,
         hasClip,
      )

      for (const member of Object.values(crewMembers)) {
         if (!member) continue
         calculatedSkillResult = ReturnCrewSkillsParameters(
            calculatedSkillResult,
            member,
            calculateSituational,
            hasClip,
         )
      }
      return calculatedSkillResult
   }
}

/**
 *
 * @param commander COMMANDER
 * @returns camouflageStillMovingValues
 * @description The Natural Cover directive gives +10% to the amount of camo value the crew perk is giving.
 * 10% boost to the camouflage skill itself. So the fully trained skill instead of boosting the the camo by 80%, it boosts it by 88%
 * The addidtional number is: 0.08047
 *
 */
export function createConcealmentSkillTransformer<T extends Record<string, number>>(
   commander: Commander,
): StatTransformer<T> {
   return (camouflageStillMovingValues: T): T => {
      const appliedCrewSkills = commander.appliedCrewSkills
      const appliedCrewBattleBoosters = commander.appliedCrewBattleBoosters

      const scaledBonus = 0.8047 * (commander.efficiencyLevel / 100) + 1
      // If only natural cover directive is active -> it doesn't get crew efficiency bonus != scales
      const bonusWithoutEfficiency = 1.7542
      const config = CREW_SKILLS_CONFIG['camouflage']['maskingFactor']

      switch (true) {
         // We have only crew booster naturalCover
         case appliedCrewBattleBoosters?.has('naturalCover') && !appliedCrewSkills?.has('camouflage'):
            for (const field of config.fields) {
               ;(camouflageStillMovingValues[field] as number) *= bonusWithoutEfficiency
            }
            break
         // We have only crew skill camouflage and NOT naturalCover
         case appliedCrewSkills?.has('camouflage') && !appliedCrewBattleBoosters?.has('naturalCover'):
            for (const field of config.fields) {
               ;(camouflageStillMovingValues[field] as number) *= scaledBonus
            }
            break
         // We have BOTH crew skill camouflage and naturalCover BOOSTER
         case appliedCrewSkills?.has('camouflage') && appliedCrewBattleBoosters?.has('naturalCover'):
            const scaledNaturalCover = 0.08047 * (commander.efficiencyLevel / 100) + 1

            for (const field of config.fields) {
               ;(camouflageStillMovingValues[field] as number) *= scaledBonus + scaledNaturalCover
            }
            break
         default:
            return camouflageStillMovingValues
      }

      return camouflageStillMovingValues
   }
}
