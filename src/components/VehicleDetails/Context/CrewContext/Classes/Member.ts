import type { MeasureType } from '@/Classes/CrewSkills'

export default class Member {
   /**
    * @description The crew member's efficiency level, which is used in the crew formula to compute actual stat values. Starts at 100% and is modified by crew perks (e.g. Brothers in Arms) and equipment (e.g. Improved Ventilation).
    */
   efficiencyLevel: number
   /**
    * @description e.g improvedVentillation gives 5% extra to efficiency level of the crew members, BIA gives +5%
    */
   appliedCrewModifiers:
      | Map<
           string,
           {
              value: number
              paramName: string
           }
        >
      | undefined = undefined
   /**
    * @description e.g: driver_motorExpert: paramName: "vehPenaltyForDamagedEngine"
    */
   appliedCrewSkills:
      | Map<
           string,
           {
              situationalParam: boolean
              value: number
              paramName: string
              measureType: MeasureType
           }[]
        >
      | undefined = undefined

   private static readonly BASE_TRAINING = 100

   constructor() {
      this.efficiencyLevel = Member.BASE_TRAINING
   }

   setAppliedCrewSkill(
      skillName: string,
      crewSkillModifiers: {
         situationalParam: boolean
         value: number
         paramName: string
         measureType: MeasureType
      }[],
   ) {
      if (this.appliedCrewSkills === undefined) this.appliedCrewSkills = new Map()
      this.appliedCrewSkills?.set(skillName, crewSkillModifiers)
   }

   setAppliedCrewModifier(modifier: { name: string; paramName: string; value: number }) {
      if (!this.appliedCrewModifiers) this.appliedCrewModifiers = new Map()
      this.appliedCrewModifiers.set(modifier.name, {
         paramName: modifier.paramName,
         value: modifier.value,
      })
      this.efficiencyLevel = this.computeEfficiencyLevel()
   }
   clearAppliedCrewModifiers() {
      if (!this.appliedCrewModifiers) return
      this.appliedCrewModifiers.clear()
      this.efficiencyLevel = Member.BASE_TRAINING
   }
   removeAppliedCrewModifier(modifierName: string) {
      if (!this.appliedCrewModifiers) return
      this.appliedCrewModifiers.delete(modifierName)
      this.efficiencyLevel = this.computeEfficiencyLevel()
   }
   removeAppliedCrewSkill(crewSkillName: string) {
      if (!this.appliedCrewSkills) return
      this.appliedCrewSkills.delete(crewSkillName)
   }

   /**
    * @description Computes the effective efficiency level for this crew member.
    *
    * Rules:
    *  - Ventilation bonus is applied to base BEFORE commander bonus
    *  - Commander does NOT receive their own +10% bonus
    *  - All other members DO receive the commander +10% bonus
    *
    *
    * @example
    * // Without ventilation:
    * // commander → 100 * (1 + 0)       = 100
    * // loader    → 100 * (1 + 0) * 1.1 = 110
    *
    * effectiveSkill = (primarySkill + ventilationBonus) + ((commanderSkill + ventilationBonus) * 0.1)
    * (100 + 5) + ((100 + 5) * 0.1) = 105 + 10.5 = 115.5%
    *
    * // With Improved Ventilation (+5%):
    * // commander → 100 * (1 + 0.05)       = 105
    * // loader    → 100 * (1 + 0.05) * 1.1 = 115.5
    */
   computeEfficiencyLevel(): number {
      let boostedBase = Member.BASE_TRAINING

      if (this.appliedCrewModifiers) {
         let testing = 0
         this.appliedCrewModifiers.forEach((modifier) => {
            console.log('FROM MEMBER CLASS: MODIFIER: ', modifier)
            testing = modifier.value - 1 + testing
         })
         testing += 1
         boostedBase *= testing
         console.log('FROM MEMBER CLASS: BOOSTED BASE: ', boostedBase)
      }
      return parseFloat(boostedBase.toFixed(4))
   }
}
