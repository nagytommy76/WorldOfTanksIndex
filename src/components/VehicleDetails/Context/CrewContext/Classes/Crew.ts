// https://worldoftanks.fandom.com/wiki/Crew#Proficiency

import type { ICrewRoles } from '@/types/VehicleDetails/Crew'

export default class CrewMember {
   primaryRole: ICrewRoles
   secondaryRole: ICrewRoles[]
   efficiencyLevel: number
   affectedVehicleStats: string[] // e.g. aiming time, reload time
   /**
    * @description e.g. ventilation, brother in arms, extra combat ration
    */
   appliedCrewModifiers:
      | Map<
           string,
           {
              situationalParam: boolean
              value: number
              paramName: string
           }
        >
      | undefined = undefined

   // Commander gives +10% to all OTHER crew members
   private static readonly COMMANDER_BONUS = 0.1
   private static readonly BASE_TRAINING = 100

   constructor({
      primaryRole,
      secondaryRole,
      // crewModifierBonuses = [],
   }: {
      primaryRole: ICrewRoles
      secondaryRole: ICrewRoles[]
      // crewModifierBonuses?: number[]
   }) {
      this.primaryRole = primaryRole
      this.secondaryRole = secondaryRole

      this.efficiencyLevel = 100
      this.affectedVehicleStats = this.setAffectedVehicleStats()
   }

   /**
    * @description Computes the effective efficiency level for this crew member.
    *
    * Rules:
    *  - Ventilation bonus is applied to base BEFORE commander bonus
    *  - Commander does NOT receive their own +10% bonus
    *  - All other members DO receive the commander +10% bonus
    *
    * @param crewModifierBonuses - fractional bonus, e.g. 0.05 for Improved Ventilation
    *
    * @example
    * // Without ventilation:
    * // commander → 100 * (1 + 0)       = 100
    * // loader    → 100 * (1 + 0) * 1.1 = 110
    *
    * // With Improved Ventilation (+5%):
    * // commander → 100 * (1 + 0.05)       = 105
    * // loader    → 100 * (1 + 0.05) * 1.1 = 115.5
    */
   computeEfficiencyLevel(/*crewModifierBonuses: number[]*/): number {
      let boostedBase = CrewMember.BASE_TRAINING
      if (this.appliedCrewModifiers) {
         this.appliedCrewModifiers.forEach((modifier, key) => {
            // if (key === 'commanderBonus' && this.primaryRole !== 'commander') {
            // console.log('COMMANDER', this.primaryRole)
            boostedBase *= 1 + modifier.value
            // } else {
            //    // COMMANDER BONUS OR OTHER BONUSES that don't apply to commander
            //    // boostedBase *= modifier.value
            // }
         })
      }

      // crewModifierBonuses.forEach((bonus) => {
      //    boostedBase *= bonus
      // })

      // if (this.primaryRole === 'commander') return boostedBase

      // return parseFloat((boostedBase * (1 + CrewMember.COMMANDER_BONUS)).toFixed(1))
      return parseFloat(boostedBase.toFixed(1))
   }

   setAppliedCrewModifier(modifier: { name: string; paramName: string; value: number }) {
      if (!this.appliedCrewModifiers) this.appliedCrewModifiers = new Map()
      this.appliedCrewModifiers.set(modifier.name, {
         paramName: modifier.paramName,
         value: modifier.value,
         situationalParam: false,
      })
      this.efficiencyLevel = this.computeEfficiencyLevel()
   }
   clearAppliedCrewModifiers() {
      if (!this.appliedCrewModifiers) return
      this.appliedCrewModifiers.clear()
      this.efficiencyLevel = 100
   }
   removeAppliedCrewModifier(modifierName: string) {
      if (!this.appliedCrewModifiers) return
      this.appliedCrewModifiers.delete(modifierName)
      this.efficiencyLevel = this.computeEfficiencyLevel()
   }

   private setAffectedVehicleStats() {
      let helperArray: string[] = []
      switch (this.primaryRole) {
         case 'commander':
            helperArray = COMMANDER_AFFECTED_FIELDS
            break
         case 'gunner':
            helperArray = GUNNER_AFFECTED_FIELDS
            if (this.secondaryRole[0] === 'loader') {
               helperArray = helperArray.concat(LOADER_AFFECTED_FIELDS)
            }
            break
         case 'driver':
            helperArray = DRIVER_AFFECTED_FIELDS
            break
         case 'loader':
            helperArray = LOADER_AFFECTED_FIELDS
            break
         case 'radioman':
            helperArray = RADIOMAN_AFFECTED_FIELDS
            break
      }
      return helperArray
   }
}

const COMMANDER_AFFECTED_FIELDS = ['circularVisionRadius']
const DRIVER_AFFECTED_FIELDS = ['vehicleAllGroundRotationSpeed', 'vehicleSpeedGain']
const GUNNER_AFFECTED_FIELDS = [
   'vehicleGunAimSpeed',
   'vehicleGunShotFullDispersion',
   'vehicleTurretOrCuttingRotationSpeed',
   'vehicleGunShotDispersion',
]
const LOADER_AFFECTED_FIELDS = ['vehicleGunReloadTime']
const RADIOMAN_AFFECTED_FIELDS = ['vehicleRadioCircularVisionRadius']
