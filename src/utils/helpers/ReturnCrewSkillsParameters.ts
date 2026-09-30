import CrewMember from '@/CrewContext/Classes/Crew'
import Commander from '@/CrewContext/Classes/Commander'

import CalculateOnlyCrewBooster from './CalculateOnlyCrewBooster'
import CalculateOnlyCrewSkill from './CalculateOnlyCrewSkill'
import CalculateCrewSkillAndBooster from './CalculateCrewSkillAndBooster'

export default function ReturnCrewSkillsParameters<T extends Record<string, number>>(
   calculatedSkillResult: T,
   crewMember: CrewMember | Commander,
   calculateSituational: boolean = false,
   hasClip: boolean = false,
) {
   const appliedCrewSkills = crewMember.appliedCrewSkills
   const appliedCrewSBoosters = crewMember.appliedCrewBattleBoosters

   switch (true) {
      // We only have crew booster, I need to add the crew skill from booster:
      // crewSkillBoosterModifiers so it's boostSkill
      case (appliedCrewSkills === undefined || appliedCrewSkills.size === 0) &&
         appliedCrewSBoosters !== undefined &&
         appliedCrewSBoosters.size !== 0:
         CalculateOnlyCrewBooster(appliedCrewSBoosters, calculatedSkillResult, crewMember)

         break
      // We only have the crew skill activated, NOT CREW BOOSTER
      case (appliedCrewSBoosters === undefined || appliedCrewSBoosters.size === 0) &&
         appliedCrewSkills !== undefined &&
         appliedCrewSkills.size !== 0:
         CalculateOnlyCrewSkill(
            appliedCrewSkills,
            calculatedSkillResult,
            crewMember,
            calculateSituational,
            hasClip,
         )
         break
      // WE HAVE BOTH CREW BOOSTER AND CREW SKILLS.
      // I need to modify the value of the crew skill with the mul from appliedCrewBattleBoosters
      case appliedCrewSBoosters !== undefined &&
         appliedCrewSBoosters.size !== 0 &&
         appliedCrewSkills !== undefined &&
         appliedCrewSkills.size !== 0:
         CalculateCrewSkillAndBooster(
            appliedCrewSkills,
            calculatedSkillResult,
            crewMember,
            calculateSituational,
            hasClip,
         )

         break
      // WE HAVE NOTHING
      default:
         return calculatedSkillResult
   }
   if (appliedCrewSkills === undefined) {
      return calculatedSkillResult
   }
   return calculatedSkillResult
}
