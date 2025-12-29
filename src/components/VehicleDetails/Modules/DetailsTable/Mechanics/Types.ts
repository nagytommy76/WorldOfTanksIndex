export type Leo120Mechanics = {
   mechanics: {
      accuracyDispersionCap: string
      accuracyWhileMovingDispersionCap: string
      maxAccuracyLevel: number
      accuracyDispersionPerLevel: string
      accuracySpeedLimit: number
      accuracyLevelGainTime: number
   }
   accuracyStacks: {
      levelMax: number
      levelInitial: string
      levelAfterShot: string
      aimLevelBonus: number
      aimBonusCap: number
      gainMaxSpd: number
      gainTime: number
      stabilizeBonus: number
   }
}

export type BorkenkaferMechanics = {
   mechanics: {
      designatorInitialCooldownS: number
      designatorCooldownS: number
      designatorMarkDurationS: number
      designatorMarkedEnemiesAdditionalDamage: string
   }
   targetDesignator: {
      deployTime: number
      cooldownTime: number
      spottedMarkedTime: number
      unspottedMarkedTime: number
      damageIncomeFactor: number
   }
}

export type HirschkaferMechanics = {
   mechanics: {
      preheatDmgCap: string
      preheatDispersionCap: string
      preheatTimeToFull: number
      preheatTimeToZero: number
      preheatSpeedLimit: number
      preheatTransitionDelay: number
   }
   overheatStacks: {
      heatingTime: number
      coolingTime: number
      dmgBonus: number
      aimBonus: number
      gainMaxSpd: number
      delayTimerDuration: number
   }
}

export type TaschenratteMechanics = {
   mechanics: {
      secondaryReloadTimeSecs: number
      secondaryTotalBurstSize: number
      secondaryAvgDamage: number
      secondaryAvgPiercingPower: number
   }
   supportWeapon: string
}

/** U.S.S.R -------------------------------------------------------------------------------------------------------- */

export type Kr1Mechanics = {
   mechanics: {
      improvedDamageEnemiesByRamming: string
      improvedDamageEnemiesChassisByRamming: string
   }
   improvedRamming: {
      damageBonusStageSize: number
      trackDamageBonusStageSize: number
      reductionDamageBonusStageSize: number
      damageValueToShowAnimation: number
      effectSpeedThreshold: number
      modifiers: {
         add: Array<{
            name: string
            value: string
         }>
         mul: Array<{
            name: string
            value: string
         }>
      }
   }
}

export type Obj432UMechanics = {
   mechanics: {
      heatAvgDmgPerLvl: string
      heatTimeToReachLevel: string
      heatTimeBeforeOverheat: number
      heatChargeOverheatDuration: number
   }
   chargeShot: {
      timePerLevel: string
      damageFactorsPerLevel: string
      shotBlockTime: number
   }
}
