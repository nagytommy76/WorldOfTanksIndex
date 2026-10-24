import type { MeasureType } from '@/Classes/CrewSkills'
import type { CrewSkillModifiers } from '../Types'

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
              situationalParam: boolean
           }
        >
      | undefined = undefined
   /**
    * @description e.g: driver_motorExpert: paramName: "vehPenaltyForDamagedEngine"
    */
   appliedCrewSkills: Map<string, CrewSkillModifiers[]> | undefined = undefined

   /**
    * @description Applied Crew skill battle boosters: gunner_smoothTurret -> Steady Hand
    */
   appliedCrewBattleBoosters:
      | Map<
           string,
           {
              crewSkillBoosterModifiers: CrewSkillModifiers[]

              crewSkillModifier: {
                 boostSkill: number
                 mul: number
              }
           }
        >
      | undefined

   /**
    * @description If false, applied crew modifiers with situationalParam
    * (e.g. commander_staySharp) are left out of the efficiency level.
    * Controlled by the "Active Situational" switch
    */
   isSituationalActive: boolean = false

   private static readonly BASE_TRAINING = 100

   constructor() {
      this.efficiencyLevel = Member.BASE_TRAINING
   }

   setAppliedCrewModifier(modifier: {
      name: string
      paramName: string
      value: number
      situationalParam?: boolean
   }) {
      if (!this.appliedCrewModifiers) this.appliedCrewModifiers = new Map()
      this.appliedCrewModifiers.set(modifier.name, {
         paramName: modifier.paramName,
         value: modifier.value,
         situationalParam: modifier.situationalParam || false,
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
   setSituationalActive(isActive: boolean) {
      this.isSituationalActive = isActive
      this.efficiencyLevel = this.computeEfficiencyLevel()
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
      this.appliedCrewSkills.set(skillName, crewSkillModifiers)
   }
   removeAppliedCrewSkill(crewSkillName: string) {
      if (!this.appliedCrewSkills) return
      this.appliedCrewSkills.delete(crewSkillName)
   }
   clearAppliedCrewSkills() {
      if (!this.appliedCrewSkills) return
      this.appliedCrewSkills.clear()
   }

   setAppliedCrewBattleBoosters(
      boosterName: string,
      crewSkillModifier: {
         boostSkill: number
         mul: number
      },
      crewSkillBoosterModifiers: {
         situationalParam: boolean
         value: number
         paramName: string
         measureType: MeasureType
      }[],
   ) {
      if (this.appliedCrewBattleBoosters === undefined) this.appliedCrewBattleBoosters = new Map()
      this.appliedCrewBattleBoosters.set(boosterName, {
         crewSkillModifier,
         crewSkillBoosterModifiers,
      })
   }
   removeAppliedSkillBooster(skillName: string) {
      if (!this.appliedCrewBattleBoosters) return
      this.appliedCrewBattleBoosters.delete(skillName)
   }
   clearAppliedSkillBooster() {
      if (!this.appliedCrewBattleBoosters) return
      this.appliedCrewBattleBoosters.clear()
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
    *
    * Situational modifiers (e.g. commander_staySharp) only count when isSituationalActive is true.
    */
   computeEfficiencyLevel(): number {
      let boostedBase = Member.BASE_TRAINING

      if (this.appliedCrewModifiers) {
         let totalBonus = 0
         this.appliedCrewModifiers.forEach((modifier) => {
            if (modifier.situationalParam && !this.isSituationalActive) return
            totalBonus = modifier.value - 1 + totalBonus
         })
         totalBonus += 1
         boostedBase *= totalBonus
      }
      return parseFloat(boostedBase.toFixed(4))
   }
}
