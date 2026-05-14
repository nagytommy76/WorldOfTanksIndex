// https://worldoftanks.fandom.com/wiki/Crew#Proficiency

import type { ICrewRoles } from '@/types/VehicleDetails/Crew'

export default class CrewMember {
   /**
    * @param primaryRole - The crew member's main role (commander, gunner, driver, loader, radioman)
    */
   primaryRole: ICrewRoles
   /**
    * @param primaryRole - The crew member's secondary role (commander, gunner, driver, loader, radioman)
    */
   secondaryRole: ICrewRoles[]
   /**
    * @description The crew member's efficiency level, which is used in the crew formula to compute actual stat values. Starts at 100% and is modified by crew perks (e.g. Brothers in Arms) and equipment (e.g. Improved Ventilation).
    */
   efficiencyLevel: number
   /**
    * @description Which vehicle parameters this crew member affects, used to determine which stats to apply the crew formula to. E.g. commander affects circular vision radius, driver affects traverse speed and ground rotation speed, etc.
    */
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

   private static readonly BASE_TRAINING = 100

   constructor({ primaryRole, secondaryRole }: { primaryRole: ICrewRoles; secondaryRole: ICrewRoles[] }) {
      this.primaryRole = primaryRole
      this.secondaryRole = secondaryRole

      this.efficiencyLevel = CrewMember.BASE_TRAINING
      this.affectedVehicleStats = this.setAffectedVehicleStats()
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
      this.efficiencyLevel = CrewMember.BASE_TRAINING
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
            if (this.secondaryRole[0] === 'radioman') {
               helperArray = helperArray.concat(RADIOMAN_AFFECTED_FIELDS)
            }
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
            if (this.secondaryRole[0] === 'radioman') {
               helperArray = helperArray.concat(RADIOMAN_AFFECTED_FIELDS)
            }
            break
         case 'radioman':
            helperArray = RADIOMAN_AFFECTED_FIELDS
            break
      }
      return helperArray
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
   private computeEfficiencyLevel(): number {
      let boostedBase = CrewMember.BASE_TRAINING
      if (this.appliedCrewModifiers) {
         this.appliedCrewModifiers.forEach((modifier) => {
            boostedBase *= modifier.value
         })
      }
      return parseFloat(boostedBase.toFixed(1))
   }
}

const COMMANDER_AFFECTED_FIELDS = ['vehicleCircularVisionRadius']
const DRIVER_AFFECTED_FIELDS = ['vehicleAllGroundRotationSpeed', 'vehicleSpeedGain']
const GUNNER_AFFECTED_FIELDS = [
   'vehicleGunAimSpeed',
   'vehicleGunShotFullDispersion',
   'vehicleTurretOrCuttingRotationSpeed',
   'vehicleGunShotDispersion',
]
const LOADER_AFFECTED_FIELDS = ['vehicleGunReloadTime']
const RADIOMAN_AFFECTED_FIELDS = ['vehicleRadioCircularVisionRadius']
