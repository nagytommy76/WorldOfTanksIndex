// https://worldoftanks.fandom.com/wiki/Crew#Proficiency

import type { MeasureType, IRolesNonCommander } from '@/Classes/CrewSkills'
import affectedFields from './Roles'
import Member from './Member'

export default class CrewMember extends Member {
   /**
    * @param primaryRole - The crew member's main role (commander, gunner, driver, loader, radioman)
    */
   primaryRole: IRolesNonCommander
   /**
    * @param primaryRole - The crew member's secondary role (commander, gunner, driver, loader, radioman)
    */
   secondaryRole: IRolesNonCommander[]

   /**
    * @description Which vehicle parameters this crew member affects, used to determine which stats to apply the crew formula to. E.g. commander affects circular vision radius, driver affects traverse speed and ground rotation speed, etc.
    */
   affectedVehicleStats: string[] // e.g. aiming time, reload time
   /**
    * @description If commander bonus ( +10% ) is applied to crew members
    * used in CrewSwitch component
    */
   isCommanderBonusApplied: boolean = true
   /**
    * @description e.g. ventilation, brother in arms, extra combat ration
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

   constructor({
      primaryRole,
      secondaryRole,
   }: {
      primaryRole: IRolesNonCommander
      secondaryRole: IRolesNonCommander[]
   }) {
      super()
      this.primaryRole = primaryRole
      this.secondaryRole = secondaryRole

      this.affectedVehicleStats = this.setAffectedVehicleStats()
   }

   setIsCommanderBonusApplied(isBonusActive: boolean = false) {
      this.isCommanderBonusApplied = isBonusActive
   }

   private setAffectedVehicleStats() {
      let affectedStats: string[] = []
      affectedStats = affectedFields[this.primaryRole]
      this.secondaryRole.map((role) => {
         affectedStats = affectedStats.concat(affectedFields[role])
      })
      return affectedStats
   }

   /**
    * @description Computes the Commander bonus for a crew member.
    *
    * @example
    *
    * effectiveSkill = (primarySkill + ventilationBonus) + ((commanderSkill + ventilationBonus) * 0.1)
    * (100 + 5) + ((100 + 5) * 0.1) = 105 + 10.5 = 115.5%
    *
    * // With Improved Ventilation (+5%):
    * // commander → 100 * (1 + 0.05)       = 105
    * // loader    → 100 * (1 + 0.05) * 1.1 = 115.5
    */
   applyCommanderBonus(commanderEfficiency: number = 100) {
      if (!this.isCommanderBonusApplied) return

      const efficiency = this.computeEfficiencyLevel()
      const effectiveSkill = efficiency + commanderEfficiency * 0.1

      this.efficiencyLevel = effectiveSkill
   }

   removeCommanderBonus() {
      this.efficiencyLevel = this.computeEfficiencyLevel()
   }
}
