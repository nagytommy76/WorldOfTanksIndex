type MulType = {
   name: string
   value: string
}

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
         add: Array<MulType>
         mul: Array<MulType>
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

/** U.S.A -------------------------------------------------------------------------------------------------------- */

export type T803Mechanics = {
   mechanics: {
      furyMaxReloadEffAvgDpm: string
      furyMaxReloadEfficiencyLevel: number
      furyReloadSpeedBonusPerEfficiencyLevel: string
      furyReloadEfficiencyLevelDuration: number
      furyReloadEfficiencyLevelPerHit: number
      furyReloadEfficiencyLevelPerDestruction: number
   }
   battleFury: {
      maxLevel: number
      duration: number
      reloadSpdBonus: number
      gainPerHit: number
      gainPerKill: number
   }
}

export type HackerMechanics = {
   mechanics: {
      concentrationModeCooldown: number
      concentrationModeDuration: number
      vehicleGunShotDispersionChassisMovement: string
      vehicleGunShotDispersionChassisRotation: string
      vehicleGunShotDispersionTurretRotation: string
      shotDispersionAngle: string
      chassisRotationSpeed: string
      enginePower: string
   }
   concentrationMode: {
      deployTime: number
      duration: number
      reloadTime: number
      modifiers: {
         mul: Array<MulType>
      }
   }
}

export type AresLineMechanics = {
   mechanics: {
      timeToOverheat: number
      overheatDuration: number
      coolingTime: number
      coolingDelay: number
      heatingPerShot: string
   }
   reactiveDebuffs: {
      stun: {
         mul: MulType
      }
      fire: {
         mul: MulType
      }
      overturn: {
         mul: MulType
      }
      ammoBay: {
         mul: MulType
      }
      loader1: {
         mul: MulType
      }
   }
}

export type BlackRockMechanics = {
   mechanics: {
      chargeableBurstPenetrationCount: number
      chargeableBurstSize: number
      chargeableBurstReload: number
      chargeableBurstDispersion: string
   }
}

// U.K. --------------------------------------------------------------------------------------------------------
export type BreakerMechanics = {
   mechanics: {
      enginePower: string
      forwardMaxSpeed: string
      chassisRotationSpeed: string
      powerModeThreshold: number
      powerModeDuration: number
   }
   powerMode: {
      speedThreshold: number
      modeThreshold: number
      modeDuration: number
      accelerationFactor: number
      attenuationFactor: number
      vehicleParams: {
         vehicleSpeed: string
         rotationSpeed: string
         dispersion: string
         enginePower: string
      }
   }
}

// China --------------------------------------------------------------------------------------------------------

export type Bz79Mechanics = {
   mechanics: {
      enginePowerWithBoosters: string
      topSpeedWithBoosters: string
      reverseSpeedReductionWithBoosters: string
      traverseSpeedReductionWithBoosters: string
      boosterDuration: number
      boosterCoolingTime: number
      reactivationLimit: string
      reactivationDelay: number
   }
   rechargeableNitro: {
      deployTime: string
      reloadTime: number
      duration: number
      threshold: number
      cooldown: number
      addMaxSpeedForwardBonus: number
      addRotationSpeedBonus: number
      impulse: {
         magnitude: string
         applyPoint: string
         duration: string
      }
      modifiers: {
         mul: Array<MulType>
      }
      kpi: {
         mul: Array<MulType>
      }
   }
}

export type Ptz78Mechanics = {
   mechanics: {
      stagedJetBoostersEnginePower: string
      stagedJetBoostersTopSpeed: string
      stagedJetBoostersSpeedLimits: string
      stagedJetBoostersRotationSpeed: string
      stagedJetBoostersChargesCount: number
      stagedJetBoostersChargeDuration: number
      stagedJetBoostersCooldownTime: number
   }
   stagedJetBoosters: {
      deployTime: number
      reloadTime: number
      reuseCount: number
      duration: number
      impulse: {
         magnitude: string
         applyPoint: string
         duration: string
      }
      impulseSpeedLimits: string
      customRotationPoints: {
         minSpeedPoints: {
            speed: string
            rotation: string
         }
         maxSpeedPoints: {
            speed: string
            rotation: string
         }
      }
      modifiers: Array<MulType>
   }
}

// Poland --------------------------------------------------------------------------------------------------------

export type SzakalMechanics = {
   mechanics: {
      passiveCoincideceShootingCharge: string
      activeCoincideceShootingCharge: string
      coincidenceElectromechanicalSightDuration: number
      aimingTimeCoincidenceElectromechanicalSight: string
      dispersionAt100mCoincidenceElectromechanicalSight: string
      reloadTimeCoincidence: string
      switchEngineModeBothModes: number
      turboSpeedCap: string
      engineTurboPowerCap: string
      aimingTimeTurbo: string
      movementTraverseDispersionTurbo: string
      hullTraverseDispersionTurbo: string
      gunTraverseDispersionTurbo: string
      ionAfterburnerPassiveTurboCharge: string
      ionAfterburnerActiveTurboCharge: string
      ionAfterburnerDuration: number
      ionAfterburnerDurationSpeedCap: string
      ionAfterburnerDurationEnginePower: string
   }
   stanceDance: {
      timeSwitchStance: number
      maxEnergy: number
      gainFightEnergyPoints: number
      gainTurboEnergyPoints: number
      gainEnergyTime: number
      gainTurboEnergyBonusPoints: number
      gainTurboEnergySpdLimitKmh: number
      passiveTurboFwdSpdBonusKmh: number
      passiveTurboBkwdSpdBonusKmh: number
      passiveTurboEnginePowerBonus: number
      passiveTurboAccuracyDebuff: string
      passiveTurboAimSpeedDebuff: number
      passiveTurboStabilizeDebuff: number
      passiveTurboAfterShotDispersionDebuff: number
      activeTurboCost: number
      activeTurboDuration: number
      activeTurboFwdSpdBonusKmh: number
      activeTurboBkwdSpdBonusKmh: number
      activeTurboEnginePowerBonus: number
      activeTurboRotationSpeedDebuff: number
      passiveFightEnergyBonusPerHit: number
      activeFightCost: number
      activeFightDuration: number
      activeFightAccuracyBonus: number
      activeFightAimSpeedBonus: number
      activeFightStabilizeBonus: string
      activeFightAfterShotDispersionBonus: string
      activeFightReloadSpdBonus: number
      impulse: {
         magnitude: string
         duration: string
         applyPoint: string
      }
   }
}

// Sweden --------------------------------------------------------------------------------------------------------
export type Strv107Mechanics = {
   mechanics: {
      reloadTimeSecs: string
      shotDispersionAngle: string
      speedLimits: string
      pillboxHorizontalRotationSpeed: string
      pillboxVerticalRotationSpeed: string
      pillboxSwitchOnTime: number
      pillboxSwitchOffTime: number
   }
   pillboxSiegeMode: {
      switchDriveToPillboxTime: number
      switchSiegeToPillboxTime: number
      switchPillboxToSiegeTime: number
      switchPillboxToDriveTime: number
      modifiers: {
         mul: Array<MulType>
      }
   }
}

// Japan --------------------------------------------------------------------------------------------------------
export type STK2Mechanics = {
   mechanics: {
      coolingTime: number
      coolingDelay: number
      heatingPerShot: string
   }
}

// France --------------------------------------------------------------------------------------------------------
export type ImbattableMechanics = {
   mechanics: {
      extraShotClipReloadTime: number
   }
}
export type Asx40TMechanics = {
   mechanics: {
      stationaryReloadSwitchOnTime: number
      stationaryReloadSwitchOffTime: number
   }
}
